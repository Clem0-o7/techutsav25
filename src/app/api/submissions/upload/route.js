// @/app/api/submissions/upload/route.js

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import Team from "@/lib/models/Team";
import { BlobServiceClient } from "@azure/storage-blob";
import { randomUUID } from 'crypto';
import { verify } from "jsonwebtoken";

const connectionString = process.env.CONNECTIONSTRING;
const containerName = process.env.CONTAINERNAME; // techutsav26

/** Delete a blob from Azure given its full public URL */
async function deleteBlobFromUrl(fileUrl) {
  if (!fileUrl || !connectionString || !containerName) return;
  try {
    const url = new URL(fileUrl);
    const parts = url.pathname.split(`/${containerName}/`);
    if (parts.length < 2) return;
    const blobName = decodeURIComponent(parts[1]);
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.getBlockBlobClient(blobName).deleteIfExists();
    console.log(`Deleted old blob: ${blobName}`);
  } catch (err) {
    console.error("Blob deletion error:", err);
  }
}

// Folder paths for organized storage
const SUBMISSION_FOLDERS = {
  "paper-presentation": "submissions/papers/",
  "ideathon": "submissions/ideathon/"
};

// Pass requirements for submissions
const SUBMISSION_PASS_REQUIREMENTS = {
  "paper-presentation": [2], // Pass 2: Online Paper Presentation
  "ideathon": [3]           // Pass 3: Online Idea Pitching
};

/** Sanitize filename to remove spaces and special characters */
function sanitizeFileName(filename) {
  // Remove special characters except dot, dash, underscore
  // Replace spaces with underscores
  return filename
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9._-]/g, "");
}

