"use client";
// ──────────────────────────────────────────
// Hero Section – Wavelight-inspired animation
// ──────────────────────────────────────────
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background – animated gradient mesh */}
      <div className="absolute inset-0">
        {/* Dark base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--pr-black)] via-[#050a12] to-[var(--pr-black)]" />

        {/* Wavelight track lines (decorative) */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-[var(--pr-accent)] to-transparent"
              style={{
                top: `${30 + i * 10}%`,
                left: 0,
                right: 0,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.6,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          ))}
        </div>

        {/* Radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[var(--pr-accent)]/[0.04] rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Tagline */}
        <motion.p
          className="font-display text-sm md:text-base tracking-[0.35em] text-[var(--pr-accent)] mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t("tagline")}
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="block">{t("title_line1")}</span>
          <span className="block mt-2 bg-gradient-to-r from-[var(--pr-accent)] via-white to-[var(--pr-accent)] bg-clip-text text-transparent">
            {t("title_line2")}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mt-6 md:mt-8 text-base md:text-lg text-[var(--pr-gray-400)] max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t("description")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Primary CTA – Records System */}
          <a
            href="https://records.pace-rise.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button group flex items-center gap-2 px-8 py-4 bg-[var(--pr-accent)] text-[var(--pr-black)] font-semibold text-base rounded-xl hover:glow-accent-box transition-all duration-300"
          >
            {t("cta_records")}
            <ExternalLink
              size={18}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </a>

          {/* Secondary CTA – About */}
          <Link
            href="/about"
            className="group flex items-center gap-2 px-8 py-4 text-base font-medium text-white border border-white/20 rounded-xl hover:border-[var(--pr-accent)]/50 hover:bg-white/5 transition-all duration-300"
          >
            {t("cta_about")}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-[var(--pr-accent)] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
