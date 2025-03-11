// /app/api/auth/verify-email/route.js
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return new Response(
        JSON.stringify({ error: "Missing email or OTP" }),
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    // Check if the OTP matches and is not expired
    if (user.emailOTP !== otp || new Date() > user.emailOTPExpires) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired OTP" }),
        { status: 400 }
      );
    }

    // Mark user as verified and clear OTP fields
    user.verified = true;
    user.emailOTP = undefined;
    user.emailOTPExpires = undefined;
    await user.save();

    return new Response(
      JSON.stringify({ message: "Email verified successfully", verified: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Email verification error:", error);
    return new Response(
      JSON.stringify({ error: "Verification failed" }),
      { status: 500 }
    );
  }
}
