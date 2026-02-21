import { parse } from "cookie";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function GET(req) {
  try {
    await connectToDatabase();
    const cookies = parse(req.headers.get("cookie") || "");
    const token = cookies["auth-token"];

    if (!token) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("name email isEmailVerified onboardingCompleted passes");

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }
}
