// /app/api/profile/getProfile/route.js
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { verify } from "jsonwebtoken";

export async function GET(request) {
  try {
    // Await cookies() to obtain the cookie store
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    
    const decoded = verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    
    await connectToDatabase();
    const user = await User.findById(decoded.userId);
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
    
    const { fullName, email, phoneNumber, collegeName, department, paid, transactionNumber, selectedDepartment } = user;
    return new Response(
      JSON.stringify({ fullName, email, phoneNumber, collegeName, department, paid, transactionNumber, selectedDepartment }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile fetch error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
