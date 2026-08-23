import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((request) => {
  if (!request.auth && request.nextUrl.pathname.startsWith("/dashboard")) {
    const signInUrl = new URL("/auth/signin", request.nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
