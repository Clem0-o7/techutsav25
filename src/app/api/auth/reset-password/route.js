// /app/api/auth/reset-password/route.js
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectToDatabase();
    const { token, password } = await request.json();

    if (!token || !password) {
      return new Response(JSON.stringify({ error: "Missing token or password" }), { status: 400 });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid or expired token" }), { status: 400 });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return new Response(
      JSON.stringify({ message: "Password has been reset" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to reset password" }),
      { status: 500 }
    );
  }
}