"use client";
// ──────────────────────────────────────────
// Header – Global Navigation
// ──────────────────────────────────────────
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Menu, X, Globe } from "lucide-react";
import type { Locale } from "@/i18n/routing";

const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "news", href: "/news" },
  { key: "contact", href: "/contact" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const switchLocale = () => {
    const next = locale === "ko" ? "en" : "ko";
    router.replace(pathname, { locale: next });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--pr-black)]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display text-xl md:text-2xl tracking-wider text-[var(--pr-accent)] group-hover:glow-accent transition-all">
              PACE RISE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ key, href }) => {
              const isActive =
                href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href);
              return (
                <Link
                  key={key}
                  href={href}
                  className={`px-4 py-2 text-sm font-medium tracking-wide transition-colors rounded-lg ${
                    isActive
                      ? "text-[var(--pr-accent)] bg-white/5"
                      : "text-[var(--pr-gray-400)] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {t(key)}
                </Link>
              );
            })}

            {/* Records CTA (external) */}
            <a
              href="https://records.pace-rise.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 text-sm font-medium tracking-wide bg-[var(--pr-accent)]/10 text-[var(--pr-accent)] border border-[var(--pr-accent)]/30 rounded-lg hover:bg-[var(--pr-accent)]/20 transition-all"
            >
              {t("records")}
            </a>

            {/* Locale Switcher */}
            <button
              onClick={switchLocale}
              className="ml-3 flex items-center gap-1.5 px-3 py-2 text-sm text-[var(--pr-gray-400)] hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Switch language"
            >
              <Globe size={16} />
              <span className="uppercase font-mono text-xs">
                {locale === "ko" ? "EN" : "KO"}
              </span>
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={switchLocale}
              className="p-2 text-[var(--pr-gray-400)] hover:text-white"
              aria-label="Switch language"
            >
              <Globe size={18} />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[var(--pr-gray-400)] hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--pr-black)]/95 backdrop-blur-xl border-t border-white/5">
          <nav className="px-4 py-4 space-y-1">
            {navItems.map(({ key, href }) => {
              const isActive =
                href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href);
              return (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-[var(--pr-accent)] bg-white/5"
                      : "text-[var(--pr-gray-400)] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {t(key)}
                </Link>
              );
            })}
            <a
              href="https://records.pace-rise.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-base font-medium text-[var(--pr-accent)] bg-[var(--pr-accent)]/10 rounded-lg"
            >
              {t("records")}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
