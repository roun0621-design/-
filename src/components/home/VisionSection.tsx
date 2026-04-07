"use client";
// ──────────────────────────────────────────
// Vision Section – Goals & Mission
// ──────────────────────────────────────────
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { TrendingUp, Users, Target, Lightbulb } from "lucide-react";
import { nl2br } from "@/utils/nl2br";

const goals = [
  { key: "expand", icon: TrendingUp },
  { key: "growth", icon: Users },
  { key: "overcome", icon: Target },
  { key: "democratize", icon: Lightbulb },
] as const;

export default function VisionSection() {
  const t = useTranslations("home");

  return (
    <section className="py-28 md:py-36 bg-[var(--pr-bg-secondary)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            OUR VISION
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight text-pr-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t("vision_title")}
          </motion.h2>
          <motion.p
            className="mt-4 text-pr-secondary max-w-2xl mx-auto text-base font-sans text-balance"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {nl2br(t("vision_desc"))}
          </motion.p>
        </div>

        {/* 4-goal grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {goals.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              className="bg-white rounded-2xl border border-pr-border p-8 text-center hover:border-pr-brand/40 transition-all duration-300"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl bg-pr-brand-light text-pr-brand mb-5">
                <Icon size={22} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-sm tracking-wider text-pr-primary mb-3">
                {t(`goal_${key}` as any)}
              </h3>
              <p className="text-sm text-pr-secondary leading-relaxed font-sans">
                {nl2br(t(`goal_${key}_desc` as any))}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
