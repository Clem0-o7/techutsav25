// @/app/api/teams/join/route.js

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

    const { inviteCode } = await request.json();

    if (!inviteCode) {
      return NextResponse.json({ message: "Invite code is required" }, { status: 400 });
    }

    // Find team by invite code
    const team = await Team.findOne({ 
      inviteCode: inviteCode.toUpperCase(), 
      isActive: true 
    }).populate('members.userId', 'name email');

    if (!team) {
      return NextResponse.json({ 
        message: "Invalid invite code or team not found" 
      }, { status: 404 });
    }

    // Check if user has required pass for the event
    const REQUIRED_PASSES = {
      "paper-presentation": [2],
      "ideathon": [3]
    };

    const requiredPasses = REQUIRED_PASSES[team.eventType];
    const hasValidPass = user.passes?.some(pass => 
      requiredPasses.includes(pass.passType) && pass.status === "verified"
    );

    if (!hasValidPass) {
      return NextResponse.json({ 
        message: `You need a verified Pass ${requiredPasses.join(" or ")} to join this team` 
      }, { status: 403 });
    }

    // Check if user already has a team for this event type
    const existingUserTeam = await Team.findOne({
      eventType: team.eventType,
      "members.userId": user._id,
      isActive: true
    });

    if (existingUserTeam && existingUserTeam._id.toString() !== team._id.toString()) {
      return NextResponse.json({ 
        message: `You are already part of another ${team.eventType.replace("-", " ")} team` 
      }, { status: 400 });
    }

    // Check if user is already in this team
    const isAlreadyMember = team.members.some(member => 
      member.userId._id.toString() === user._id.toString()
    );

    if (isAlreadyMember) {
      return NextResponse.json({ 
        message: "You are already a member of this team" 
      }, { status: 400 });
    }

    // Check team capacity
    if (team.members.length >= team.maxMembers) {
      return NextResponse.json({ 
        message: "Team is already full" 
      }, { status: 400 });
    }

    // Add user to team
    team.members.push({
      userId: user._id,
      email: user.email,
      name: user.name,
      role: "member"
    });

    await team.save();

    // -------------------------------------------------------------------
    // Submission reconciliation on join
    // Only override the joiner's individual submission if the team already
    // has an active submission from one of its existing members.
    // If the team has no submission yet, the joiner's work is left intact
    // so they (or anyone) can later submit it as the team's submission.
    // -------------------------------------------------------------------
    let teamAlreadyHasSubmission = false;
    // Check all pre-existing members (before this join was pushed)
    // team.members already includes the new joiner as the last entry,
    // so we skip them when searching.
    for (const m of team.members) {
      const memberId = m.userId?._id?.toString() ?? m.userId?.toString();
      if (memberId === user._id.toString()) continue; // skip the new joiner

      const memberDoc = await User.findById(memberId).select("submissions");
      if (!memberDoc?.submissions) continue;

      const activeSub = memberDoc.submissions.find(
        (sub) =>
          sub.type === team.eventType &&
          sub.finalSubmission === true &&
          sub.status !== "overridden"
      );
      if (activeSub) {
        teamAlreadyHasSubmission = true;
        break;
      }
    }

    if (teamAlreadyHasSubmission) {
      // Team already owns a submission — mark the joiner's individual one as overridden
      if (user.submissions?.length > 0) {
        const joinerActiveSub = user.submissions.find(
          (sub) =>
            sub.type === team.eventType &&
            (sub.finalSubmission === true || sub.finalSubmission === undefined) &&
            sub.status !== "overridden"
        );
        if (joinerActiveSub) {
          joinerActiveSub.finalSubmission = false;
          joinerActiveSub.status = "overridden";
          joinerActiveSub.isTeamSubmission = false; // still belongs to them individually
          await user.save();
          console.log(
            `Marked joiner ${user.name}'s individual submission as overridden — team already has a submission`
          );
        }
      }
    } else {
      // Team has no submission yet — leave the joiner's submission intact.
      // It will naturally become the team's if they (or the leader) submit next.
      console.log(
        `Team has no active submission yet — keeping joiner ${user.name}'s submission intact`
      );
    }

    return NextResponse.json({ 
      message: "Successfully joined team",
      team: {
        ...team.toObject(),
        members: team.members.map(member => ({
          _id: member._id,
          userId: member.userId?._id?.toString() || member.userId?.toString() || null,
          name: member.userId?.name || member.name,
          email: member.userId?.email || member.email,
          role: member.role,
          joinedDate: member.joinedDate
        }))
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Team join error:", error);
    return NextResponse.json({ 
      message: "Internal server error" 
    }, { status: 500 });
  }
}