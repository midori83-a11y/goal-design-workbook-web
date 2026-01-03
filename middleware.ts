import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // ✅ Next.jsの静的ファイルは通す（これ通さないと表示が壊れる）
  if (pathname.startsWith("/_next")) return NextResponse.next();

  // ✅ よくある静的ファイルも通す（必要に応じて増やせる）
  if (pathname === "/favicon.ico") return NextResponse.next();
  if (pathname === "/robots.txt") return NextResponse.next();
  if (pathname === "/sitemap.xml") return NextResponse.next();

  // ✅ トップはそのまま表示
  if (pathname === "/") return NextResponse.next();

  // ✅ それ以外はトップに戻す
  const url = req.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/:path*"],
};
