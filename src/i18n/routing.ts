// ──────────────────────────────────────────
// i18n Routing Configuration (next-intl v3)
// ──────────────────────────────────────────
import { defineRouting } from "next-intl/routing";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ko";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

// Navigation APIs (shared pathnames)
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);
