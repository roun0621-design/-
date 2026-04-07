"use client";
// ──────────────────────────────────────────
// Pipeline Animation – COS Workflow Visual
// Sequential step activation with flowing line
// ──────────────────────────────────────────
import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const steps = [
  { key: "create", icon: "＋" },
  { key: "event", icon: "▤" },
  { key: "athlete", icon: "♟" },
  { key: "heat", icon: "⊞" },
  { key: "record", icon: "◉" },
  { key: "final", icon: "★" },
] as const;

const STEP_DURATION = 1200; // ms per step
const PAUSE_DURATION = 1500; // ms pause at end before restart

export default function PipelineAnimation() {
  const t = useTranslations("cos");
  const [activeIndex, setActiveIndex] = useState(-1);
  const intervalRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    let idx = -1;
    let paused = false;

    const tick = () => {
      if (paused) {
        paused = false;
        idx = -1;
        setActiveIndex(-1);
        intervalRef.current = setTimeout(tick, STEP_DURATION * 0.5);
        return;
      }

      idx++;
      if (idx >= steps.length) {
        paused = true;
        intervalRef.current = setTimeout(tick, PAUSE_DURATION);
        return;
      }

      setActiveIndex(idx);
      intervalRef.current = setTimeout(tick, STEP_DURATION);
    };

    intervalRef.current = setTimeout(tick, 600);

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, []);

  const stepLabels: Record<string, string> = {
    create: t("pipeline_create" as any) || "대회 생성",
    event: t("pipeline_event" as any) || "종목 설정",
    athlete: t("pipeline_athlete" as any) || "선수 등록",
    heat: t("pipeline_heat" as any) || "조 편성",
    record: t("pipeline_record" as any) || "기록 입력",
    final: t("pipeline_final" as any) || "결승",
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-4">
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
            transitionDuration: `${STEP_DURATION * 0.8}ms`,
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
                  transitionDuration: "400ms",
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
                  transitionDuration: "400ms",
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
            transitionDuration: `${STEP_DURATION * 0.8}ms`,
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
                  transitionDuration: "400ms",
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
                  transitionDuration: "400ms",
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
