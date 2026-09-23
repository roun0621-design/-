"use client";
// ──────────────────────────────────────────
// Press Section – 언론 보도 리스트
// 데이터: src/data/press.ts (기사 추가는 그 파일만 수정)
// 클릭 시 기사 원문으로 새 탭 이동
// ──────────────────────────────────────────
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Stagger, staggerItem } from "@/components/motion/Stagger";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { pressItems } from "@/data/press";

const INITIAL_COUNT = 6;

const sorted = [...pressItems].sort((a, b) => b.date.localeCompare(a.date));

export default function PressSection() {
  const t = useTranslations("news");
  const locale = useLocale();
  const [expanded, setExpanded] = useState(false);

  if (sorted.length === 0) return null;

  const items = expanded ? sorted : sorted.slice(0, INITIAL_COUNT);

  return (
    <section className="py-14 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Stagger className="text-center mb-10 md:mb-14">
          <motion.div
            className="inline-flex items-center gap-2 text-pr-brand mb-4"
            variants={staggerItem}
          >
            <Newspaper size={15} strokeWidth={1.5} />
            <span className="font-display text-[11px] tracking-[0.3em]">PRESS</span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight text-pr-primary"
            variants={staggerItem}
          >
            {t("press_title")}
          </motion.h2>
          <motion.p
            className="mt-4 text-pr-secondary font-display"
            variants={staggerItem}
          >
            {t("press_subtitle")}
          </motion.p>
        </Stagger>

        <Stagger as="ul" className="rounded-2xl border border-pr-border divide-y divide-pr-border overflow-hidden">
          {items.map((item, i) => (
            <motion.li
              key={item.url}
              variants={staggerItem}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 px-5 py-5 md:px-7 md:py-6 bg-white hover:bg-pr-brand-light transition-colors duration-300"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                    <span className="inline-block text-[11px] font-semibold tracking-wide text-pr-brand bg-pr-brand-light rounded-full px-2.5 py-0.5">
                      {(locale !== "ko" && item.outlet_en) || item.outlet}
                    </span>
                    <time
                      dateTime={item.date}
                      className="font-display text-[11px] tracking-[0.12em] text-pr-tertiary"
                    >
                      {item.date.replace(/-/g, ".")}
                    </time>
                  </div>
                  <p className="text-[15px] md:text-base font-medium text-pr-primary leading-snug font-sans group-hover:text-pr-brand transition-colors duration-300">
                    {(locale !== "ko" && item.title_en) || item.title}
                  </p>
                </div>
                <span className="mt-1 shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-pr-border text-pr-tertiary group-hover:border-pr-brand group-hover:text-pr-brand group-hover:bg-white transition-all duration-300">
                  <ArrowUpRight size={16} strokeWidth={1.75} />
                  <span className="sr-only">{t("press_read")}</span>
                </span>
              </a>
            </motion.li>
          ))}
        </Stagger>

        {sorted.length > INITIAL_COUNT && !expanded && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-display tracking-wider text-pr-brand border border-pr-brand/30 rounded-full hover:bg-pr-brand-light hover:border-pr-brand transition-all duration-300"
            >
              {t("press_more")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
