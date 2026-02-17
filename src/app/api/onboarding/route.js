import { connectToDatabase } from "@/lib/mongodb"
import User from "@/lib/models/User"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const data = await req.json()
    const { userId, phoneNo, college, year, department } = data

    // Validation
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }
    
    if (!phoneNo || !college || !year || !department) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate phone number format (basic)
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(phoneNo)) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 })
    }

    // Validate year
    const yearNum = Number(year);
    if (isNaN(yearNum) || yearNum < 1 || yearNum > 5) {
      return NextResponse.json({ error: "Year must be between 1 and 5" }, { status: 400 })
    }

    await connectToDatabase()

    const user = await User.findByIdAndUpdate(
      userId,
      {
        phoneNo: phoneNo.trim(),
        college: college.trim(),
        year: yearNum,
        department: department.trim(),
        onboardingCompleted: true,
      },
      { new: true }
    )

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    console.log(`[ONBOARDING] User ${user.email} completed onboarding successfully`)

    return NextResponse.json({ 
      success: true, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      message: "Onboarding completed successfully!"
    })
  } catch (error) {
    console.error("[ONBOARDING ERROR]", error)
    return NextResponse.json({ 
      error: "An unexpected error occurred",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    }, { status: 500 })
  }
}
