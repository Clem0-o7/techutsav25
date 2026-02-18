//@/api/auth/logout

import { serialize } from "cookie";

const clearAuthCookie = () => {
  return serialize("auth-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0, // Expire immediately
    path: "/",
  });
};

export async function GET() {
  try {
    const cookie = clearAuthCookie();

    return new Response(
      JSON.stringify({ success: true, message: "Logout successful" }),
      { status: 200, headers: { "Set-Cookie": cookie, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Logout error:", error.message);
    return new Response(JSON.stringify({ error: "Logout failed" }), { status: 500 });
  }
}

export async function POST() {
  try {
    const cookie = clearAuthCookie();

    return new Response(
      JSON.stringify({ success: true, message: "Logout successful" }),
      { status: 200, headers: { "Set-Cookie": cookie, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Logout error:", error.message);
    return new Response(JSON.stringify({ error: "Logout failed" }), { status: 500 });
  }
}
