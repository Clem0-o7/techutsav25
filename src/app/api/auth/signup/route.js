/*auth/signup/route.js*/

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

    let user = await User.findOne({ email });

    if (user) {
      if (!user.verified) {
        user.fullName = fullName;
        user.phoneNumber = phoneNumber;
        user.collegeName = collegeName;
        user.department = department;
        user.password = password;
        user.selectedDepartment = selectedDepartment;

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.emailOTP = otp;
        user.emailOTPExpires = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        await sendVerificationEmail(email, otp);

        return new Response(JSON.stringify({ message: "OTP resent for verification" }), { status: 200 });
      }
      return new Response(JSON.stringify({ error: "User already exists and is verified" }), { status: 400 });
    }

    user = await User.create({
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
      verified: false,
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.emailOTP = otp;
    user.emailOTPExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendVerificationEmail(email, otp);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const cookie = serialize("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return new Response(
      JSON.stringify({
        user: { fullName: user.fullName, email: user.email, verified: user.verified },
        token,
      }),
      { status: 201, headers: { "Set-Cookie": cookie } }
    );
  } catch (error) {
    console.error("Registration error:", error);

    // Extract Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return new Response(JSON.stringify({ error: errors.join(" | ") }), { status: 400 });
    }

    return new Response(JSON.stringify({ error: "Registration failed" }), { status: 500 });
  }
}
