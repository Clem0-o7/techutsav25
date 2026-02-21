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

    return NextResponse.json({ 
      message: "Successfully joined team",
      team: {
        ...team.toObject(),
        members: team.members.map(member => ({
          _id: member._id,
          name: member.name,
          email: member.email,
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