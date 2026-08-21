import { getNewAccessToken } from "@/services/refreshToken";
import { jwtUtils } from "@/utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Authentication Routes
const AUTH_ROUTES = ["/auth/login", "/auth/register"];

// Public Routes
const PUBLIC_ROUTES = ["/", "/gear"];

// Main Proxy
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const cookieStore = await cookies();

  // Get Tokens
  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // Verify Access Token
  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  // Verify Refresh Token
  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;

  // == Refresh Access Token

  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getNewAccessToken();

    if (result?.success) {
      const newAccessToken = result.data.accessToken;

      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
        path: "/",
      });

      accessToken = newAccessToken;

      decodedAccessToken = jwtUtils.verifyToken(
        accessToken as string,
        process.env.JWT_ACCESS_SECRET as string,
      );
    }
  }

  // == Get User Role

  let userRole: string | null = null;

  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role as string;
  }

  // == Invalid Access Token

  if (accessToken && !decodedAccessToken?.success) {
    cookieStore.delete("accessToken");

    accessToken = undefined;

    userRole = null;
  }

  // == Route Types
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // == Logged-in User → Auth Pages

  if (accessToken && userRole && isAuthRoute) {
    if (userRole === "CUSTOMER") {
      return NextResponse.redirect(new URL("/dashboard/customer", request.url));
    }

    if (userRole === "PROVIDER") {
      return NextResponse.redirect(new URL("/dashboard/provider", request.url));
    }

    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  // == Protected Route

  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // == CUSTOMER Authorization
  if (pathname.startsWith("/dashboard/customer") && userRole !== "CUSTOMER") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  // == PROVIDER Authorization
  if (pathname.startsWith("/dashboard/provider") && userRole !== "PROVIDER") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  // == ADMIN Authorization
  if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  // == Continue Request
  return NextResponse.next();
}

// == Matcher

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};
