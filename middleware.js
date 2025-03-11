import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export function middleware(request) {
  const token = request.cookies.get("auth-token")?.value;
  const pathname = request.nextUrl.pathname;

  try {
    if (token) {
      verify(token, process.env.JWT_SECRET);

      // Prevent access to login/signup if authenticated
      if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup") || pathname === "/register") {
        return NextResponse.redirect(new URL("/profile", request.url));
      }

      return NextResponse.next();
    }
  } catch (error) {
    // Token is invalid or missing, allow access to auth pages, but restrict protected routes
    if (["/profile", "/api/protected"].some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
  matcher: [
    "/register",
    "/profile/:path*",
    "/api/protected/:path*",
    "/auth/login",
    "/auth/signup",
  ],
};
