"use client";
// ──────────────────────────────────────────
// About Page – Company & Technology (White Theme)
// ──────────────────────────────────────────
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Zap, Monitor, Award, Target, Users, TrendingUp } from "lucide-react";

const techItems = [
  { key: "pacing", icon: Zap },
  { key: "cos", icon: Monitor },
] as const;

const history = [
  { year: "2023", event_ko: "PACE RISE 설립", event_en: "PACE RISE founded" },
  { year: "2023", event_ko: "웨이브라이트 페이싱 시스템 도입 · 첫 대회 운영", event_en: "Wavelight pacing system introduction · First event" },
  { year: "2024", event_ko: "실시간 경기 운영 시스템(COS) 개발 완료", event_en: "Competition Operating System (COS) development completed" },
  { year: "2024", event_ko: "PACE RISE : Node 런칭", event_en: "PACE RISE : Node launched" },
  { year: "2025", event_ko: "주요 마라톤/트랙 대회 다수 운영", event_en: "Multiple major marathon/track events operated" },
];

export default function AboutPage() {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero Banner */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.p
            className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ABOUT US
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-pr-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t("title")}
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-pr-secondary font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Mission */}
      <section className="py-20 md:py-28 bg-[var(--pr-bg-secondary)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            className="bg-white rounded-2xl border border-pr-border p-10 md:p-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-pr-brand-light text-pr-brand">
                <Target size={20} strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-pr-primary">
                {t("mission_title")}
              </h2>
            </div>
            <p className="text-pr-secondary text-lg leading-relaxed font-sans">
              {t("mission_desc")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Role / Bridge */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { key: "youth", icon: Users },
              { key: "elite", icon: TrendingUp },
              { key: "masters", icon: Award },
            ].map(({ key, icon: Icon }, i) => (
              <motion.div
                key={key}
                className="p-8 rounded-2xl border border-pr-border hover:border-pr-brand/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl bg-pr-brand-light text-pr-brand mb-5">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-sm tracking-wider text-pr-primary mb-3">
                  {t(`target_${key}` as any)}
                </h3>
                <p className="text-sm text-pr-secondary leading-relaxed font-sans">
                  {t(`target_${key}_desc` as any)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Technology */}
      <section className="py-20 md:py-28 bg-[var(--pr-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-4">TECHNOLOGY</p>
            <h2 className="text-3xl md:text-4xl font-bold text-pr-primary">{t("tech_title")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techItems.map(({ key, icon: Icon }, i) => (
              <motion.div
                key={key}
                className="bg-white rounded-2xl border border-pr-border p-8 hover:border-pr-brand/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-pr-brand-light text-pr-brand mb-6">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-pr-primary mb-3">
                  {t(`tech_${key}` as any)}
                </h3>
                <p className="text-sm text-pr-secondary leading-relaxed font-sans">
                  {t(`tech_${key}_desc` as any)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-4">HISTORY</p>
            <h2 className="text-3xl md:text-4xl font-bold text-pr-primary">{t("history_title")}</h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-pr-border" />

            {history.map((item, i) => (
              <motion.div
                key={i}
                className={`relative flex items-start gap-6 mb-10 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-pr-brand border-2 border-white z-10" style={{ boxShadow: "0 0 0 3px var(--pr-bg-secondary)" }} />

                <div
                  className={`ml-12 md:ml-0 md:w-[45%] ${
                    i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                  }`}
                >
                  <span className="font-display text-pr-brand text-sm tracking-wider">
                    {item.year}
                  </span>
                  <p className="mt-1 text-pr-secondary font-sans">
                    {locale === "ko" ? item.event_ko : item.event_en}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
