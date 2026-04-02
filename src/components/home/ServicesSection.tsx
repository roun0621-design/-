"use client";
// ──────────────────────────────────────────
// Services Section – 2 cards: Pacing Light + COS
// ──────────────────────────────────────────
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Zap, Monitor, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

const services = [
  {
    key: "pacing_light",
    icon: Zap,
    href: "/services/pacing-light",
    features: ["feature_visual", "feature_diamond", "feature_all_level"],
  },
  {
    key: "cos",
    icon: Monitor,
    href: "/services/cos",
    features: ["feature_workflow", "feature_realtime", "feature_broadcast"],
  },
] as const;

export default function ServicesSection() {
  const t = useTranslations("home");

  return (
    <section className="py-28 md:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.p
            className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            CORE SERVICES
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight text-pr-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t("services_subtitle")}
          </motion.h2>
          <motion.p
            className="mt-4 text-pr-secondary max-w-xl mx-auto text-base font-sans"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t("services_desc")}
          </motion.p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {services.map(({ key, icon: Icon, href, features }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Link href={href} className="block group">
                <div className="card-elegant p-10 md:p-12 h-full">
                  {/* Icon + Label */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-pr-brand-light text-pr-brand">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <span className="font-display text-[11px] tracking-[0.2em] text-pr-brand uppercase">
                      {t(`service_${key}_label` as any)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-[28px] font-bold tracking-tight text-pr-primary mb-4 group-hover:text-pr-brand transition-colors duration-300">
                    {t(`service_${key}` as any)}
                  </h3>

                  {/* Description */}
                  <p className="text-pr-secondary text-[15px] leading-relaxed mb-8 font-sans">
                    {t(`service_${key}_desc` as any)}
                  </p>

                  {/* Feature bullets */}
                  <ul className="space-y-3 mb-10">
                    {features.map((fKey) => (
                      <li key={fKey} className="flex items-start gap-3">
                        <span className="mt-2 w-1 h-1 rounded-full bg-pr-brand shrink-0" />
                        <span className="text-sm text-pr-secondary font-sans">
                          {t(`service_${key}_${fKey}` as any)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-display tracking-wider text-pr-brand group-hover:gap-3 transition-all duration-300">
                    {t("learn_more")}
                    <ArrowRight size={14} strokeWidth={2} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
