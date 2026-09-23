"use client";
// ──────────────────────────────────────────
// Operator Showcase – Node 운영자 기능 (데스크톱 전용, lg 이상)
// 왼쪽: 화면에 고정(sticky)되는 패널 – 현장 사진 위에 현재 기능의 아이콘·제목·진행 점
// 오른쪽: 기능 6개가 차례로 스크롤되며, 화면 가운데 띠를 지나는 항목이 "현재"가 됨
// 스크롤을 빼앗지 않는 sticky 방식이라 빨리 훑어 내려도 걸리지 않음.
// 모바일에서는 COSDetail의 기존 카드 그리드가 대신 표시됨.
// ──────────────────────────────────────────
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useInView } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ServicePhoto } from "@/lib/servicePhotos";
import { nl2br } from "@/utils/nl2br";

interface Feature {
  key: string;
  icon: LucideIcon;
}

interface Props {
  features: readonly Feature[];
  photos?: ServicePhoto[];
}

const GOLD = "#D9C27A";

/* 오른쪽 항목 – 화면 가운데 10% 띠에 들어오면 부모에 알림 */
function FeatureRow({
  index,
  feature,
  active,
  onActive,
  title,
  desc,
}: {
  index: number;
  feature: Feature;
  active: boolean;
  onActive: (i: number) => void;
  title: string;
  desc: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const Icon = feature.icon;

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <motion.div
      ref={ref}
      className="min-h-[62vh] flex items-center"
      animate={{ opacity: active ? 1 : 0.3 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-md">
        <div className="flex items-center gap-4 mb-5">
          <span className="font-display text-sm tracking-[0.2em] text-pr-brand">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-pr-brand-light text-pr-brand">
            <Icon size={18} strokeWidth={1.5} />
          </span>
        </div>
        <h3 className="text-2xl md:text-[28px] font-bold tracking-tight text-pr-primary mb-4">
          {title}
        </h3>
        <p className="text-[15px] text-pr-secondary leading-relaxed font-sans">{desc}</p>
      </div>
    </motion.div>
  );
}

export default function OperatorShowcase({ features, photos = [] }: Props) {
  const t = useTranslations("cos");
  const [active, setActive] = useState(0);

  // 사진이 n장이면 기능 6개를 n구간으로 나눠 순서대로 배경 교체
  const per = photos.length ? Math.ceil(features.length / photos.length) : 1;
  const photoIndex = photos.length ? Math.min(photos.length - 1, Math.floor(active / per)) : -1;

  const current = features[active];
  const CurrentIcon = current.icon;
  const tag = current.key.replace(/_/g, " ").toUpperCase();

  return (
    <div className="hidden lg:grid grid-cols-12 gap-14 items-start">
      {/* ── Sticky visual panel ── */}
      <div className="col-span-5 sticky top-28">
        <div
          className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-pr-primary"
          style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.18)" }}
        >
          {/* Background photos (cross-fade) */}
          {photos.map((p, i) => (
            <motion.div
              key={p.src}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: i === photoIndex ? 1 : 0, scale: i === photoIndex ? 1 : 1.06 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src={p.src} alt="" fill unoptimized sizes="40vw" className="object-cover" />
            </motion.div>
          ))}
          {/* Fallback gradient when there are no photos */}
          {photos.length === 0 && (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(183,159,88,0.35),transparent_60%)]" />
          )}
          {/* Dim overlay so the text reads */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15" />

          {/* Overlay content */}
          <div className="absolute inset-0 p-8 xl:p-10 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-display text-[11px] tracking-[0.3em]" style={{ color: GOLD }}>
                PACE RISE : Node
              </span>
              <span className="font-display text-[11px] tracking-[0.2em] text-white/60">
                {String(active + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
              </span>
            </div>

            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-white/10 border border-white/15 backdrop-blur-sm"
                    style={{ color: GOLD }}
                  >
                    <CurrentIcon size={26} strokeWidth={1.5} />
                  </div>
                  <p className="font-display text-[11px] tracking-[0.25em] mb-2" style={{ color: GOLD }}>
                    {tag}
                  </p>
                  <h3 className="text-2xl xl:text-3xl font-bold tracking-tight text-white leading-snug">
                    {t(`op_${current.key}` as any)}
                  </h3>
                </motion.div>
              </AnimatePresence>

              {/* Progress dots */}
              <div className="mt-7 flex items-center gap-1.5">
                {features.map((f, i) => (
                  <span
                    key={f.key}
                    className="h-1 rounded-full transition-all duration-500"
                    style={{
                      width: i === active ? 32 : 12,
                      background: i <= active ? GOLD : "rgba(255,255,255,0.25)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scrolling feature list ── */}
      <div className="col-span-7 pt-6">
        {features.map((f, i) => (
          <FeatureRow
            key={f.key}
            index={i}
            feature={f}
            active={i === active}
            onActive={setActive}
            title={t(`op_${f.key}` as any)}
            desc={nl2br(t(`op_${f.key}_desc` as any))}
          />
        ))}
      </div>
    </div>
  );
}
