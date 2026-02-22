// @/app/api/teams/leave/route.js

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import Team from "@/lib/models/Team";
import { BlobServiceClient } from "@azure/storage-blob";
import { verify } from "jsonwebtoken";

const connectionString = process.env.CONNECTIONSTRING;
const containerName = process.env.CONTAINERNAME;

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
    console.log(`Deleted blob: ${blobName}`);
  } catch (err) {
    console.error("Blob deletion error:", err);
  }
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

    const { teamId } = await request.json();

    if (!teamId) {
      return NextResponse.json({ message: "Team ID is required" }, { status: 400 });
    }

    // Find team
    const team = await Team.findById(teamId);
    if (!team) {
      return NextResponse.json({ message: "Team not found" }, { status: 404 });
    }

    // Check if user is a member
    const memberIndex = team.members.findIndex(member => 
      member.userId.toString() === user._id.toString()
    );

    if (memberIndex === -1) {
      return NextResponse.json({ 
        message: "You are not a member of this team" 
      }, { status: 400 });
    }

    const member = team.members[memberIndex];
    const isLeader = member.role === "leader";

    // Transfer leadership before removing the member
    if (isLeader && team.members.length > 1) {
      // Pick the next member in array order (skip current leader)
      const nextLeader = team.members.find(
        (m) => m.userId.toString() !== user._id.toString()
      );
      if (nextLeader) {
        nextLeader.role = "leader";
        team.leaderId = nextLeader.userId; // keep leaderId in sync
        console.log(`Leadership transferred to ${nextLeader.userId} for team ${teamId}`);
      }
    }

    // Remove user from team
    team.members.splice(memberIndex, 1);

    // If team becomes empty, deactivate it
    if (team.members.length === 0) {
      team.isActive = false;
    }

    await team.save();
    
    // -------------------------------------------------------------------
    // Submission reconciliation on leave
    //
    // A) Leaver IS the active team submitter
    //    - Team still has members → transfer submission to the new leader
    //    - Team is now empty     → delete submission + blob (no team to hold it)
    //
    // B) Leaver's individual submission was OVERRIDDEN by the team
    //    → Restore it to draft so they can submit individually again
    //
    // C) Leaver had no submission → nothing to do
    // -------------------------------------------------------------------
    const eventType = team.eventType;

    if (user.submissions?.length > 0) {
      // Case A
      const teamSubIndex = user.submissions.findIndex(
        (sub) =>
          sub.type === eventType &&
          sub.finalSubmission === true &&
          sub.isTeamSubmission === true &&
          sub.teamId?.toString() === teamId
      );

      if (teamSubIndex !== -1) {
        const teamSub = user.submissions[teamSubIndex];

        if (team.members.length > 0) {
          // Team still alive — transfer to the new leader
          const newLeaderId = team.leaderId;
          const newLeaderDoc = await User.findById(newLeaderId);

          if (newLeaderDoc) {
            if (!newLeaderDoc.submissions) newLeaderDoc.submissions = [];

            // Mark any existing active submission for this eventType on the new leader as not-final
            newLeaderDoc.submissions.forEach((s) => {
              if (s.type === eventType && s.finalSubmission === true) {
                s.finalSubmission = false;
                s.status = "overridden";
              }
            });

            // Add the team submission to the new leader's record
            newLeaderDoc.submissions.push({
              type: teamSub.type,
              title: teamSub.title,
              description: teamSub.description,
              abstract: teamSub.abstract,
              fileName: teamSub.fileName,
              fileUrl: teamSub.fileUrl,
              status: teamSub.status,
              finalSubmission: true,
              isTeamSubmission: true,
              teamId: teamSub.teamId,
              submittedDate: teamSub.submittedDate,
            });

            await newLeaderDoc.save();
            console.log(
              `Transferred team submission from ${user.name} to new leader ${newLeaderDoc.name} (team ${teamId})`
            );
          }
        } else {
          // Team is empty — delete blob and submission record
          if (teamSub.fileUrl) await deleteBlobFromUrl(teamSub.fileUrl);
          console.log(
            `Team ${teamId} dissolved — deleted submission from ${user.name}`
          );
        }

        // Remove from leaver's record regardless
        user.submissions.splice(teamSubIndex, 1);
        await user.save();

      } else {
        // Case B: their own submission was overridden by the team → restore as draft
        const overriddenSub = user.submissions.find(
          (sub) => sub.type === eventType && sub.status === "overridden"
        );
        if (overriddenSub) {
          overriddenSub.finalSubmission = true;
          overriddenSub.status = "draft";
          overriddenSub.isTeamSubmission = false;
          overriddenSub.teamId = null;
          await user.save();
          console.log(`Restored overridden submission for ${user.name} after leaving team ${teamId}`);
        }
        // Case C: no submission — nothing to do
      }
    }

    return NextResponse.json({ 
      message: "Successfully left the team" 
    }, { status: 200 });

  } catch (error) {
    console.error("Team leave error:", error);
    return NextResponse.json({ 
      message: "Internal server error" 
    }, { status: 500 });
  }
}