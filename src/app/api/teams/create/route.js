// @/app/api/teams/create/route.js

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import Team from "@/lib/models/Team";
import { verify } from "jsonwebtoken";

export async function POST(request) {
  try {
    // Check authentication using JWT cookie (same as profile API)
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

    const { eventType, teamName } = await request.json();

    // Validate input
    if (!eventType || !teamName) {
      return NextResponse.json({ 
        message: "Event type and team name are required" 
      }, { status: 400 });
    }

    if (!["paper-presentation", "ideathon"].includes(eventType)) {
      return NextResponse.json({ message: "Invalid event type" }, { status: 400 });
    }

    // Check if user has required pass for the event
    const REQUIRED_PASSES = {
      "paper-presentation": [2],
      "ideathon": [3]
    };

    const requiredPasses = REQUIRED_PASSES[eventType];
    const hasValidPass = user.passes?.some(pass => 
      requiredPasses.includes(pass.passType) && pass.status === "verified"
    );

    if (!hasValidPass) {
      return NextResponse.json({ 
        message: `You need a verified Pass ${requiredPasses.join(" or ")} to create a team for this event` 
      }, { status: 403 });
    }

    // Check if user already has a team for this event type
    const existingTeam = await Team.findOne({
      eventType,
      "members.userId": user._id,
      isActive: true
    });

    if (existingTeam) {
      return NextResponse.json({ 
        message: `You are already part of a ${eventType.replace("-", " ")} team` 
      }, { status: 400 });
    }

    // Create new team
    const team = await Team.createTeam(
      eventType,
      user._id,
      user.email,
      user.name,
      teamName.trim()
    );

    // Populate team details for response
    await team.populate('members.userId', 'name email');

    return NextResponse.json({ 
      message: "Team created successfully",
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
    }, { status: 201 });

  } catch (error) {
    console.error("Team creation error:", error);
    
    // Handle duplicate team name
    if (error.code === 11000) {
      return NextResponse.json({ 
        message: "A team with this invite code already exists. Please try again." 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      message: "Internal server error" 
    }, { status: 500 });
  }
}