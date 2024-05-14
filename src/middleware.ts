import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req: any) {
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      !req.nextauth.token?.roles.includes("admin")
    ) {
      const absoluteURL = new URL(
        "/login?message=Not Authorized",
        req.nextUrl.origin,
      );
      return NextResponse.redirect(absoluteURL.toString());
    } else if (
      req.nextUrl.pathname.startsWith("/dashboard") &&
      !req.nextauth.token?.roles.includes("admin") &&
      !req.nextauth.token?.roles.includes("user")
    ) {
      const absoluteURL = new URL(
        "/login?message=Not Authorized",
        req.nextUrl.origin,
      );
      return NextResponse.redirect(absoluteURL.toString());
    }

    // if (req.nextUrl.pathname.startsWith("/user") && req.nextauth.token?.role !== "user") {
    //   return NextResponse.rewrite(
    //     new URL("/auth/login?message=Not Authorized", req.url)
    //   );
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  //   matcher: ["/admin/:path*", "/user/:path*"],
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
