// @/app/api/submissions/withdraw/route.js

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    // Get user
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { eventType } = await request.json();

    if (!eventType) {
      return NextResponse.json({ message: "Event type is required" }, { status: 400 });
    }

    // Initialize submissions array if it doesn't exist
    if (!user.submissions) {
      user.submissions = [];
    }

    // Find and validate submission
    const submissionIndex = user.submissions.findIndex(sub => sub.type === eventType && sub.finalSubmission === true);
    if (submissionIndex === -1) {
      return NextResponse.json({ message: "No active submission found for this event" }, { status: 404 });
    }

    // Check if submission can be withdrawn (only draft and submitted status)
    const submission = user.submissions[submissionIndex];
    if (!submission || !["draft", "submitted"].includes(submission.status)) {
      return NextResponse.json({ 
        message: "Submission cannot be withdrawn at this stage" 
      }, { status: 400 });
    }
    
    // Check if submission is overridden
    if (submission.status === "overridden") {
      return NextResponse.json({ 
        message: "Cannot withdraw overridden submissions" 
      }, { status: 400 });
    }

    // Remove submission
    user.submissions.splice(submissionIndex, 1);
    await user.save();

    return NextResponse.json({ 
      message: "Submission withdrawn successfully" 
    }, { status: 200 });

  } catch (error) {
    console.error("Submission withdrawal error:", error);
    return NextResponse.json({ 
      message: "Internal server error" 
    }, { status: 500 });
  }
}