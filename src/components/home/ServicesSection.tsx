"use client";
// ──────────────────────────────────────────
// Services Section – What We Do
// ──────────────────────────────────────────
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Zap, Timer, QrCode } from "lucide-react";

const services = [
  {
    key: "wavelight",
    icon: Zap,
  },
  {
    key: "records",
    icon: Timer,
  },
  {
    key: "qrbib",
    icon: QrCode,
  },
] as const;

export default function ServicesSection() {
  const t = useTranslations("home");

  return (
    <section className="py-24 md:py-32 bg-[var(--pr-black)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            className="font-display text-sm tracking-[0.3em] text-[var(--pr-accent)] mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t("services_title")}
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t("services_subtitle")}
          </motion.h2>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              className="gradient-border group relative p-8 md:p-10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[var(--pr-accent)]/10 text-[var(--pr-accent)] mb-6 group-hover:glow-accent-box transition-all duration-500">
                <Icon size={24} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-3 tracking-tight">
                {t(`service_${key}` as any)}
              </h3>

              {/* Description */}
              <p className="text-sm text-[var(--pr-gray-500)] leading-relaxed">
                {t(`service_${key}_desc` as any)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
