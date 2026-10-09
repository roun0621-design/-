"use client";
// ──────────────────────────────────────────
// Brand Teaser – 홈의 다크 구간 "THE MARK"
// Track Black 배경 위에 브랜드 필름(15초 루프)과 로고 한 문장. /brand 로 연결.
// 사이트에서 유일하게 어두운 구간 중 하나 — 흑·백·타탄 대비를 보여주는 자리.
// ──────────────────────────────────────────
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Stagger, staggerItem } from "@/components/motion/Stagger";
import Symbol from "@/components/brand/Symbol";

export default function BrandTeaser() {
  const t = useTranslations("home");

  return (
    <section className="bg-pr-ink text-pr-paper py-16 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Copy */}
          <Stagger className="lg:col-span-5 order-2 lg:order-1">
            <motion.div variants={staggerItem} className="flex items-center gap-3 mb-6">
              <Symbol className="h-6 w-auto" />
              <span className="font-display text-[11px] tracking-[0.3em] text-pr-tartan-light">
                {t("brand_label")}
              </span>
            </motion.div>
            <motion.h2
              variants={staggerItem}
              className="text-3xl md:text-[40px] font-bold tracking-tight leading-[1.25] text-pr-paper"
            >
              {t("brand_title")}
            </motion.h2>
            <motion.p
              variants={staggerItem}
              className="mt-6 text-[15px] md:text-base leading-relaxed text-pr-paper/70 font-sans max-w-md"
            >
              {t("brand_desc")}
            </motion.p>
            <motion.div variants={staggerItem} className="mt-9">
              <Link
                href="/brand"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-pr-paper/25 text-pr-paper text-sm font-display tracking-wider hover:bg-pr-paper hover:text-pr-ink transition-colors duration-300"
              >
                {t("brand_cta")}
                <ArrowRight size={15} strokeWidth={2} />
              </Link>
            </motion.div>
          </Stagger>

          {/* Film */}
          <motion.figure
            className="lg:col-span-7 order-1 lg:order-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl md:rounded-3xl overflow-hidden border border-pr-paper/10 bg-pr-ink">
              <iframe
                className="w-full aspect-video block border-0"
                src="/brand-film.html"
                title="PACE RISE — Brand Film"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3 font-display text-[10px] tracking-[0.2em] text-pr-tertiary text-right">
              {t("brand_film_caption")}
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
