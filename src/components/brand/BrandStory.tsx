"use client";
// ──────────────────────────────────────────
// Brand Story – /brand
// 원고: pace-rise-logo/logo-story.html (문구는 i18n brand.*)
// 구성: 필름(다크) → 심볼 브레이크(스크롤 연동) → 워드마크 → 색(트랙 사진) →
//       사용 규칙 → 약속 + BEYOND LIMITS(다크) → 파일 다운로드 → 문의
// 색 규칙: 흑·백·타탄만. 타탄은 심볼·라벨·스와치에만.
// ──────────────────────────────────────────
import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useScroll, useSpring, useReducedMotion, useMotionValue } from "framer-motion";
import { ArrowRight, Download, FileArchive } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Wordmark from "./Wordmark";
import Symbol from "./Symbol";
import BreakSymbol from "./BreakSymbol";
import { TRACK_BLACK, LINE_WHITE, TARTAN } from "./colors";
import { Stagger, staggerItem, reveal } from "@/components/motion/Stagger";
import RevealText from "@/components/motion/RevealText";

const swatches = [
  { name: "Track Black", hex: TRACK_BLACK, key: "black", text: "#F4F3EF" },
  { name: "Line White", hex: LINE_WHITE, key: "white", text: "#0E0E10" },
  { name: "Tartan", hex: TARTAN, key: "tartan", text: "#F4F3EF" },
] as const;

const downloads = [
  {
    key: "symbol",
    files: [
      ["SVG · Tartan", "/brand/dl/symbol_tartan.svg"],
      ["SVG · Black", "/brand/dl/symbol_black.svg"],
      ["SVG · White", "/brand/dl/symbol_white.svg"],
      ["PNG 1024", "/brand/dl/symbol_tartan_1024.png"],
    ],
  },
  {
    key: "wordmark",
    files: [
      ["SVG · Light bg", "/brand/dl/wordmark_black.svg"],
      ["SVG · Dark bg", "/brand/dl/wordmark_white.svg"],
      ["PNG 3000 · Light bg", "/brand/dl/wordmark_black_3000.png"],
      ["PNG 3000 · Dark bg", "/brand/dl/wordmark_white_3000.png"],
    ],
  },
  {
    key: "lockup",
    files: [
      ["SVG · Light bg", "/brand/dl/lockup_black.svg"],
      ["SVG · Dark bg", "/brand/dl/lockup_white.svg"],
      ["PNG 2000", "/brand/dl/lockup_black_2000.png"],
    ],
  },
  {
    key: "all",
    files: [
      ["ZIP", "/brand/pace-rise-brand-assets.zip"],
      ["colors.txt", "/brand/dl/colors.txt"],
    ],
  },
] as const;

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <Symbol className="h-4 w-auto" />
      <span className={`font-display text-[11px] tracking-[0.3em] ${dark ? "text-pr-tartan-light" : "text-pr-brand"}`}>
        {children}
      </span>
    </div>
  );
}

