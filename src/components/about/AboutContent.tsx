"use client";
// ──────────────────────────────────────────
// About Page – Company & Technology
// ──────────────────────────────────────────
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Zap, Timer, QrCode, Award, Target, Users } from "lucide-react";

const techItems = [
  { key: "wavelight", icon: Zap },
  { key: "realtime", icon: Timer },
  { key: "qr", icon: QrCode },
] as const;

// 연혁 데이터 (하드코딩 — 추후 Sanity로 이관 가능)
const history = [
  { year: "2023", event_ko: "PACE RISE 설립", event_en: "PACE RISE founded" },
  { year: "2023", event_ko: "웨이브라이트 시스템 도입 · 첫 대회 운영", event_en: "Wavelight system introduction · First event operation" },
  { year: "2024", event_ko: "QR 비브 시스템 개발 완료", event_en: "QR Bib system development completed" },
  { year: "2024", event_ko: "실시간 기록 조회 시스템 런칭", event_en: "Real-time results system launched" },
  { year: "2025", event_ko: "주요 마라톤/트랙 대회 다수 운영", event_en: "Multiple major marathon/track events operated" },
];

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero Banner */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050a12] to-[var(--pr-black)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[var(--pr-accent)]/[0.03] rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            className="font-display text-sm tracking-[0.3em] text-[var(--pr-accent)] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ABOUT US
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t("title")}
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-[var(--pr-gray-400)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="gradient-border rounded-2xl p-8 md:p-12 bg-white/[0.02]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Target className="text-[var(--pr-accent)]" size={24} />
              <h2 className="text-2xl md:text-3xl font-bold">
                {t("mission_title")}
              </h2>
            </div>
            <p className="text-[var(--pr-gray-400)] text-lg leading-relaxed">
              {t("mission_desc")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--pr-black)] to-[#050a12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-display text-sm tracking-[0.3em] text-[var(--pr-accent)] mb-3">
              TECHNOLOGY
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">{t("tech_title")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {techItems.map(({ key, icon: Icon }, i) => (
              <motion.div
                key={key}
                className="gradient-border p-8 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[var(--pr-accent)]/10 text-[var(--pr-accent)] mb-6">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {t(`tech_${key}` as any)}
                </h3>
                <p className="text-sm text-[var(--pr-gray-500)] leading-relaxed">
                  {t(`tech_${key}_desc` as any)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-display text-sm tracking-[0.3em] text-[var(--pr-accent)] mb-3">
              HISTORY
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("history_title")}
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10" />

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
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--pr-accent)] border-2 border-[var(--pr-black)] z-10" />

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-[45%] ${
                    i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                  }`}
                >
                  <span className="font-display text-[var(--pr-accent)] text-sm tracking-wider">
                    {item.year}
                  </span>
                  <p className="mt-1 text-[var(--pr-gray-300)]">
                    {item.event_ko}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diamond League Reference */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#050a12] to-[var(--pr-black)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="gradient-border rounded-2xl p-8 md:p-12 bg-white/[0.02]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Award className="mx-auto text-[var(--pr-accent)] mb-6" size={32} />
            <h3 className="text-2xl font-bold mb-4">
              다이아몬드 리그에서 검증된 기술
            </h3>
            <p className="text-[var(--pr-gray-400)] leading-relaxed">
              웨이브라이트 LED 페이싱 시스템은 World Athletics 다이아몬드 리그를 비롯한 
              세계 주요 국제 대회에서 공식 채택되어 사용되고 있습니다. 
              선수들의 세계 기록 도전을 빛으로 이끄는 이 기술을, 
              PACE RISE가 한국의 트랙 위에서 구현합니다.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
