//@/api/auth/logout

import { serialize } from "cookie";

export async function GET() {
  try {
    // Clear the auth-token cookie
    const cookie = serialize("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // Expire immediately
      path: "/",
    });

    return new Response(
      JSON.stringify({ message: "Logout successful" }),
      { status: 200, headers: { "Set-Cookie": cookie, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Logout error:", error.message);
    return new Response(JSON.stringify({ error: "Logout failed" }), { status: 500 });
  }
}
