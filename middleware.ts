import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE_NAME = "wecare_auth";
const JWT_SECRET = process.env.JWT_SECRET ?? "wecare-dev-secret";
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jwtVerify(token, secretKey);

    if (pathname.startsWith("/admin") && payload.role !== "ADMIN") {
      const groupUrl = new URL("/group", request.url);
      groupUrl.searchParams.set("error", "forbidden");
      return NextResponse.redirect(groupUrl);
    }

    return NextResponse.next();
  } catch {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    loginUrl.searchParams.set("error", "invalid_session");

    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete(AUTH_COOKIE_NAME);
    return response;
  }
}

export const config = {
  matcher: ["/group/:path*", "/admin/:path*"],
};
