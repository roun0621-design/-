"use client";
// ──────────────────────────────────────────
// About Page – Company & Technology (White Theme)
// History section: Key Milestones + Operational Footprint
// ──────────────────────────────────────────
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  Zap,
  Monitor,
  Award,
  Target,
  Users,
  TrendingUp,
  Trophy,
  Handshake,
  Cpu,
  CalendarCheck,
} from "lucide-react";
import { nl2br } from "@/utils/nl2br";

const techItems = [
  { key: "pacing", icon: Zap },
  { key: "cos", icon: Monitor },
] as const;

/* ── Key Milestones ── */
type Side = "left" | "right";

interface Milestone {
  date: string;
  side: Side;
  title_ko: string;
  org_ko?: string;
  title_en: string;
  org_en?: string;
}

const milestones: Milestone[] = [
  {
    date: "2025.05",
    side: "left",
    title_ko: "Wave Light 시스템 도입 및\n엘리트 팀 훈련 운영 지원",
    title_en: "Wave Light system deployment\n& elite team training support",
  },
  {
    date: "2025.08",
    side: "right",
    title_ko: "미즈노 라이트랩 2025 정선 하이원\nWave Light 운영",
    org_ko: "대한육상연맹 협력",
    title_en: "Mizuno Light Lab 2025 Jeongseon High1\nWave Light operation",
    org_en: "Korea Association of Athletics Federations",
  },
  {
    date: "2025.09",
    side: "left",
    title_ko: "3대 전국대회 기술 운영 총괄",
    org_ko: "실업단대항 · 대학대항 · 중고교학년별\n육상경기대회",
    title_en: "Technical operations for 3 major\nnational championships",
    org_en: "Corporate / University / Junior\nTrack & Field Championships",
  },
  {
    date: "2025.11",
    side: "left",
    title_ko: "고양 Street Rush 및\n262 WAVE 서브2 프로젝트 운영",
    title_en: "Goyang Street Rush &\n262 WAVE Sub-2 Project",
  },
  {
    date: "2026.01",
    side: "left",
    title_ko: "진도 라이트 챌린지 1~4회 운영\nNODE 베타 테스트",
    title_en: "Jindo Light Challenge Rounds 1–4\nNODE beta test",
  },
  {
    date: "2026.02",
    side: "right",
    title_ko: "한국실업육상연맹(KTFL)\n전략적 파트너십(MOU) 체결",
    title_en: "Korea Track & Field League (KTFL)\nStrategic Partnership (MOU)",
  },
  {
    date: "2026.03",
    side: "left",
    title_ko: "2026 김해 KTFL 전국실업육상경기대회\nNODE & Wave Light 통합 기술 운영",
    org_ko: "한국실업육상연맹",
    title_en: "2026 Gimhae KTFL National Championship\nNODE & Wave Light integrated operation",
    org_en: "Korea Track & Field League",
  },
];

/* ── Operational Footprint ── */
const footprint = [
  {
    icon: Trophy,
    value: "15+",
    key: "elite",
  },
  {
    icon: CalendarCheck,
    value: "30+",
    key: "masters",
  },
  {
    icon: Handshake,
    value: "4",
    key: "partners",
  },
  {
    icon: Cpu,
    value: "Only",
    key: "system",
  },
] as const;

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
            className="mt-6 text-lg text-pr-secondary font-sans text-balance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {nl2br(t("subtitle"))}
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
              {nl2br(t("mission_desc"))}
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
                  {nl2br(t(`target_${key}_desc` as any))}
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
                  {nl2br(t(`tech_${key}_desc` as any))}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          KEY MILESTONES TIMELINE
         ════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-4">KEY MILESTONES</p>
            <h2 className="text-3xl md:text-4xl font-bold text-pr-primary">{t("history_title")}</h2>
          </div>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-pr-border -translate-x-px" />

            {milestones.map((m, i) => {
              const isLeft = m.side === "left";
              const text = locale === "ko" ? m.title_ko : m.title_en;
              const org = locale === "ko" ? m.org_ko : m.org_en;

              return (
                <motion.div
                  key={i}
                  className={`relative flex items-start mb-12 last:mb-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  {/* Dot on center line */}
                  <div
                    className="absolute left-5 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-pr-brand z-10"
                    style={{ boxShadow: "0 0 0 3px white, 0 0 0 4px var(--pr-border)" }}
                  />

                  {/* Content card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[46%] ${
                      isLeft ? "md:text-right md:pr-10" : "md:text-left md:pl-10"
                    }`}
                  >
                    {/* Date badge */}
                    <span className="inline-block font-display text-[11px] tracking-[0.15em] text-pr-brand bg-pr-brand-light px-3 py-1 rounded-full mb-2.5">
                      {m.date}
                    </span>

                    {/* Main text */}
                    <p className="text-[15px] font-medium text-pr-primary leading-relaxed font-sans whitespace-pre-line">
                      {text}
                    </p>

                    {/* Organization sub-label */}
                    {org && (
                      <p className="mt-1.5 text-[12px] text-pr-tertiary leading-relaxed font-sans whitespace-pre-line">
                        {org}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          OPERATIONAL FOOTPRINT
         ════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[var(--pr-bg-secondary)]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-4">OPERATIONAL FOOTPRINT</p>
            <h2 className="text-2xl md:text-3xl font-bold text-pr-primary">
              {t("footprint_title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {footprint.map(({ icon: Icon, value, key }, i) => (
              <motion.div
                key={key}
                className="bg-white rounded-2xl border border-pr-border p-7 text-center hover:border-pr-brand/30 transition-all duration-300"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-xl bg-pr-brand-light text-pr-brand mb-4">
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <p className="font-display text-2xl md:text-3xl text-pr-brand mb-2">{value}</p>
                <p className="text-xs font-display tracking-wider text-pr-primary uppercase mb-2">
                  {t(`footprint_${key}_label` as any)}
                </p>
                <p className="text-[13px] text-pr-secondary leading-relaxed font-sans">
                  {nl2br(t(`footprint_${key}_desc` as any))}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
