import { NextRequest, NextResponse } from "next/server";
import { getAuthToken, getUserData } from "@/lib/cookies";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Get token and user data
  const token = await getAuthToken();
  const userData = await getUserData();

  // Routes that require authentication
  const protectedRoutes = ["/user", "/admin", "/guide"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // If not logged in, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const user = userData;

    // Check if route is admin-only
    if (pathname.startsWith("/admin")) {
      // If user is not admin, redirect to appropriate dashboard
      if (!user || user.role !== "admin") {
        if (user?.role === "guide") {
          return NextResponse.redirect(new URL("/guide/dashboard", request.url));
        }
        return NextResponse.redirect(new URL("/user/dashboard", request.url));
      }
    }

    // Check if route is guide-only
    if (pathname.startsWith("/guide")) {
      // If user is not guide, redirect to appropriate dashboard
      if (!user || user.role !== "guide") {
        if (user?.role === "admin") {
          return NextResponse.redirect(new URL("/admin/users", request.url));
        }
        return NextResponse.redirect(new URL("/user/dashboard", request.url));
      }
    }

    // Check if route is user-only
    if (pathname.startsWith("/user")) {
      // If user is not regular user, redirect to appropriate dashboard
      if (!user || user.role === "guide") {
        return NextResponse.redirect(new URL("/guide/dashboard", request.url));
      }
      if (user?.role === "admin") {
        return NextResponse.redirect(new URL("/admin/users", request.url));
      }
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user/:path*",
    "/admin/:path*",
    "/guide/:path*",
    "/login",
    "/register",
  ],
};
