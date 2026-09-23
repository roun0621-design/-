"use client";
// ──────────────────────────────────────────
// Pipeline Animation – COS Workflow Visual
// Sequential step activation with flowing line
//
// 스크롤 연동: 이 블록이 화면 아래 90% 지점에 들어온 순간부터 위 35% 지점에
// 닿을 때까지의 스크롤 거리를 6단계로 나눠, 내리는 만큼 다음 단계가 켜진다.
// 올리면 다시 꺼짐. 동작 줄이기 설정에서는 전 단계가 켜진 정지 화면.
// ──────────────────────────────────────────
import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";

const steps = [
  { key: "create", icon: "＋" },
  { key: "event", icon: "▤" },
  { key: "athlete", icon: "♟" },
  { key: "heat", icon: "⊞" },
  { key: "record", icon: "◉" },
  { key: "final", icon: "★" },
] as const;

const LINE_MS = 350; // 진행선이 다음 단계까지 따라오는 시간

export default function PipelineAnimation() {
  const t = useTranslations("cos");
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(-1);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.35"] });

  // 진행률 0 → 아무것도 안 켜짐(-1), 1 → 마지막 단계(5)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    const idx = Math.ceil(v * steps.length) - 1;
    setActiveIndex(Math.max(-1, Math.min(steps.length - 1, idx)));
  });

  useEffect(() => {
    if (reduce) setActiveIndex(steps.length - 1);
  }, [reduce]);

  const stepLabels: Record<string, string> = {
    create: t("pipeline_create" as any) || "대회 생성",
    event: t("pipeline_event" as any) || "종목 설정",
    athlete: t("pipeline_athlete" as any) || "선수 등록",
    heat: t("pipeline_heat" as any) || "조 편성",
    record: t("pipeline_record" as any) || "기록 입력",
    final: t("pipeline_final" as any) || "결승",
  };

  return (
    <div ref={ref} className="w-full max-w-2xl mx-auto py-4">
      {/* ── Desktop: horizontal layout ── */}
      <div className="hidden sm:flex items-center justify-between relative">
        {/* Background connecting line */}
        <div className="absolute top-5 left-[24px] right-[24px] h-px bg-pr-border z-0" />

        {/* Active progress line */}
        <div
          className="absolute top-5 left-[24px] h-px z-[1] transition-all ease-out"
          style={{
            width:
              activeIndex < 0
                ? "0%"
                : `${(activeIndex / (steps.length - 1)) * 100}%`,
            maxWidth: "calc(100% - 48px)",
            background: "var(--pr-brand)",
            transitionDuration: `${LINE_MS}ms`,
          }}
        />

        {steps.map((step, i) => {
          const isActive = i <= activeIndex;
          const isCurrent = i === activeIndex;

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center" style={{ width: `${100 / steps.length}%` }}>
              {/* Node circle */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all border-2"
                style={{
                  transitionDuration: "250ms",
                  background: isActive ? "var(--pr-brand)" : "white",
                  borderColor: isActive ? "var(--pr-brand)" : "var(--pr-border)",
                  color: isActive ? "white" : "var(--pr-text-tertiary)",
                  transform: isCurrent ? "scale(1.15)" : "scale(1)",
                  boxShadow: isCurrent
                    ? "0 0 0 4px rgba(183, 159, 88, 0.15)"
                    : "none",
                }}
              >
                {step.icon}
              </div>

              {/* Label */}
              <span
                className="mt-2.5 text-[10px] font-display tracking-wider text-center transition-colors"
                style={{
                  transitionDuration: "250ms",
                  color: isActive
                    ? "var(--pr-text-primary)"
                    : "var(--pr-text-tertiary)",
                }}
              >
                {stepLabels[step.key]}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Mobile: vertical layout ── */}
      <div className="sm:hidden flex flex-col items-start relative pl-5">
        {/* Background vertical line */}
        <div className="absolute top-[20px] bottom-[20px] left-[24px] w-px bg-pr-border z-0" />

        {/* Active progress line */}
        <div
          className="absolute top-[20px] left-[24px] w-px z-[1] transition-all ease-out"
          style={{
            height:
              activeIndex < 0
                ? "0%"
                : `${(activeIndex / (steps.length - 1)) * 100}%`,
            maxHeight: "calc(100% - 40px)",
            background: "var(--pr-brand)",
            transitionDuration: `${LINE_MS}ms`,
          }}
        />

        {steps.map((step, i) => {
          const isActive = i <= activeIndex;
          const isCurrent = i === activeIndex;

          return (
            <div key={step.key} className="relative z-10 flex items-center gap-4 py-3">
              {/* Node circle */}
              <div
                className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-sm shrink-0 transition-all border-2"
                style={{
                  transitionDuration: "250ms",
                  background: isActive ? "var(--pr-brand)" : "white",
                  borderColor: isActive ? "var(--pr-brand)" : "var(--pr-border)",
                  color: isActive ? "white" : "var(--pr-text-tertiary)",
                  transform: isCurrent ? "scale(1.12)" : "scale(1)",
                  boxShadow: isCurrent
                    ? "0 0 0 4px rgba(183, 159, 88, 0.15)"
                    : "none",
                }}
              >
                {step.icon}
              </div>

              {/* Label */}
              <span
                className="text-[11px] font-display tracking-wider transition-colors"
                style={{
                  transitionDuration: "250ms",
                  color: isActive
                    ? "var(--pr-text-primary)"
                    : "var(--pr-text-tertiary)",
                }}
              >
                {stepLabels[step.key]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
