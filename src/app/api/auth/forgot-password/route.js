// /app/api/auth/forgot-password/route.js
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import crypto from "crypto";
import { sendResetPasswordEmail } from "@/lib/email";

export async function POST(request) {
  try {
    await connectToDatabase();
    const { email } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // For security reasons, don't reveal if user exists
      return new Response(
        JSON.stringify({ message: "If your email exists in our system, you will receive a reset link shortly" }),
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    // Send reset password email
    await sendResetPasswordEmail(email, resetToken);

    return new Response(
      JSON.stringify({ message: "Password reset link sent" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500 }
    );
  }
}