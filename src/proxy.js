import { NextResponse } from "next/server";

export function proxy(request) {
  const pathname = request.nextUrl.pathname;

  // Enable teaser mode via environment variable
  const teaserMode = process.env.NEXT_PUBLIC_TEASER_MODE === "true";

  if (teaserMode) {
    // Allow only /coming-soon page
    if (pathname === "/coming-soon") {
      return NextResponse.next();
    }

    // Allow Next.js internals and static files
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/favicon") ||
      pathname.startsWith("/images") ||
      pathname.includes(".")
    ) {
      return NextResponse.next();
    }

    // Redirect everything else to coming-soon page
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