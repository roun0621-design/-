"use client";
// ──────────────────────────────────────────
// Brand & Events Detail – the collaboration door
// Elite-proven tech, brought to a brand's running event.
// Evidence: public brand events (ASICS · MIZUNO · DESCENTE).
// ──────────────────────────────────────────
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Sparkles, Activity, Image as ImageIcon, BarChart3, Settings, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { nl2br } from "@/utils/nl2br";

const offers = [
  { key: "experience", icon: Activity },
  { key: "content", icon: ImageIcon },
  { key: "data", icon: BarChart3 },
  { key: "operation", icon: Settings },
] as const;

const cases = ["asics", "mizuno", "descente"] as const;

export default function BrandEventsDetail() {
  const t = useTranslations("brand_events");

  return (
    <div className="pt-16 md:pt-24">
      {/* Hero */}
      <section className="py-16 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pr-brand/20 bg-pr-brand-light mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles size={14} className="text-pr-brand" strokeWidth={2} />
            <span className="font-display text-[11px] tracking-[0.2em] text-pr-brand">
              {t("hero_label")}
            </span>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-pr-primary leading-[1.15]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {t("hero_title")}
          </motion.h1>
          <motion.p
            className="mt-6 text-base md:text-lg text-pr-secondary max-w-2xl mx-auto leading-relaxed font-sans text-balance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {nl2br(t("hero_desc"))}
          </motion.p>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <Link
              href={{ pathname: "/contact", query: { type: "event" } }}
              className="btn-primary"
            >
              {t("hero_cta")}
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What we build together */}
      <section className="py-16 md:py-28 bg-[var(--pr-bg-secondary)]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-4">
              {t("offer_label")}
            </p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-pr-primary">
              {t("offer_title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {offers.map(({ key, icon: Icon }, i) => (
              <motion.div
                key={key}
                className="bg-white rounded-2xl border border-pr-border p-6 md:p-7"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-pr-brand-light text-pr-brand mb-5">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-pr-primary mb-2">
                  {t(`offer_${key}_title` as any)}
                </h3>
                <p className="text-[14px] text-pr-secondary leading-relaxed font-sans">
                  {t(`offer_${key}_desc` as any)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Track record — brand events */}
      <section className="py-16 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-4">
              {t("cases_label")}
            </p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-pr-primary">
              {t("cases_title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {cases.map((key, i) => (
              <motion.div
                key={key}
                className="card-elegant p-6 md:p-8 h-full"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="inline-block font-display text-[10px] tracking-[0.18em] text-pr-brand bg-pr-brand-light rounded-full px-3 py-1 mb-5">
                  {t(`case_${key}_role` as any)}
                </span>
                <h3 className="text-xl font-bold tracking-tight text-pr-primary mb-3">
                  {t(`case_${key}_title` as any)}
                </h3>
                <p className="text-[14px] text-pr-secondary leading-relaxed font-sans">
                  {t(`case_${key}_desc` as any)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Invitation */}
      <section className="py-16 md:py-28 bg-[var(--pr-bg-secondary)]">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-pr-primary">
            {t("cta_title")}
          </h2>
          <p className="mt-4 text-pr-secondary font-sans leading-relaxed">
            {t("cta_desc")}
          </p>
          <div className="mt-8">
            <Link
              href={{ pathname: "/contact", query: { type: "event" } }}
              className="btn-primary"
            >
              {t("cta_button")}
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
