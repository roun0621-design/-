"use client";
// ──────────────────────────────────────────
// Pacing Light Detail – Sales Page
// ──────────────────────────────────────────
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  Zap,
  Eye,
  Users,
  Trophy,
  Timer,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

const features = [
  { key: "visual_pace", icon: Eye },
  { key: "all_events", icon: Timer },
  { key: "spectator", icon: Users },
  { key: "performance", icon: TrendingUp },
] as const;

const useCases = [
  "diamond_league",
  "national",
  "youth",
  "masters",
  "training",
] as const;

export default function PacingLightDetail() {
  const t = useTranslations("pacing_light");

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[200px]" style={{ background: "rgba(183, 159, 88, 0.04)" }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pr-brand/20 bg-pr-brand-light mb-8">
              <Zap size={14} className="text-pr-brand" strokeWidth={2} />
              <span className="font-display text-[11px] tracking-[0.2em] text-pr-brand">WAVELIGHT SYSTEM</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-pr-primary leading-[1.15]">
              {t("hero_title")}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-pr-secondary max-w-2xl mx-auto leading-relaxed font-sans">
              {t("hero_desc")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                {t("cta_inquiry")}
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
              <a href="#features" className="btn-secondary">
                {t("cta_learn")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* What is Wavelight */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-4">WAVE LIGHT SYSTEM</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-pr-primary mb-6">
                {t("wavelight_title")}
              </h2>
              <p className="text-pr-secondary leading-relaxed font-sans mb-6">
                {t("wavelight_desc")}
              </p>
              <p className="text-pr-secondary leading-relaxed font-sans">
                {t("wavelight_desc2")}
              </p>
            </motion.div>
            <motion.div
              className="bg-[var(--pr-bg-secondary)] rounded-2xl p-10 border border-pr-border"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                {["principle_1", "principle_2", "principle_3"].map((key, i) => (
                  <div key={key} className="flex items-start gap-4">
                    <span className="font-display text-pr-brand text-sm mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-pr-primary mb-1">
                        {t(`${key}_title` as any)}
                      </h4>
                      <p className="text-sm text-pr-secondary font-sans">
                        {t(key as any)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Features */}
      <section id="features" className="py-24 md:py-32 bg-[var(--pr-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-4">KEY FEATURES</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-pr-primary">
              {t("features_title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ key, icon: Icon }, i) => (
              <motion.div
                key={key}
                className="bg-white rounded-2xl border border-pr-border p-8 hover:border-pr-brand/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-pr-brand-light text-pr-brand mb-5">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-pr-primary mb-2">
                  {t(`feature_${key}` as any)}
                </h3>
                <p className="text-sm text-pr-secondary leading-relaxed font-sans">
                  {t(`feature_${key}_desc` as any)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-4">USE CASES</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-pr-primary">
              {t("usecase_title")}
            </h2>
          </div>
          <div className="space-y-4">
            {useCases.map((key, i) => (
              <motion.div
                key={key}
                className="flex items-start gap-4 p-6 rounded-xl border border-pr-border hover:border-pr-brand/30 transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <CheckCircle size={18} className="text-pr-brand mt-0.5 shrink-0" strokeWidth={1.5} />
                <div>
                  <h4 className="font-semibold text-pr-primary text-sm mb-1">
                    {t(`usecase_${key}` as any)}
                  </h4>
                  <p className="text-sm text-pr-secondary font-sans">
                    {t(`usecase_${key}_desc` as any)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diamond League Reference */}
      <section className="py-24 md:py-32 bg-[var(--pr-bg-secondary)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Trophy size={28} className="mx-auto text-pr-brand mb-6" strokeWidth={1.5} />
            <h3 className="text-2xl md:text-3xl font-bold text-pr-primary mb-6">
              {t("diamond_title")}
            </h3>
            <p className="text-pr-secondary leading-relaxed font-sans max-w-2xl mx-auto">
              {t("diamond_desc")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-pr-primary mb-4">
            {t("cta_title")}
          </h2>
          <p className="text-pr-secondary mb-8 font-sans">
            {t("cta_desc")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              {t("cta_inquiry")}
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
            <Link href="/services/cos" className="btn-secondary">
              COS
              <ChevronRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
