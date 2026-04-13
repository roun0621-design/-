// ──────────────────────────────────────────
// Middleware – next-intl v3 locale routing
// + 존재하지 않는 URL → 홈 리다이렉트
// (카페24 이전 사이트 인덱스 정리용)
// ──────────────────────────────────────────
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

// 실제 존재하는 라우트 목록 (locale prefix 제외)
const validRoutes = new Set([
  "/",
  "/about",
  "/news",
  "/contact",
  "/services/cos",
  "/services/pacing-light",
]);

// 동적 라우트 패턴 (/news/[slug])
const dynamicPatterns = [
  /^\/news\/.+$/,
];

// 의미 있는 이전 URL → 적절한 페이지로 매핑
const legacyRedirects: Record<string, string> = {
  "/About": "/about",
  "/WLxPR": "/services/pacing-light",
  "/1527524024": "/contact",
};

function isValidRoute(path: string): boolean {
  // 정확히 일치하는 라우트
  if (validRoutes.has(path)) return true;
  // 동적 라우트 패턴 매칭
  return dynamicPatterns.some((pattern) => pattern.test(path));
}

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. 의미 있는 이전 URL → 적절한 페이지로 리다이렉트
  const redirectTo = legacyRedirects[pathname];
  if (redirectTo) {
    const url = request.nextUrl.clone();
    url.pathname = redirectTo;
    return NextResponse.redirect(url, 308);
  }

  // 2. locale prefix 제거 후 실제 라우트 존재 여부 확인
  //    /ko/about → /about, /en/news/slug → /news/slug
  const stripped = pathname.replace(/^\/(ko|en)/, "") || "/";

  // 3. 존재하지 않는 라우트 → 홈으로 리다이렉트
  //    (카페24 이전 사이트 잔여 URL: /31, /board, /product/xyz 등)
  if (!isValidRoute(stripped) && !isValidRoute(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
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
