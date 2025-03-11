import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "@/lib/email";
import { serialize } from "cookie";

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { email, fullName, phoneNumber, collegeName, department, password, selectedDepartment } = body;

    if (!email || !fullName || !phoneNumber || !collegeName || !department || !password) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    const user = await User.create({
      email,
      fullName,
      phoneNumber,
      collegeName,
      department,
      password,
      selectedDepartment,
      paid: false,
      transactionNumber: "",
      transactionScreenshot: "",
    });

    // Generate a 6-digit OTP and set expiry (10 minutes)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.emailOTP = otp;
    user.emailOTPExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    // Send verification email
    await sendVerificationEmail(email, otp);

    // Generate JWT token (7 days validity)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Set token in secure, HTTP-only cookie
    const cookie = serialize("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return new Response(
      JSON.stringify({ 
        user: { fullName: user.fullName, email: user.email, verified: user.verified }, 
        token // Return token for localStorage
      }),
      { status: 201, headers: { "Set-Cookie": cookie } }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(JSON.stringify({ error: "Registration failed" }), { status: 500 });
  }
}
