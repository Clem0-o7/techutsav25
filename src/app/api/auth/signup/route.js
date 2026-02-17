// /app/api/auth/signup/route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req) {
  try {
    // Check critical environment variables first
    if (!process.env.MONGODB_URI) {
      console.error("[SIGNUP ERROR] MONGODB_URI not set");
      return NextResponse.json(
        { error: "Server configuration error. Please contact support." },
        { status: 500 }
      );
    }

    if (!process.env.EMAIL_SERVER_HOST || !process.env.EMAIL_SERVER_USER) {
      console.error("[SIGNUP ERROR] Email configuration missing");
      return NextResponse.json(
        { error: "Email service not configured. Please contact support." },
        { status: 500 }
      );
    }

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

    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

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
    let connection;
    try {
      connection = await connectToDatabase();
      console.log("[SIGNUP] Database connected");
    } catch (dbError) {
      console.error("[SIGNUP ERROR] Database connection failed:", dbError);
      return NextResponse.json(
        { error: "Database connection error. Please try again later." },
        { status: 503 }
      );
    }

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

    console.log(`[SIGNUP] User created: ${email}`);

    //  Send verification email
    try {
      await sendVerificationEmail(email, token);
      console.log(`[SIGNUP] Verification email sent to: ${email}`);
    } catch (emailErr) {
      console.error(`[SIGNUP ERROR] Failed to send verification email:`, emailErr);

      // Delete user if email sending fails
      await User.findByIdAndDelete(user._id);

      const errorMessage =
        emailErr instanceof Error
          ? emailErr.message
          : JSON.stringify(emailErr);

      return NextResponse.json(
        {
          error: "Failed to send verification email. Please check your email address.",
          details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
        },
        { status: 500 }
      );
    }

    //  Success
    return NextResponse.json({
      success: true,
      userId: user._id,
      message: "Account created successfully. Please check your email to verify your account.",
    });
  } catch (err) {
    console.error("[SIGNUP ERROR] Unexpected error:", err);

    const message = err instanceof Error ? err.message : JSON.stringify(err);

    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again.",
        details: process.env.NODE_ENV === "development" ? message : undefined,
      },
      { status: 500 }
    );
  }
}