export async function POST(request) {
  try {
    // Check authentication using JWT cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    // Get user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get("file");
    const eventType = formData.get("eventType");
    const title = formData.get("title");
    const description = formData.get("description");
    const abstract = formData.get("abstract"); // For paper presentations
    const submissionId = formData.get("submissionId"); // For updates
    const isDraft = formData.get("isDraft") === "true"; // Save as draft or submit

    // Validate required fields
    if (!eventType || !title) {
      return NextResponse.json({ message: "Event type and title are required" }, { status: 400 });
    }

    // Validate abstract for paper presentations
    if (eventType === "paper-presentation" && !abstract) {
      return NextResponse.json({ message: "Abstract is required for paper presentations" }, { status: 400 });
    }

    // Check if user has required pass
    const requiredPasses = SUBMISSION_PASS_REQUIREMENTS[eventType];
    const hasValidPass = user.passes?.some(pass => 
      requiredPasses.includes(pass.passType) && pass.status === "verified"
    );

    if (!hasValidPass) {
      return NextResponse.json({ 
        message: `You need a verified Pass ${requiredPasses.join(" or ")} to submit for this event` 
      }, { status: 403 });
    }

    let fileUrl = null;
    let fileName = null;

    // Handle file upload if provided
    if (file && file.size > 0) {
      // Validate file
      const allowedTypes = {
        "paper-presentation": [".pdf", ".doc", ".docx"],
        "ideathon": [".pdf", ".ppt", ".pptx"]
      };

      const fileExtension = "." + file.name.split('.').pop().toLowerCase();
      if (!allowedTypes[eventType].includes(fileExtension)) {
        return NextResponse.json({ 
          message: `File type ${fileExtension} not allowed for ${eventType}` 
        }, { status: 400 });
      }

      const maxSizeInMB = eventType === "paper-presentation" ? 10 : 20;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        return NextResponse.json({ 
          message: `File size exceeds ${maxSizeInMB}MB limit` 
        }, { status: 400 });
      }

      // Upload to Azure Blob Storage
      try {
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        const containerClient = blobServiceClient.getContainerClient(containerName);

        // Generate unique blob name with folder structure
        const folder = SUBMISSION_FOLDERS[eventType];
        const fileId = randomUUID();
        const sanitizedFileName = sanitizeFileName(file.name);
        const blobName = `${folder}${user._id}/${fileId}_${sanitizedFileName}`;

        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Convert file to buffer
        const buffer = Buffer.from(await file.arrayBuffer());
        
        // Upload file
        await blockBlobClient.upload(buffer, buffer.length, {
          blobHTTPHeaders: {
            blobContentType: file.type
          }
        });

        fileUrl = blockBlobClient.url;
        fileName = sanitizedFileName;
        
        console.log('File upload successful:', {
          fileName: sanitizedFileName,
          fileUrl: blockBlobClient.url,
          blobName
        });

      } catch (error) {
        console.error("Azure upload error:", error);
        return NextResponse.json({ 
          message: "File upload failed" 
        }, { status: 500 });
      }
    }

    // Check if user is part of a team for this event type
    let userTeam = null;
    userTeam = await Team.findOne({
      eventType,
      "members.userId": user._id,
      isActive: true
    }).populate('members.userId', 'name email');
    
    // Determine submission status and team info
    const submissionStatus = isDraft ? "draft" : "submitted";
    const isUserTeamLeader = userTeam && userTeam.leaderId.toString() === user._id.toString();
    const isInTeam = !!userTeam;
    
    console.log('Team status:', {
      hasTeam: isInTeam,
      isLeader: isUserTeamLeader,
      teamId: userTeam?._id,
      eventType
    });
    
    // Initialize submissions array if it doesn't exist
    if (!user.submissions) {
      user.submissions = [];
    }
    
    // Handle one active submission per event type logic
    const existingSubmissions = user.submissions.filter(sub => sub.type === eventType);
    if (existingSubmissions.length > 0) {
      // Mark all existing submissions as not final
      existingSubmissions.forEach(submission => {
        submission.finalSubmission = false;
      });
    }

    // Update or create submission
    if (submissionId) {
      // Update existing submission
      const existingSubmission = user.submissions.id(submissionId);
      if (!existingSubmission) {
        return NextResponse.json({ message: "Submission not found" }, { status: 404 });
      }

      existingSubmission.title = title;
      existingSubmission.description = description;
      if (eventType === "paper-presentation" && abstract) {
        existingSubmission.abstract = abstract;
      }
      if (fileUrl) {
        // Delete old blob before replacing
        if (existingSubmission.fileUrl) await deleteBlobFromUrl(existingSubmission.fileUrl);
        existingSubmission.fileUrl = fileUrl;
        existingSubmission.fileName = fileName;
      }
      existingSubmission.status = submissionStatus;
      existingSubmission.finalSubmission = true; // Mark as active submission
      existingSubmission.isTeamSubmission = isInTeam;
      existingSubmission.teamId = userTeam?._id || existingSubmission.teamId; // Preserve or update team ID
      if (!isDraft) {
        existingSubmission.submittedDate = new Date();
      }

    } else {
      // Check if submission already exists for this event type
      const existingSubmission = user.submissions.find(sub => sub.type === eventType && sub.finalSubmission);
      
      if (existingSubmission) {
        // Update existing submission instead of creating new one
        existingSubmission.title = title;
        existingSubmission.description = description;
        if (eventType === "paper-presentation" && abstract) {
          existingSubmission.abstract = abstract;
        }
        if (fileUrl) {
          // Delete old blob before replacing
          if (existingSubmission.fileUrl) await deleteBlobFromUrl(existingSubmission.fileUrl);
          existingSubmission.fileUrl = fileUrl;
          existingSubmission.fileName = fileName;
        }
        existingSubmission.status = submissionStatus;
        existingSubmission.isTeamSubmission = isInTeam;
        existingSubmission.teamId = userTeam?._id || existingSubmission.teamId; // Preserve or update team ID
        if (!isDraft) {
          existingSubmission.submittedDate = new Date();
        }
      } else {
        // Create new submission
        if (!fileUrl && !isDraft) {
          return NextResponse.json({ message: "File is required for final submissions" }, { status: 400 });
        }

        const newSubmission = {
          type: eventType,
          status: submissionStatus,
          title,
          description,
          finalSubmission: true,
          isTeamSubmission: isInTeam,
          teamId: userTeam?._id || null
        };
        
        if (fileUrl) {
          newSubmission.fileUrl = fileUrl;
          newSubmission.fileName = fileName;
        }
        
        if (eventType === "paper-presentation" && abstract) {
          newSubmission.abstract = abstract;
        }
        
        if (!isDraft) {
          newSubmission.submittedDate = new Date();
        }

        user.submissions.push(newSubmission);
        
        // If user is in a team but not the leader, mark individual submissions as overridden
        if (isInTeam && !isUserTeamLeader) {
          // Override any personal submissions if joining a team
          user.submissions.forEach(sub => {
            if (sub.type === eventType && !sub.isTeamSubmission && sub._id.toString() !== newSubmission._id) {
              sub.finalSubmission = false;
              sub.status = "overridden";
            }
          });
        }
      }
    }

    await user.save();

    // Handle team override logic if needed
    const currentSubmission = user.submissions.find(sub => sub.type === eventType && sub.finalSubmission);
    
    if (currentSubmission && isInTeam && userTeam) {
      console.log(`Processing team override for ${isUserTeamLeader ? "leader" : "member"} submission in team ${userTeam._id}`);
      
      for (const member of userTeam.members) {
        const memberId = member.userId?._id ?? member.userId;
        if (!memberId) continue;
        if (memberId.toString() === user._id.toString()) continue;
        
        const memberUser = await User.findById(memberId);
        if (!memberUser?.submissions) continue;
        
        let memberUpdated = false;
        for (const sub of memberUser.submissions) {
          if (sub.type !== eventType) continue;
          if (!sub.finalSubmission) continue;

          const shouldOverride = sub.isTeamSubmission || isUserTeamLeader;
          if (shouldOverride) {
            if (sub.fileUrl) await deleteBlobFromUrl(sub.fileUrl);
            sub.finalSubmission = false;
            sub.status = "overridden";
            memberUpdated = true;
            console.log(`Marked submission ${sub._id} as overridden for member ${memberUser.name}`);
          }
        }
        
        if (memberUpdated) {
          await memberUser.save();
        }
      }
    }

    console.log('Final submission saved:', {
      type: currentSubmission?.type,
      fileName: currentSubmission?.fileName,
      fileUrl: currentSubmission?.fileUrl,
      status: currentSubmission?.status
    });

    const isUpdate = submissionId || user.submissions.filter(sub => sub.type === eventType).length > 1;

    return NextResponse.json({ 
      message: isUpdate ? "Submission updated successfully" : "Submission uploaded successfully",
      submission: currentSubmission
    }, { status: 200 });

  } catch (error) {
    console.error("Submission upload error:", error);
    return NextResponse.json({ 
      message: "Internal server error" 
    }, { status: 500 });
  }
}