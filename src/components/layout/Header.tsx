"use client";
// ──────────────────────────────────────────
// Header – Minimal White Navigation
// Persistent "PACE RISE : Node" launch button + Services menu
// ──────────────────────────────────────────
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Menu, X, Globe, ChevronDown, ExternalLink, Zap, Monitor } from "lucide-react";
import type { Locale } from "@/i18n/routing";

const NODE_URL = "https://pace-rise-node.com";

const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
] as const;

const tailNavItems = [
  { key: "news", href: "/news" },
  { key: "contact", href: "/contact" },
] as const;

const serviceItems = [
  { label: "WAVELIGHT SYSTEM", href: "/services/pacing-light", icon: Zap },
  { label: "PACE RISE : Node", href: "/services/cos", icon: Monitor },
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const servicesActive = pathname.startsWith("/services");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_0_#E5E5E5]"
          : "bg-white/70 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-[72px]">
          {/* Logo */}
          <Link href="/" className="group shrink-0 inline-flex items-center">
            <span className="font-display text-lg sm:text-xl md:text-[22px] tracking-[0.12em] leading-none text-pr-primary group-hover:text-pr-brand transition-colors duration-300">
              PACE RISE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className={`px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 rounded-lg ${
                  isActive(href) ? "text-pr-brand" : "text-pr-secondary hover:text-pr-primary"
                }`}
              >
                {t(key)}
              </Link>
            ))}

            {/* Services dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 rounded-lg ${
                  servicesActive ? "text-pr-brand" : "text-pr-secondary group-hover:text-pr-primary"
                }`}
              >
                {t("services")}
                <ChevronDown size={13} strokeWidth={2} className="transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200">
                <div className="w-64 rounded-2xl border border-pr-border bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-2">
                  {serviceItems.map(({ label, href, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-pr-brand-light transition-colors duration-200 group/item"
                    >
                      <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-pr-brand-light text-pr-brand shrink-0">
                        <Icon size={16} strokeWidth={1.5} />
                      </span>
                      <span className="font-display text-[12px] tracking-wider text-pr-primary group-hover/item:text-pr-brand transition-colors">
                        {label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {tailNavItems.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className={`px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 rounded-lg ${
                  isActive(href) ? "text-pr-brand" : "text-pr-secondary hover:text-pr-primary"
                }`}
              >
                {t(key)}
              </Link>
            ))}

            {/* Locale Switcher */}
            <button
              onClick={switchLocale}
              className="ml-1 flex items-center gap-1.5 px-2.5 py-2 text-[13px] text-pr-secondary hover:text-pr-primary rounded-lg transition-colors duration-200"
              aria-label="Switch language"
            >
              <Globe size={15} strokeWidth={1.5} />
              <span className="font-display text-[11px] tracking-wider">
                {locale === "ko" ? "EN" : "KO"}
              </span>
            </button>

            {/* Persistent Node launch button */}
            <a
              href={NODE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-1.5 pl-4 pr-3.5 py-2 rounded-full bg-pr-brand text-white text-[12px] font-display tracking-wider hover:bg-[#A48D4A] hover:shadow-[0_4px_16px_rgba(183,159,88,0.3)] transition-all duration-300"
            >
              {t("node_cta")}
              <ExternalLink size={13} strokeWidth={2} />
            </a>
          </nav>

          {/* Mobile actions */}
          <div className="flex md:hidden items-center gap-1.5">
            {/* Compact Node button – always visible on mobile */}
            <a
              href={NODE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 pl-3 pr-2.5 py-1.5 rounded-full bg-pr-brand text-white text-[11px] font-display tracking-wider active:scale-95 transition-transform"
              aria-label="Open PACE RISE Node"
            >
              Node
              <ExternalLink size={11} strokeWidth={2.5} />
            </a>
            <button
              onClick={switchLocale}
              className="p-2 text-pr-secondary hover:text-pr-primary"
              aria-label="Switch language"
            >
              <Globe size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 -mr-1 text-pr-secondary hover:text-pr-primary"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-pr-border">
          <nav className="px-5 py-4 space-y-0.5">
            {navItems.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 text-[15px] font-medium rounded-xl transition-colors ${
                  isActive(href) ? "text-pr-brand bg-pr-brand-light" : "text-pr-secondary hover:bg-gray-50"
                }`}
              >
                {t(key)}
              </Link>
            ))}

            {/* Services group */}
            <div className="px-4 pt-3 pb-1">
              <span className="font-display text-[10px] tracking-[0.2em] text-pr-tertiary uppercase">
                {t("services")}
              </span>
            </div>
            {serviceItems.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive(href) ? "bg-pr-brand-light" : "hover:bg-gray-50"
                }`}
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-pr-brand-light text-pr-brand shrink-0">
                  <Icon size={16} strokeWidth={1.5} />
                </span>
                <span className="font-display text-[13px] tracking-wider text-pr-primary">{label}</span>
              </Link>
            ))}

            <div className="pt-2" />
            {tailNavItems.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 text-[15px] font-medium rounded-xl transition-colors ${
                  isActive(href) ? "text-pr-brand bg-pr-brand-light" : "text-pr-secondary hover:bg-gray-50"
                }`}
              >
                {t(key)}
              </Link>
            ))}

            {/* Full-width Node CTA */}
            <a
              href={NODE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-pr-brand text-white text-[14px] font-display tracking-wider"
            >
              {t("node_cta")}
              <ExternalLink size={14} strokeWidth={2} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
