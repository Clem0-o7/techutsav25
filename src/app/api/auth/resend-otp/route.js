//@/app/api/auth/resend-otp/route.js

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.emailOTP = otp;
    user.emailOTPExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry
    await user.save();

    // Send the new OTP via email
    await sendVerificationEmail(email, otp);

    return new Response(JSON.stringify({ message: "OTP resent successfully" }), { status: 200 });
  } catch (error) {
    console.error("Resend OTP error:", error);
    return new Response(JSON.stringify({ error: "Failed to resend OTP" }), { status: 500 });
  }
}
