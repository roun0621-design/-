"use client";
// ──────────────────────────────────────────
// Footer – Minimal White Theme
// ──────────────────────────────────────────
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Mail, ExternalLink, Camera } from "lucide-react";
import { nl2br } from "@/utils/nl2br";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-pr-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src="/logo-character-gold.png"
                alt="PACE RISE"
                className="w-10 h-auto"
                loading="lazy"
              />
              <span className="font-display text-3xl tracking-wider text-pr-primary">
                PACE RISE
              </span>
            </div>
            <p className="mt-4 text-pr-secondary text-sm leading-relaxed max-w-sm">
              {nl2br(t("description"))}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="font-display text-xs tracking-[0.2em] text-pr-primary uppercase mb-5">
              {t("quick_links")}
            </h4>
            <ul className="space-y-3">
              {(["home", "about", "news", "contact"] as const).map((key) => (
                <li key={key}>
                  <Link
                    href={key === "home" ? "/" : `/${key}`}
                    className="text-sm text-pr-secondary hover:text-pr-brand transition-colors duration-200"
                  >
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h4 className="font-display text-xs tracking-[0.2em] text-pr-primary uppercase mb-5">
              SERVICES
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/pacing-light"
                  className="text-sm text-pr-secondary hover:text-pr-brand transition-colors duration-200"
                >
                  WAVELIGHT SYSTEM
                </Link>
              </li>
              <li>
                <Link
                  href="/services/cos"
                  className="text-sm text-pr-secondary hover:text-pr-brand transition-colors duration-200"
                >
                  PACE RISE : Node
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h4 className="font-display text-xs tracking-[0.2em] text-pr-primary uppercase mb-5">
              {t("contact_us")}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:pacerise.run@gmail.com"
                  className="text-sm text-pr-secondary hover:text-pr-brand transition-colors duration-200 inline-flex items-center gap-1.5"
                >
                  <Mail size={13} strokeWidth={1.5} />
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/pace.rise"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-pr-secondary hover:text-pr-brand transition-colors duration-200 inline-flex items-center gap-1.5"
                >
                  <Camera size={13} strokeWidth={1.5} />
                  @pace.rise
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-pr-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-pr-tertiary">
            {t("copyright", { year: year.toString() })}
          </p>
          <p className="text-xs text-pr-tertiary tracking-wider font-display">
            pace-rise.com
          </p>
        </div>
      </div>
    </footer>
  );
}
