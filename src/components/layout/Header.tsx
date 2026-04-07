"use client";
// ──────────────────────────────────────────
// Header – Minimal White Navigation
// ──────────────────────────────────────────
import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = () => {
    const next = locale === "ko" ? "en" : "ko";
    router.replace(pathname, { locale: next });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_0_#E5E5E5]"
          : "bg-white/70 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo-character-gold.png"
              alt=""
              className="w-7 h-auto md:w-8"
              loading="eager"
            />
            <span className="font-display text-lg md:text-xl tracking-wider text-pr-primary group-hover:text-pr-brand transition-colors duration-300">
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
                  className={`px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 rounded-lg ${
                    isActive
                      ? "text-pr-brand"
                      : "text-pr-secondary hover:text-pr-primary"
                  }`}
                >
                  {t(key)}
                </Link>
              );
            })}

            {/* Locale Switcher */}
            <button
              onClick={switchLocale}
              className="ml-4 flex items-center gap-1.5 px-3 py-2 text-[13px] text-pr-secondary hover:text-pr-primary rounded-lg transition-colors duration-200"
              aria-label="Switch language"
            >
              <Globe size={15} strokeWidth={1.5} />
              <span className="font-display text-[11px] tracking-wider">
                {locale === "ko" ? "EN" : "KO"}
              </span>
            </button>
          </nav>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={switchLocale}
              className="p-2 text-pr-secondary hover:text-pr-primary"
              aria-label="Switch language"
            >
              <Globe size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-pr-secondary hover:text-pr-primary"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={20} strokeWidth={1.5} />
              ) : (
                <Menu size={20} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-pr-border">
          <nav className="px-6 py-4 space-y-1">
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
                  className={`block px-4 py-3 text-[15px] font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-pr-brand bg-pr-brand-light"
                      : "text-pr-secondary hover:text-pr-primary hover:bg-gray-50"
                  }`}
                >
                  {t(key)}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
