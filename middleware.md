import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  
  console.log(`🔥 MIDDLEWARE RUNNING: ${pathname}`);

  /* =========================
     TEASER MODE (GLOBAL LOCK)
     ========================= */
  // Force teaser mode for testing - you can change this to use env var later
  const teaserMode = true; // process.env.NEXT_PUBLIC_TEASER_MODE === "true";
  
  console.log(`🔥 TEASER MODE: ${teaserMode}`);

  if (teaserMode) {
    console.log(`🔥 TEASER MODE ACTIVE - checking path: ${pathname}`);
    
    // Allow coming soon page
    if (pathname === "/coming-soon") {
      console.log(`🔥 ALLOWING coming-soon page`);
      return NextResponse.next();
    }

    // Allow Next.js internals & static files
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/favicon") ||
      pathname.startsWith("/images")
    ) {
      console.log(`🔥 ALLOWING static file: ${pathname}`);
      return NextResponse.next();
    }

    // Everything else → coming soon
    console.log(`🔥 REDIRECTING ${pathname} to /coming-soon`);
    return NextResponse.redirect(
      new URL("/coming-soon", request.url)
    );
  }

  /* =========================
     AUTH LOGIC (EXISTING)
     ========================= */
  const token = request.cookies.get("auth-token")?.value;

  try {
    if (token) {
      verify(token, process.env.JWT_SECRET);

      // Prevent access to login/signup/register if authenticated
      if (
        pathname.startsWith("/auth/login") ||
        pathname.startsWith("/auth/signup") ||
        pathname === "/register"
      ) {
        return NextResponse.redirect(
          new URL("/profile", request.url)
        );
      }

      return NextResponse.next();
    }
  } catch (error) {
    // Token invalid or missing → protect routes
    if (
      ["/profile", "/api/protected"].some((route) =>
        pathname.startsWith(route)
      )
    ) {
      return NextResponse.redirect(
        new URL("/auth/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/((?!api|_next|favicon.ico).*)',
  ],
};
