"use client";
// ──────────────────────────────────────────
// COS (Competition Operating System) Detail
// PACE RISE : Node
// ──────────────────────────────────────────
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  Monitor,
  ArrowRight,
  ChevronRight,
  ClipboardList,
  Timer,
  Users,
  FileText,
  Radio,
  Layout,
  Shield,
  Database,
  Wifi,
  Smartphone,
  BarChart3,
  Layers,
} from "lucide-react";

/* ── Operator features ── */
const operatorFeatures = [
  { key: "workflow", icon: ClipboardList },
  { key: "record_entry", icon: Timer },
  { key: "callroom", icon: Users },
  { key: "documents", icon: FileText },
  { key: "scoreboard", icon: Layout },
  { key: "broadcast", icon: Radio },
] as const;

/* ── Consumer features ── */
const consumerFeatures = [
  { key: "realtime_sse", icon: Wifi },
  { key: "open_page", icon: Smartphone },
  { key: "overlay", icon: Layout },
  { key: "result_image", icon: BarChart3 },
] as const;

/* ── Architecture stats ── */
const archStats = [
  { key: "rest_api", value: "182" },
  { key: "events", value: "47" },
  { key: "auth_tiers", value: "3" },
] as const;

export default function COSDetail() {
  const t = useTranslations("cos");

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[600px] h-[500px] rounded-full blur-[200px]" style={{ background: "rgba(183, 159, 88, 0.04)" }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pr-brand/20 bg-pr-brand-light mb-8">
              <Monitor size={14} className="text-pr-brand" strokeWidth={2} />
              <span className="font-display text-[11px] tracking-[0.2em] text-pr-brand">COMPETITION OPERATING SYSTEM</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-pr-primary leading-[1.15]">
              <span className="font-display">PACE RISE : Node</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-pr-secondary max-w-2xl mx-auto leading-relaxed font-sans">
              {t("hero_desc")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                {t("cta_inquiry")}
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
              <a href="#operator" className="btn-secondary">
                {t("cta_features")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Architecture Stats */}
      <section className="py-16 bg-[var(--pr-bg-secondary)]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {archStats.map(({ key, value }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="font-display text-3xl md:text-4xl text-pr-brand">{value}</p>
                <p className="text-sm text-pr-secondary mt-2 font-sans">{t(`stat_${key}` as any)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Operator Features (Admin Side) */}
      <section id="operator" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-4">FOR OPERATORS</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-pr-primary">
              {t("operator_title")}
            </h2>
            <p className="mt-4 text-pr-secondary max-w-xl mx-auto font-sans">
              {t("operator_desc")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {operatorFeatures.map(({ key, icon: Icon }, i) => (
              <motion.div
                key={key}
                className="bg-white rounded-2xl border border-pr-border p-8 hover:border-pr-brand/40 transition-all duration-300"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-pr-brand-light text-pr-brand mb-5">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-pr-primary mb-2">
                  {t(`op_${key}` as any)}
                </h3>
                <p className="text-sm text-pr-secondary leading-relaxed font-sans">
                  {t(`op_${key}_desc` as any)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Consumer Features */}
      <section className="py-24 md:py-32 bg-[var(--pr-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <p className="font-display text-[11px] tracking-[0.3em] text-pr-brand">FOR VIEWERS</p>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span className="font-display text-[10px] tracking-wider text-red-600">LIVE</span>
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-pr-primary">
              {t("consumer_title")}
            </h2>
            <p className="mt-4 text-pr-secondary max-w-xl mx-auto font-sans">
              {t("consumer_desc")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {consumerFeatures.map(({ key, icon: Icon }, i) => (
              <motion.div
                key={key}
                className="bg-white rounded-2xl border border-pr-border p-8 hover:border-pr-brand/40 transition-all duration-300 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {key === "realtime_sse" && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                      </span>
                      <span className="font-display text-[9px] tracking-wider text-emerald-700">NO REFRESH</span>
                    </span>
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-pr-brand-light text-pr-brand shrink-0">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-pr-primary mb-2">
                      {t(`con_${key}` as any)}
                    </h3>
                    <p className="text-sm text-pr-secondary leading-relaxed font-sans">
                      {t(`con_${key}_desc` as any)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-4">ARCHITECTURE</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-pr-primary">
              {t("arch_title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { key: "backend", icon: Database },
              { key: "frontend", icon: Layers },
              { key: "realtime", icon: Wifi },
              { key: "security", icon: Shield },
            ].map(({ key, icon: Icon }, i) => (
              <motion.div
                key={key}
                className="p-6 rounded-xl border border-pr-border hover:border-pr-brand/30 transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-start gap-4">
                  <Icon size={18} className="text-pr-brand mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <h4 className="text-sm font-semibold text-pr-primary mb-1">
                      {t(`arch_${key}` as any)}
                    </h4>
                    <p className="text-sm text-pr-secondary font-sans leading-relaxed">
                      {t(`arch_${key}_desc` as any)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* WA Rule Engine callout */}
          <motion.div
            className="mt-12 p-8 rounded-2xl bg-[var(--pr-bg-secondary)] border border-pr-border text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-3">BUILT-IN WA RULE ENGINE</p>
            <p className="text-pr-secondary font-sans leading-relaxed max-w-2xl mx-auto">
              {t("wa_rules_desc")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 md:py-24 bg-[var(--pr-bg-secondary)]">
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
            <Link href="/services/pacing-light" className="btn-secondary">
              WAVELIGHT SYSTEM
              <ChevronRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
