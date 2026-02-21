// @/app/api/submissions/upload/route.js

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { BlobServiceClient } from "@azure/storage-blob";
import { randomUUID } from 'crypto';
import { verify } from "jsonwebtoken";

const connectionString = process.env.CONNECTIONSTRING;
const containerName = process.env.CONTAINERNAME; // techutsav26

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
    const submissionId = formData.get("submissionId"); // For updates

    // Validate required fields
    if (!eventType || !title) {
      return NextResponse.json({ message: "Event type and title are required" }, { status: 400 });
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
        const blobName = `${folder}${user._id}/${fileId}_${file.name}`;

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
        fileName = file.name;

      } catch (error) {
        console.error("Azure upload error:", error);
        return NextResponse.json({ 
          message: "File upload failed" 
        }, { status: 500 });
      }
    }

    // Update or create submission
    if (submissionId) {
      // Initialize submissions array if it doesn't exist
      if (!user.submissions) {
        user.submissions = [];
      }
      
      // Update existing submission
      const existingSubmission = user.submissions.id(submissionId);
      if (!existingSubmission) {
        return NextResponse.json({ message: "Submission not found" }, { status: 404 });
      }

      existingSubmission.title = title;
      existingSubmission.description = description;
      if (fileUrl) {
        existingSubmission.fileUrl = fileUrl;
        existingSubmission.fileName = fileName;
      }
      existingSubmission.status = "submitted";
      existingSubmission.submittedDate = new Date();

    } else {
      // Initialize submissions array if it doesn't exist
      if (!user.submissions) {
        user.submissions = [];
      }
      
      // Check if submission already exists for this event type
      const existingSubmission = user.submissions.find(sub => sub.type === eventType);
      
      if (existingSubmission) {
        // Update existing submission instead of blocking
        existingSubmission.title = title;
        existingSubmission.description = description;
        if (fileUrl) {
          existingSubmission.fileUrl = fileUrl;
          existingSubmission.fileName = fileName;
        }
        existingSubmission.status = "submitted";
        existingSubmission.submittedDate = new Date();
      } else {
        // Create new submission
        if (!fileUrl) {
          return NextResponse.json({ message: "File is required for new submissions" }, { status: 400 });
        }

        user.submissions.push({
          type: eventType,
          status: "submitted",
          fileUrl,
          fileName,
          title,
          description,
          submittedDate: new Date()
        });
      }
    }

    await user.save();

    const currentSubmission = user.submissions.find(sub => sub.type === eventType);
    const isUpdate = submissionId || user.submissions.find(sub => sub.type === eventType && sub.submittedDate);

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