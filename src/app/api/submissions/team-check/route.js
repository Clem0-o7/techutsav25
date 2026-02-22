// @/app/api/submissions/team-check/route.js
// Returns team info + existing submission state for a given eventType.
// Used by the UI to show who's in the team and warn about overrides.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import Team from "@/lib/models/Team";
import { verify } from "jsonwebtoken";

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = verify(token, process.env.JWT_SECRET);
    if (!decoded?.userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const eventType = searchParams.get("eventType");
    if (!eventType) return NextResponse.json({ message: "eventType required" }, { status: 400 });

    await connectToDatabase();

    const user = await User.findById(decoded.userId);
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    // Find the user's active team for this event
    const team = await Team.findOne({
      eventType,
      "members.userId": user._id,
      isActive: true,
    }).populate("members.userId", "name email");

    if (!team) {
      return NextResponse.json({ hasTeam: false });
    }

    const isLeader = team.leaderId.toString() === user._id.toString();

    // Build members list using live (populated) user names/emails
    const members = team.members.map((m) => {
      const populated = m.userId; // populated User doc
      return {
        _id: populated._id.toString(),
        name: populated.name || m.name,
        email: populated.email || m.email,
        role: m.role,
        isCurrentUser: populated._id.toString() === user._id.toString(),
      };
    });

    // Find the current active (non-overridden, finalSubmission) submission
    // from any team member for this eventType
    let existingSubmission = null;
    for (const m of team.members) {
      const memberId = m.userId._id ?? m.userId;
      const memberDoc = await User.findById(memberId).select("submissions name");
      if (!memberDoc?.submissions) continue;

      const activeSub = memberDoc.submissions.find(
        (sub) =>
          sub.type === eventType &&
          sub.finalSubmission === true &&
          sub.status !== "overridden"
      );

      if (activeSub) {
        existingSubmission = {
          submitterId: memberId.toString(),
          submitterName: memberDoc.name,
          fileName: activeSub.fileName || null,
          title: activeSub.title || null,
          status: activeSub.status,
          submittedDate: activeSub.submittedDate || null,
          fileUrl: activeSub.fileUrl || null,
          isCurrentUser: memberId.toString() === user._id.toString(),
        };
        break;
      }
    }

    return NextResponse.json({
      hasTeam: true,
      teamId: team._id.toString(),
      teamName: team.teamName,
      isLeader,
      members,
      existingSubmission,
    });
  } catch (error) {
    console.error("Team check error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