export default function BrandStory() {
  const t = useTranslations("brand");
  const reduce = useReducedMotion();

  // 심볼 섹션을 지나는 동안 선이 깨진다
  const symbolRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: symbolRef, offset: ["start 0.8", "end 0.9"] });
  const sprung = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.6 });
  const done = useMotionValue(1);
  const breakProgress = reduce ? done : sprung;

  return (
    <div>
      {/* ── 1. Hero + Film (Track Black) ── */}
      <section className="bg-pr-ink text-pr-paper pt-28 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow dark>{t("hero_label")}</Eyebrow>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-pr-paper">
              {t("hero_title")}
            </h1>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-pr-paper/70 font-sans max-w-2xl">
              {t("hero_sub")}
            </p>
          </motion.div>

          <motion.figure
            className="mt-12 md:mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl md:rounded-3xl overflow-hidden border border-pr-paper/10 bg-pr-ink">
              <iframe
                className="w-full aspect-video block border-0"
                src="/brand-film.html"
                title="PACE RISE — Brand Film"
                loading="eager"
              />
            </div>
            <figcaption className="mt-3 font-display text-[10px] tracking-[0.2em] text-pr-tertiary text-right">
              {t("film_caption")}
            </figcaption>
          </motion.figure>
        </div>
      </section>

      {/* ── 2. Symbol – Break (scroll-driven) ── */}
      <section className="bg-pr-paper py-20 md:py-32">
        <div ref={symbolRef} className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Sticky symbol – sticky는 그리드 아이템 자체에 걸어야 행 높이만큼 따라옴 */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
              <div>
                <div className="relative bg-white border border-pr-border rounded-3xl aspect-[4/5] flex items-center justify-center overflow-hidden">
                  <BreakSymbol progress={breakProgress} color={TRACK_BLACK} className="h-[62%] w-auto" />
                  {!reduce && (
                    <div className="absolute bottom-5 left-6 flex items-center gap-2 text-pr-tertiary">
                      <span className="inline-block w-4 h-px bg-pr-tartan/70" />
                      <span className="text-[10px] font-display tracking-[0.2em] uppercase">{t("symbol_hint")}</span>
                    </div>
                  )}
                  <span className="absolute top-5 right-6 font-display text-[10px] tracking-[0.2em] text-pr-tertiary">
                    55°
                  </span>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="lg:col-span-7">
              <Stagger>
                <motion.div variants={staggerItem}>
                  <Eyebrow>{t("symbol_label")}</Eyebrow>
                </motion.div>
                <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-bold tracking-tight text-pr-ink">
                  {t("symbol_title")}
                </motion.h2>
                <motion.p variants={staggerItem} className="mt-6 text-lg text-pr-secondary leading-relaxed font-sans">
                  {t("symbol_lead")}
                </motion.p>
              </Stagger>

              <div className="mt-12 space-y-10">
                {(["1", "2", "3"] as const).map((n) => (
                  <motion.div key={n} {...reveal} className="border-t-2 border-pr-ink pt-5">
                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="font-display text-sm text-pr-tertiary">0{n}</span>
                      <h3 className="text-xl font-bold tracking-tight text-pr-ink">{t(`symbol_k${n}`)}</h3>
                    </div>
                    <p className="text-[15px] md:text-base text-pr-secondary leading-relaxed font-sans">
                      {t(`symbol_v${n}`)}
                    </p>
                  </motion.div>
                ))}
              </div>

              <RevealText
                text={t("symbol_note")}
                className="mt-14 text-base md:text-lg text-pr-ink leading-relaxed font-sans"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Wordmark – the I in RISE ── */}
      <section className="bg-pr-paper-2 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Stagger className="max-w-3xl">
            <motion.div variants={staggerItem}>
              <Eyebrow>{t("wordmark_label")}</Eyebrow>
            </motion.div>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-bold tracking-tight text-pr-ink">
              {t("wordmark_title")}
            </motion.h2>
            <motion.p variants={staggerItem} className="mt-6 text-base md:text-lg text-pr-secondary leading-relaxed font-sans">
              {t("wordmark_desc")}
            </motion.p>
          </Stagger>

          {/* Big wordmark */}
          <motion.div {...reveal} className="mt-14 md:mt-20 bg-white border border-pr-border rounded-3xl px-8 py-14 md:px-16 md:py-20 flex items-center justify-center">
            <Wordmark className="w-full max-w-3xl text-pr-ink" />
          </motion.div>

          {/* Before / after */}
          <Stagger className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.figure variants={staggerItem} className="bg-white border border-pr-border rounded-3xl p-8 md:p-10">
              <Wordmark variant="plain" className="w-full text-pr-ink" />
              <figcaption className="mt-6 font-display text-[10px] tracking-[0.2em] text-pr-tertiary">
                {t("wordmark_before")}
              </figcaption>
            </motion.figure>
            <motion.figure variants={staggerItem} className="bg-pr-ink border border-pr-ink rounded-3xl p-8 md:p-10">
              <Wordmark className="w-full text-pr-paper" />
              <figcaption className="mt-6 font-display text-[10px] tracking-[0.2em] text-pr-tertiary">
                {t("wordmark_after")}
              </figcaption>
            </motion.figure>
          </Stagger>

          <motion.p {...reveal} className="mt-10 max-w-3xl text-base text-pr-secondary leading-relaxed font-sans">
            {t("wordmark_note")}
          </motion.p>
        </div>
      </section>

      {/* ── 4. Color – from the track (photo) ── */}
      <section className="relative bg-pr-ink text-pr-paper py-20 md:py-32 overflow-hidden">
        <Image
          src="/images/services/pacing-light/01-lightlap-night.webp"
          alt=""
          fill
          unoptimized
          className="object-cover opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pr-ink/80 via-pr-ink/40 to-pr-ink/90" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <Stagger className="max-w-3xl">
            <motion.div variants={staggerItem}>
              <Eyebrow dark>{t("color_label")}</Eyebrow>
            </motion.div>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-bold tracking-tight text-pr-paper">
              {t("color_title")}
            </motion.h2>
            <motion.p variants={staggerItem} className="mt-6 text-base md:text-lg text-pr-paper/75 leading-relaxed font-sans">
              {t("color_desc")}
            </motion.p>
          </Stagger>

          <Stagger className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {swatches.map((s) => (
              <motion.div
                key={s.key}
                variants={staggerItem}
                className="rounded-2xl overflow-hidden border border-pr-paper/15"
              >
                <div className="h-28 md:h-36 flex items-end p-5" style={{ background: s.hex }}>
                  <span className="font-display text-xs tracking-[0.15em]" style={{ color: s.text }}>
                    {s.hex}
                  </span>
                </div>
                <div className="bg-pr-cinder p-5">
                  <p className="font-display text-sm tracking-wide text-pr-paper">{s.name}</p>
                  <p className="mt-1.5 text-[13px] text-pr-paper/60 font-sans">{t(`color_${s.key}_desc`)}</p>
                </div>
              </motion.div>
            ))}
          </Stagger>

          <motion.p {...reveal} className="mt-10 max-w-3xl text-base text-pr-paper/75 leading-relaxed font-sans">
            {t("color_note")}
          </motion.p>
        </div>
      </section>

      {/* ── 5. Guidelines ── */}
      <section className="bg-pr-paper py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Stagger className="mb-12">
            <motion.div variants={staggerItem}>
              <Eyebrow>{t("rules_label")}</Eyebrow>
            </motion.div>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-bold tracking-tight text-pr-ink">
              {t("rules_title")}
            </motion.h2>
          </Stagger>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {(["1", "2", "3", "4", "5"] as const).map((n) => (
              <motion.div key={n} variants={staggerItem} className="border-t border-pr-ink pt-4">
                <p className="font-display text-[10px] tracking-[0.2em] text-pr-brand mb-2">0{n}</p>
                <h3 className="text-base font-bold tracking-tight text-pr-ink mb-2">{t(`rule_${n}_k`)}</h3>
                <p className="text-[13.5px] text-pr-secondary leading-relaxed font-sans">{t(`rule_${n}_v`)}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── 6. Promise + Slogan (Track Black) ── */}
      <section className="bg-pr-ink text-pr-paper py-24 md:py-36">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div {...reveal} className="flex justify-center">
            <Eyebrow dark>{t("promise_label")}</Eyebrow>
          </motion.div>
          <motion.h2 {...reveal} className="text-3xl md:text-4xl font-bold tracking-tight text-pr-paper">
            {t("promise_title")}
          </motion.h2>
          <RevealText
            text={t("promise_desc")}
            className="mt-8 text-base md:text-lg text-pr-paper leading-relaxed font-sans"
            from={0.25}
          />
          <motion.div {...reveal} className="mt-16 md:mt-24 flex flex-col items-center gap-8">
            <Symbol className="h-14 md:h-20 w-auto" />
            <p className="font-display text-[clamp(1.6rem,6vw,4.5rem)] tracking-[0.18em] text-pr-paper leading-none">
              {t("slogan")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 7. Downloads ── */}
      <section className="bg-pr-paper py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Stagger className="max-w-3xl mb-12">
            <motion.div variants={staggerItem}>
              <Eyebrow>{t("download_label")}</Eyebrow>
            </motion.div>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-bold tracking-tight text-pr-ink">
              {t("download_title")}
            </motion.h2>
            <motion.p variants={staggerItem} className="mt-5 text-base text-pr-secondary leading-relaxed font-sans">
              {t("download_desc")}
            </motion.p>
          </Stagger>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {downloads.map(({ key, files }) => (
              <motion.div
                key={key}
                variants={staggerItem}
                className="bg-white border border-pr-border rounded-2xl p-6 flex flex-col"
              >
                <div className="h-24 flex items-center justify-center mb-5 rounded-xl bg-pr-paper">
                  {key === "symbol" && <Symbol className="h-14 w-auto" />}
                  {key === "wordmark" && <Wordmark className="w-[80%] text-pr-ink" />}
                  {key === "lockup" && (
                    <img src="/brand/dl/lockup_black_2000.png" alt="" className="h-16 w-auto" loading="lazy" />
                  )}
                  {key === "all" && <FileArchive size={30} strokeWidth={1.25} className="text-pr-ink" />}
                </div>
                <h3 className="text-lg font-bold tracking-tight text-pr-ink">{t(`dl_${key}`)}</h3>
                <p className="mt-1 text-[13px] text-pr-tertiary font-sans leading-relaxed">{t(`dl_${key}_desc`)}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {files.map(([label, href]) => (
                    <li key={href}>
                      <a
                        href={href}
                        download
                        className="group inline-flex items-center gap-2 text-pr-ink hover:text-pr-brand transition-colors"
                      >
                        <Download size={14} strokeWidth={1.75} className="text-pr-tertiary group-hover:text-pr-brand" />
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── 8. CTA ── */}
      <section className="bg-pr-paper-2 py-16 md:py-28">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-pr-ink">{t("cta_title")}</h2>
          <p className="mt-4 text-pr-secondary font-sans leading-relaxed">{t("cta_desc")}</p>
          <div className="mt-8">
            <Link href="/contact" className="btn-primary">
              {t("cta_button")}
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
