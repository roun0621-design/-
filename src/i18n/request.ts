// ──────────────────────────────────────────
// i18n Request Configuration (next-intl v3)
// ──────────────────────────────────────────
import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale, type Locale } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  return {
    messages: (await import(`./messages/${validLocale}.json`)).default,
  };
});
