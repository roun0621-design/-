"use client";
// ──────────────────────────────────────────
// Trust Section – Social proof right below the hero
// Operational footprint numbers + key partner line
// ──────────────────────────────────────────
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Stagger, staggerItem, reveal } from "@/components/motion/Stagger";
import { Users, CalendarCheck, Snowflake, Cpu, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { nl2br } from "@/utils/nl2br";
import CountUp from "@/components/motion/CountUp";

const stats = [
  { icon: Users, key: "athletes" },
  { icon: CalendarCheck, key: "events" },
  { icon: Snowflake, key: "camp" },
  { icon: Cpu, key: "node" },
] as const;

export default function TrustSection() {
  const t = useTranslations("home");

  return (
    <section className="py-16 md:py-28 bg-[var(--pr-bg-secondary)]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <Stagger className="text-center mb-10 md:mb-14">
          <motion.p
            className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-4"
            variants={staggerItem}
          >
            {t("trust_label")}
          </motion.p>
          <motion.h2
            className="text-2xl md:text-4xl font-bold tracking-tight text-pr-primary"
            variants={staggerItem}
          >
            {t("trust_title")}
          </motion.h2>
          <motion.p
            className="mt-4 text-pr-secondary font-sans leading-relaxed"
            variants={staggerItem}
          >
            {nl2br(t("trust_desc"))}
          </motion.p>
        </Stagger>

        {/* Brand line — strongest proof: who works with us */}
        <motion.div
          className="mb-8 md:mb-10 text-center"
          {...reveal}
        >
          <p className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-5 py-3 rounded-full bg-white border border-pr-border font-display text-sm md:text-base tracking-wide text-pr-primary" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
            {t("trust_brands_line")}
          </p>
        </motion.div>

        {/* Stats */}
        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {stats.map(({ icon: Icon, key }, i) => (
            <motion.div
              key={key}
              className="bg-white rounded-2xl border border-pr-border p-6 md:p-7 text-center hover:border-pr-brand/30 transition-[border-color,box-shadow,background-color,color] duration-300"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}
              variants={staggerItem}
            >
              <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-xl bg-pr-brand-light text-pr-brand mb-4">
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <p className="font-display text-2xl md:text-3xl text-pr-brand mb-2">
                <CountUp value={t(`trust_stat_${key}_value` as any)} />
              </p>
              <p className="text-[13px] text-pr-secondary leading-relaxed font-sans">
                {t(`trust_stat_${key}_label` as any)}
              </p>
            </motion.div>
          ))}
        </Stagger>

        {/* Federation deployment line — "adopted", not "official partner" */}
        <motion.p
          className="mt-10 text-center text-[13px] md:text-sm text-pr-tertiary font-sans tracking-wide"
          {...reveal}
        >
          {t("trust_federation_line")}
        </motion.p>

        {/* Link to full track record */}
        <motion.div
          className="mt-8 text-center"
          {...reveal}
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-display tracking-wider text-pr-brand hover:gap-3 transition-all duration-300"
          >
            {t("trust_cta")}
            <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
