import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

// ─── GET /api/complete-profile?token=xxx ──────────────────────────────────────
// Validate the magic-link token and return safe profile fields for the form.
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token || token.trim() === "") {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({
      profileCompletionToken: token,
      profileCompletionExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired link" },
        { status: 401 }
      );
    }

    // Return only the safe fields needed for the form — never expose the token
    return NextResponse.json({
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phoneNo ?? "",
      college: user.college ?? "",
      year: user.year ?? "",
      department: user.department ?? "",
    });
  } catch (error) {
    console.error("[COMPLETE-PROFILE GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ─── POST /api/complete-profile ───────────────────────────────────────────────
// Re-validate token, save profile fields, and invalidate the token.
export async function POST(request) {
  try {
    const body = await request.json();
    const { token, profileData } = body;

    if (!token || token.trim() === "") {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }

    if (!profileData || typeof profileData !== "object") {
      return NextResponse.json(
        { error: "Profile data is required" },
        { status: 400 }
      );
    }

    const { name, phone, college, year, department } = profileData;

    // Basic field validation
    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!phone || phone.trim() === "") {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }
    if (!college || college.trim() === "") {
      return NextResponse.json(
        { error: "College is required" },
        { status: 400 }
      );
    }
    if (!year) {
      return NextResponse.json({ error: "Year is required" }, { status: 400 });
    }
    if (!department || department.trim() === "") {
      return NextResponse.json(
        { error: "Department is required" },
        { status: 400 }
      );
    }

    const yearNum = Number(year);
    if (isNaN(yearNum) || yearNum < 1 || yearNum > 5) {
      return NextResponse.json(
        { error: "Year must be between 1 and 5" },
        { status: 400 }
      );
    }

    const phoneRegex = /^[\d\s+\-()?]+$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Re-validate token server-side (always — never trust the client)
    const user = await User.findOne({
      profileCompletionToken: token,
      profileCompletionExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired link" },
        { status: 401 }
      );
    }

    // Update profile and invalidate the token in one atomic write
    user.name = name.trim();
    user.phoneNo = phone.trim();
    user.college = college.trim();
    user.year = yearNum;
    user.department = department.trim();
    user.onboardingCompleted = true;

    // Single-use: clear token immediately
    user.profileCompletionToken = null;
    user.profileCompletionExpires = null;

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Profile completed successfully",
    });
  } catch (error) {
    console.error("[COMPLETE-PROFILE POST]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
