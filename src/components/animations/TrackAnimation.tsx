"use client";
// ──────────────────────────────────────────
// Track Animation – Wavelight LED Pacing Visual
// Minimal 2D oval track with 4 colored dots
//
// 스크롤 연동: 이 요소가 화면을 지나가는 동안(아래 끝 → 위 끝) 스크롤 진행률에
// 비례해 빛이 트랙을 달린다. 빠른 페이스(WR)가 더 많은 바퀴를 돈다.
// 스크롤을 멈추면 아주 느린 관성 드리프트만 남고, 동작 줄이기 설정에서는 정지.
// ──────────────────────────────────────────
import { useEffect, useRef } from "react";
import { useScroll, useSpring, useReducedMotion } from "framer-motion";

/* ── Dot config ── */
const dots = [
  { color: "#22C55E", laps: 1.6, idle: 0.00007, label: "WR" },     // green  – world record pace
  { color: "#EF4444", laps: 1.3, idle: 0.00006, label: "NR" },     // red    – national record pace
  { color: "#3B82F6", laps: 1.05, idle: 0.00005, label: "Target" }, // blue   – target pace
  { color: "#AEAEB2", laps: 0.8, idle: 0.00004, label: "Base" },    // grey   – base pace
] as const;

/* Track shape: horizontal ellipse */
const TRACK_RX = 0.42; // ratio of canvas width
const TRACK_RY = 0.32; // ratio of canvas height
const TRAIL = 9; // 빛꼬리 점 개수

interface Props {
  /** 캔버스 아래 안내 문구 (예: "스크롤하면 빛이 트랙을 달립니다") */
  hint?: string;
}

export default function TrackAnimation({ hint }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end start"] });
  // 스프링으로 살짝 늦게 따라와 빛이 "미끄러지는" 느낌
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 20, mass: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* Offsets: each dot starts at different angle positions */
    const offsets = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5];
    const startTime = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number) => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      const cx = w / 2;
      const cy = h / 2;
      const rx = w * TRACK_RX;
      const ry = h * TRACK_RY;

      ctx.clearRect(0, 0, w, h);

      /* ── Draw track oval ── */
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "#E5E5E5";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      /* ── Inner rail hint (even thinner) ── */
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx - 12, ry - 8, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "#F0F0F0";
      ctx.lineWidth = 0.75;
      ctx.stroke();

      /* ── Draw dots ── */
      const elapsed = reduce ? 0 : now - startTime;
      const p = reduce ? 0 : progress.get();

      dots.forEach((dot, i) => {
        const angle = offsets[i] + p * dot.laps * Math.PI * 2 + elapsed * dot.idle;

        /* Light trail – fading dots behind the head */
        for (let k = TRAIL; k >= 1; k--) {
          const a = angle - k * 0.04;
          const tx = cx + rx * Math.cos(a);
          const ty = cy + ry * Math.sin(a);
          const alpha = Math.round((1 - k / (TRAIL + 1)) * 0.55 * 255)
            .toString(16)
            .padStart(2, "0");
          ctx.beginPath();
          ctx.arc(tx, ty, 3.2 * (1 - k / (TRAIL + 2)), 0, Math.PI * 2);
          ctx.fillStyle = dot.color + alpha;
          ctx.fill();
        }

        const x = cx + rx * Math.cos(angle);
        const y = cy + ry * Math.sin(angle);

        /* Glow */
        ctx.beginPath();
        ctx.arc(x, y, 11, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 11);
        grad.addColorStop(0, dot.color + "55");
        grad.addColorStop(1, dot.color + "00");
        ctx.fillStyle = grad;
        ctx.fill();

        /* Dot core */
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      });

      if (!reduce) animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [progress, reduce]);

  return (
    <div ref={wrapRef} className="relative w-full aspect-[16/9] max-w-lg mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
      {/* Scroll hint – bottom left */}
      {hint && !reduce && (
        <div className="absolute bottom-2 left-3 flex items-center gap-2 text-pr-tertiary">
          <span className="inline-block w-4 h-px bg-pr-brand/60" />
          <span className="text-[9px] font-display tracking-[0.2em] uppercase">{hint}</span>
        </div>
      )}
      {/* Minimal legend – bottom right */}
      <div className="absolute bottom-2 right-3 flex items-center gap-3">
        {dots.map((dot) => (
          <span key={dot.label} className="flex items-center gap-1">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: dot.color }}
            />
            <span className="text-[9px] text-pr-tertiary tracking-wider font-display">
              {dot.label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
