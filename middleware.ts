import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // トップページは誰でもOK
  if (pathname === "/") {
    return NextResponse.next();
  }

  // それ以外は全部トップに戻す
  return NextResponse.redirect(new URL("/", request.url));
}

// 対象にするパス
export const config = {
  matcher: "/((?!_next|favicon.ico).*)",
};
