// ──────────────────────────────────────────
// Footer – Global Footer
// ──────────────────────────────────────────
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Camera, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--pr-black)] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="font-display text-2xl tracking-wider text-[var(--pr-accent)]">
              PACE RISE
            </span>
            <p className="mt-4 text-[var(--pr-gray-500)] text-sm leading-relaxed max-w-sm">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("quick_links")}
            </h4>
            <ul className="space-y-2.5">
              {(["home", "about", "news", "contact"] as const).map((key) => (
                <li key={key}>
                  <Link
                    href={key === "home" ? "/" : `/${key}`}
                    className="text-sm text-[var(--pr-gray-500)] hover:text-[var(--pr-accent)] transition-colors"
                  >
                    {nav(key)}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://records.pace-rise.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--pr-gray-500)] hover:text-[var(--pr-accent)] transition-colors inline-flex items-center gap-1"
                >
                  {nav("records")}
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("contact_us")}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:pacerise.run@gmail.com"
                  className="text-sm text-[var(--pr-gray-500)] hover:text-[var(--pr-accent)] transition-colors inline-flex items-center gap-2"
                >
                  <Mail size={14} />
                  pacerise.run@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/pace.rise"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--pr-gray-500)] hover:text-[var(--pr-accent)] transition-colors inline-flex items-center gap-2"
                >
                  <Camera size={14} />
                  @pace.rise
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--pr-gray-600)]">
            {t("copyright", { year: year.toString() })}
          </p>
          <p className="text-xs text-[var(--pr-gray-700)]">
            pace-rise.com
          </p>
        </div>
      </div>
    </footer>
  );
}
