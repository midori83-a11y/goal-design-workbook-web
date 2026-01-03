import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 1) Next.js内部アセットは通す
  if (pathname.startsWith("/_next")) return NextResponse.next();

  // 2) 拡張子があるもの（= publicの画像/CSS/JS等）は通す
  //    例: /next.svg /vercel.svg /favicon.ico /images/a.png など
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) return NextResponse.next();

  // 3) トップは表示
  if (pathname === "/") return NextResponse.next();

  // 4) それ以外はトップへ
  const url = req.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/:path*"],
};
