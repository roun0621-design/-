"use client";
// ──────────────────────────────────────────
// Hero Section – Mission-first messaging
// Apple/Stripe minimal white style
// ──────────────────────────────────────────
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { nl2br } from "@/utils/nl2br";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white pt-[88px] md:pt-[96px] pb-20">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(var(--pr-border) 1px, transparent 1px), linear-gradient(90deg, var(--pr-border) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Subtle brand accent glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[150px]" style={{ background: "rgba(183, 159, 88, 0.06)" }} />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center w-full">
        {/* Brand Logo – Icon + PACE RISE wordmark */}
        <motion.div
          className="mb-8 flex items-center justify-center gap-3 md:gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/logo-character-gold.png"
            alt="PACE RISE"
            className="w-12 h-auto md:w-14 lg:w-[67px]"
            loading="eager"
          />
          <span className="font-display text-4xl md:text-5xl lg:text-[50px] tracking-[0.15em] text-pr-primary">
            PACE RISE
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="font-display text-xs md:text-sm tracking-[0.35em] text-pr-brand mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t("tagline")}
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.2] text-pr-primary"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <span className="block">{t("title_line1")}</span>
          <span className="block mt-2">{t("title_line2")}</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mt-8 text-base md:text-lg text-pr-secondary max-w-2xl mx-auto leading-relaxed font-sans text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {nl2br(t("description"))}
        </motion.p>

        {/* Sub-values */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          {["value_rms", "value_tracking", "value_records"].map((key) => (
            <span key={key} className="text-sm text-pr-tertiary font-sans">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-pr-brand mr-2 align-middle" />
              {t(key as any)}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          <Link href="/services/pacing-light" className="btn-primary">
            {t("cta_services")}
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
          <Link href="/contact" className="btn-secondary">
            {t("cta_contact")}
          </Link>
        </motion.div>

        {/* Target audiences */}
        <motion.div
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {["audience_youth", "audience_elite", "audience_masters"].map((key) => (
            <div key={key} className="text-center px-4 py-5 rounded-2xl border border-pr-border-light hover:border-pr-brand/30 transition-colors duration-300">
              <p className="text-xs text-pr-brand font-display tracking-wider mb-1">
                {t(`${key}_label` as any)}
              </p>
              <p className="text-sm text-pr-secondary font-sans">
                {nl2br(t(key as any))}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <ArrowDown size={20} strokeWidth={1} className="text-pr-tertiary" />
      </motion.div>
    </section>
  );
}
