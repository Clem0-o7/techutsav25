// /app/api/auth/signup/route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req) {
  try {
    //  Parse JSON safely
    let body;
    try {
      body = await req.json();
    } catch (err) {
      console.error("[SIGNUP] Failed to parse JSON:", err);
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    const { name, email, password, confirmPassword } = body;

    //  Validate input
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate name
    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }

    // Validate email format (supports subdomains like clement@student.tce.edu)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    //  Connect to MongoDB
    await connectToDatabase();

    //  Check if email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    //  Hash password
    const hashed = await bcrypt.hash(password, 12);

    //  Generate email verification token
    const token = crypto.randomBytes(32).toString("hex");

    //  Create user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashed,
      emailVerificationToken: token,
      emailVerificationExpires: Date.now() + 1000 * 60 * 60 * 24, // 24h
      isEmailVerified: false,
    });

    console.log(`[SIGNUP] User created successfully: ${email}`);

    //  Send verification email
    try {
      await sendVerificationEmail(email, token);
      console.log(`[SIGNUP] Verification email sent to: ${email}`);
    } catch (emailError) {
      console.error(`[SIGNUP ERROR] Failed to send verification email to ${email}:`, emailError.message);
      
      // Delete the user if email fails to send
      await User.findByIdAndDelete(user._id);
      
      return NextResponse.json(
        { 
          error: "Failed to send verification email. Please check your email address and try again.",
          details: process.env.NODE_ENV === "development" ? emailError.message : undefined
        },
        { status: 500 }
      );
    }

    //  Success response
    return NextResponse.json({ 
      success: true, 
      userId: user._id,
      message: "Account created successfully. Please check your email to verify your account."
    });
  } catch (err) {
    console.error("[SIGNUP ERROR] Unexpected error:", err);
    return NextResponse.json(
      { 
        error: "An unexpected error occurred. Please try again.",
        details: process.env.NODE_ENV === "development" ? err.message : undefined
      },
      { status: 500 }
    );
  }
}
