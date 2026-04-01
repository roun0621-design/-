// ──────────────────────────────────────────
// Middleware – next-intl v3 locale routing
// ──────────────────────────────────────────
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    "/(ko|en)/:path*",
    "/((?!api|_next|_vercel|images|.*\\..*).*)",
  ],
};
