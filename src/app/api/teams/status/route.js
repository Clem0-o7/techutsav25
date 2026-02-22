// @/app/api/teams/status/route.js

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import Team from "@/lib/models/Team";
import { verify } from "jsonwebtoken";

export async function GET(request) {
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

    // Find all teams user is part of
    const teams = await Team.find({
      "members.userId": user._id,
      isActive: true
    }).populate('members.userId', 'name email').sort({ createdAt: -1 });

    const formattedTeams = teams.map(team => ({
      _id: team._id,
      teamId: team.teamId,
      teamName: team.teamName,
      eventType: team.eventType,
      inviteCode: team.inviteCode,
      maxMembers: team.maxMembers,
      isActive: team.isActive,
      createdAt: team.createdAt,
      members: team.members.map(member => ({
        _id: member._id,
        // userId lets the client highlight "you" without storing a hardcoded name
        userId: member.userId?._id?.toString() || null,
        // Use live name/email from the populated User doc for dynamic updates
        name: member.userId?.name || member.name,
        email: member.userId?.email || member.email,
        role: member.role,
        joinedDate: member.joinedDate
      }))
    }));

    return NextResponse.json({ 
      teams: formattedTeams
    }, { status: 200 });

  } catch (error) {
    console.error("Team status fetch error:", error);
    return NextResponse.json({ 
      message: "Internal server error" 
    }, { status: 500 });
  }
}