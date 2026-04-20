import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminRequestAuthenticated } from "@/lib/auth/admin-session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    if (await isAdminRequestAuthenticated(request)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
  }

  if (!(await isAdminRequestAuthenticated(request))) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
