// ──────────────────────────────────────────
// Middleware – next-intl v3 locale routing
// + 이전 사이트(카페24) URL 리다이렉트
// ──────────────────────────────────────────
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

// 이전 사이트 URL 매핑 (대소문자 정확히 매칭)
const legacyRedirects: Record<string, string> = {
  "/About": "/about",
  "/WLxPR": "/services/pacing-light",
  "/1527524024": "/contact",
  "/21": "/",
  "/23": "/",
  "/25": "/",
  "/32": "/",
};

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 이전 사이트 URL 리다이렉트 (next-intl 처리 전에 실행)
  const redirectTo = legacyRedirects[pathname];
  if (redirectTo) {
    const url = request.nextUrl.clone();
    url.pathname = redirectTo;
    return NextResponse.redirect(url, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(ko|en)/:path*",
    "/((?!api|_next|_vercel|images|.*\\..*).*)",
  ],
};
