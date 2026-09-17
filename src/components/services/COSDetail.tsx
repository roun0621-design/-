"use client";
// ──────────────────────────────────────────
// COS (Competition Operating System) Detail
// PACE RISE : Node
// ──────────────────────────────────────────
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { nl2br } from "@/utils/nl2br";
import PipelineAnimation from "@/components/animations/PipelineAnimation";
import ServicePhotos from "@/components/services/ServicePhotos";
import type { ServicePhoto } from "@/lib/servicePhotos";
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
  ExternalLink,
  Play,
  Settings,
  MessageSquare,
  Wrench,
} from "lucide-react";

/* ── App store links ── */
const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.pacerise.node";
// Country-code-free App Store URL redirects to the visitor's local storefront.
const APP_STORE_URL = "https://apps.apple.com/app/pace-rise-node/id6784736644";

/* ── Store brand marks (monochrome, inherit currentColor) ── */
const AppleLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
);
const GooglePlayLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
  </svg>
);

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

export default function COSDetail({ photos = [] }: { photos?: ServicePhoto[] }) {
  const t = useTranslations("cos");
  const nav = useTranslations("nav");
  const locale = useLocale();

  // Korean visitors get the localized KR storefront; others hit the geo-neutral link.
  const appStoreUrl =
    locale === "ko"
      ? "https://apps.apple.com/kr/app/pace-rise-node/id6784736644"
      : APP_STORE_URL;

  return (
    <div className="pt-16 md:pt-24">
      {/* Hero */}
      <section className="py-12 md:py-24 bg-white relative overflow-hidden">
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
            <p className="mt-6 text-lg md:text-xl text-pr-secondary max-w-2xl mx-auto leading-relaxed font-sans text-balance">
              {nl2br(t("hero_desc"))}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link href="/contact" className="btn-primary w-full sm:w-auto">
                {t("cta_inquiry")}
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
              <a href="#operator" className="btn-secondary w-full sm:w-auto">
                {t("cta_features")}
              </a>
            </div>
            <a
              href="https://pace-rise-node.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-display tracking-wider text-pr-brand hover:gap-2.5 transition-all duration-300"
            >
              {t("cta_live")}
              <ExternalLink size={14} strokeWidth={2} />
            </a>
          </motion.div>

          {/* Field photos – right under the hero copy (public/images/services/node) */}
          <ServicePhotos
            photos={photos}
            alt={t("photos_alt")}
            label="IN OPERATION"
            className="mt-14 md:mt-20"
          />
        </div>
      </section>

      <div className="section-divider" />

      {/* Workflow Pipeline Animation */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-3">WORKFLOW</p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <PipelineAnimation />
          </motion.div>

          {/* Launch film (self-contained SVG animation, auto-loop) */}
          <motion.div
            className="mt-10 md:mt-14 rounded-2xl overflow-hidden border border-pr-border bg-[#F7F6F2]"
            style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              className="w-full aspect-video block border-0"
              src="/node-film.html"
              title="PACE RISE : Node — Launch Film"
              loading="lazy"
            />
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
      <section id="operator" className="py-16 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <p className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-4">FOR OPERATORS</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-pr-primary">
              {t("operator_title")}
            </h2>
            <p className="mt-4 text-pr-secondary max-w-xl mx-auto font-sans">
              {nl2br(t("operator_desc"))}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {operatorFeatures.map(({ key, icon: Icon }, i) => (
              <motion.div
                key={key}
                className="bg-white rounded-2xl border border-pr-border p-6 md:p-8 hover:border-pr-brand/40 transition-all duration-300"
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
                  {nl2br(t(`op_${key}_desc` as any))}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Consumer Features */}
      <section className="py-16 md:py-32 bg-[var(--pr-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
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
              {nl2br(t("consumer_desc"))}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {consumerFeatures.map(({ key, icon: Icon }, i) => (
              <motion.div
                key={key}
                className="bg-white rounded-2xl border border-pr-border p-6 md:p-8 hover:border-pr-brand/40 transition-all duration-300 relative"
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
                      {nl2br(t(`con_${key}_desc` as any))}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-16 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
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
                      {nl2br(t(`arch_${key}_desc` as any))}
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
              {nl2br(t("wa_rules_desc"))}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Custom Solutions */}
      <section className="py-16 md:py-32 bg-[var(--pr-bg-secondary)]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-4">CUSTOM SOLUTIONS</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-pr-primary">
              {t("custom_title")}
            </h2>
            <p className="mt-4 text-pr-secondary max-w-2xl mx-auto font-sans leading-relaxed">
              {t("custom_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Settings, key: "custom_event" },
              { icon: Wrench, key: "custom_special" },
              { icon: MessageSquare, key: "custom_meeting" },
            ].map(({ icon: Icon, key }, i) => (
              <motion.div
                key={key}
                className="bg-white rounded-2xl border border-pr-border p-7 hover:border-pr-brand/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-pr-brand-light text-pr-brand mb-4">
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <p className="text-sm text-pr-secondary leading-relaxed font-sans">
                  {t(key as any)}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-base text-pr-primary font-medium italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            &ldquo;{t("custom_quote")}&rdquo;
          </motion.p>
        </div>
      </section>

      {/* Demo Process */}
      <section className="py-16 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-9 md:mb-14">
            <p className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-4">DEMO</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-pr-primary">
              {t("demo_process_title")}
            </h2>
            <p className="mt-4 text-pr-secondary max-w-xl mx-auto font-sans leading-relaxed">
              {t("cta_demo_desc")}
            </p>
          </div>

          {/* 4-step process */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { step: "01", key: "demo_step_1" },
              { step: "02", key: "demo_step_2" },
              { step: "03", key: "demo_step_3" },
              { step: "04", key: "demo_step_4" },
            ].map(({ step, key }, i) => (
              <motion.div
                key={key}
                className="relative bg-[var(--pr-bg-secondary)] rounded-2xl border border-pr-border p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="font-display text-2xl text-pr-brand/30 mb-3">{step}</p>
                <h4 className="text-sm font-semibold text-pr-primary mb-2">
                  {t(key as any)}
                </h4>
                <p className="text-xs text-pr-secondary font-sans leading-relaxed">
                  {t(`${key}_desc` as any)}
                </p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 text-pr-brand/30">
                    <ChevronRight size={20} strokeWidth={2} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/contact?type=demo"
              className="inline-flex items-center gap-2 px-8 py-4 bg-pr-brand text-white text-sm font-display tracking-wider rounded-full hover:bg-pr-brand/90 transition-all duration-300 shadow-sm"
            >
              <Play size={14} strokeWidth={2} />
              {t("cta_demo")}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-14 md:py-24 bg-[var(--pr-bg-secondary)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-pr-primary mb-4">
            {t("cta_title")}
          </h2>
          <p className="text-pr-secondary mb-8 font-sans">
            {nl2br(t("cta_desc"))}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href="https://pace-rise-node.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-pr-brand text-white text-sm font-display tracking-wider rounded-full hover:bg-pr-brand/90 transition-all duration-300 shadow-sm"
            >
              {t("cta_live")}
              <ExternalLink size={14} strokeWidth={2} />
            </a>
            <Link
              href="/contact?type=demo"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-pr-brand text-pr-brand text-sm font-display tracking-wider rounded-full hover:bg-pr-brand hover:text-white transition-all duration-300"
            >
              <Play size={14} strokeWidth={2} />
              {t("cta_demo")}
            </Link>
          </div>

          {/* App download */}
          <div className="mb-10">
            <p className="text-[11px] font-display tracking-[0.2em] uppercase text-pr-tertiary mb-1.5">
              {t("app_title")}
            </p>
            <p className="text-sm text-pr-secondary font-sans mb-4">
              {t("app_desc")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="App Store"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-pr-primary text-white hover:bg-black transition-colors duration-300 shadow-sm"
              >
                <AppleLogo className="w-5 h-5" />
                <span className="text-sm font-display tracking-wide">App Store</span>
              </a>
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Play"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-pr-primary text-white hover:bg-black transition-colors duration-300 shadow-sm"
              >
                <GooglePlayLogo className="w-[18px] h-[18px]" />
                <span className="text-sm font-display tracking-wide">Google Play</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              {t("cta_inquiry")}
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
            <Link href="/services/pacing-light" className="btn-secondary">
              {nav("pacing_light")}
              <ChevronRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
