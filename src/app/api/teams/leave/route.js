// @/app/api/teams/leave/route.js

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import Team from "@/lib/models/Team";
import { verify } from "jsonwebtoken";

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

    // If user is the leader and there are other members, transfer leadership
    if (member.role === "leader" && team.members.length > 1) {
      // Find next member to promote to leader
      const nextLeader = team.members.find(m => 
        m.userId.toString() !== user._id.toString()
      );
      
      if (nextLeader) {
        nextLeader.role = "leader";
      }
    }

    // Remove user from team
    team.members.splice(memberIndex, 1);

    // If team becomes empty, deactivate it
    if (team.members.length === 0) {
      team.isActive = false;
    }

    await team.save();
    
    // Handle submissions when leaving team
    // If user was a team member, restore their individual submission ability
    if (user.submissions && user.submissions.length > 0) {
      const teamSubmission = user.submissions.find(
        sub => sub.type === team.eventType && sub.status === "overridden"
      );
      
      if (teamSubmission) {
        teamSubmission.finalSubmission = true;
        teamSubmission.status = "draft"; // Allow them to complete it
        teamSubmission.isTeamSubmission = false;
        teamSubmission.teamId = null;
        await user.save();
        console.log(`Restored user's submission after leaving team ${teamId}`);
      }
    }

    // If leader left and transferred leadership, update team submission ownership
    if (member.role === "leader" && team.members.length > 0) {
      const newLeader = team.members.find(m => m.role === "leader");
      if (newLeader) {
        console.log(`Leadership transferred to ${newLeader.name} for team ${teamId}`);
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