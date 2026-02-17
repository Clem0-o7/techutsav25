//@/app/api/auth/login/route.js

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(request) {
  try {
    await connectToDatabase();
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing email or password" }), { status: 400 });
    }

    // Call User model's login method
    const user = await User.login(email, password);

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Set authentication cookie
    const cookie = serialize("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return new Response(
      JSON.stringify({ 
        user: { 
          name: user.name, 
          email: user.email, 
          isEmailVerified: user.isEmailVerified,
          onboardingCompleted: user.onboardingCompleted
        } 
      }),
      { status: 200, headers: { "Set-Cookie": cookie, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Login error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 401 });
  }
}
