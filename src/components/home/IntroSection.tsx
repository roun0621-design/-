"use client";
// ──────────────────────────────────────────
// Intro Section – "PACE RISE가 뭐 하는 회사인가"를 한 문장으로
// + 방문자 유형별 바로가기 (연맹·주최 / 팀·선수 / 브랜드)
// 처음 방문한 거래처·외부인이 회사를 빠르게 이해하도록 히어로 바로 아래 배치
// ──────────────────────────────────────────
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Monitor, Zap, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

const paths = [
  { key: "org", icon: Monitor, href: "/services/cos" },
  { key: "team", icon: Zap, href: "/services/pacing-light" },
  { key: "brand", icon: Sparkles, href: "/services/brand-events" },
] as const;

export default function IntroSection() {
  const t = useTranslations("home");

  return (
    <section className="py-16 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* One-sentence company definition */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-4">
              {t("intro_label")}
            </p>
            <h2 className="text-2xl md:text-[32px] font-bold tracking-tight text-pr-primary leading-[1.4]">
              {t("intro_title")}
            </h2>
            <p className="mt-6 text-[15px] md:text-base text-pr-secondary leading-relaxed font-sans">
              {t("intro_desc")}
            </p>
          </motion.div>

          {/* Paths by visitor type */}
          <div className="lg:col-span-6">
            <p className="text-sm font-semibold text-pr-primary mb-4 font-sans">
              {t("intro_paths_title")}
            </p>
            <ul className="space-y-3">
              {paths.map(({ key, icon: Icon, href }, i) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={href}
                    className="group flex items-center gap-4 p-5 rounded-2xl border border-pr-border bg-white hover:border-pr-brand hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300"
                  >
                    <span className="w-11 h-11 flex items-center justify-center rounded-xl bg-pr-brand-light text-pr-brand shrink-0">
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-base font-bold tracking-tight text-pr-primary group-hover:text-pr-brand transition-colors duration-300">
                        {t(`intro_path_${key}_who` as any)}
                      </span>
                      <span className="block mt-1 text-[13px] text-pr-secondary leading-relaxed font-sans">
                        {t(`intro_path_${key}_desc` as any)}
                      </span>
                      <span className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-display tracking-wider text-pr-brand group-hover:gap-2.5 transition-all duration-300">
                        {t(`intro_path_${key}_link` as any)}
                        <ArrowRight size={12} strokeWidth={2} />
                      </span>
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
