import { NextResponse } from "next/server";

export function proxy(request) {
  const pathname = request.nextUrl.pathname;

  // Enable teaser mode via environment variable
  const teaserMode = process.env.NEXT_PUBLIC_TEASER_MODE === "true";

  if (teaserMode) {
    // List of paths allowed during teaser mode
    const allowedPaths = [
      "/coming-soon",
      "/api",          // All API routes (auth, onboarding, etc.)
      "/signup",       // Signup page
      "/login",        // Login page
      "/verify-email", // Email verification page
      "/onboarding",   // Onboarding form
      "/profile",      // User profile
      "/u/",           // User profiles after onboarding
      "/_next",        // Next.js internals
      "/favicon",      // favicon
      "/images",       // static images
      "/logos",        // logo images
    ];

    // Allow static files (like CSS, JS) and anything with an extension
    if (pathname.includes(".")) {
      return NextResponse.next();
    }

    // Check if the path starts with any allowed path
    const isAllowed = allowedPaths.some((p) => pathname.startsWith(p));
    if (isAllowed) {
      return NextResponse.next();
    }

    // Redirect all other paths to coming-soon
    return NextResponse.redirect(new URL("/coming-soon", request.url));
  }

  // If teaser mode is disabled, allow all requests
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
