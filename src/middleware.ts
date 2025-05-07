import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isAuth = req.cookies.get("accessToken")?.value;

  const isOnHomePage = req.nextUrl.pathname === "/";

  if (!isAuth && isOnHomePage) {
    const signInUrl = new URL("auth/signin", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // run only for the homepage
};
