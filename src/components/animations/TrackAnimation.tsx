"use client";
// ──────────────────────────────────────────
// Track Animation – Wavelight LED Pacing Visual
// Minimal 2D oval track with 4 colored dots
// ──────────────────────────────────────────
import { useEffect, useRef } from "react";

/* ── Dot config ── */
const dots = [
  { color: "#22C55E", speed: 0.0008, label: "WR" },      // green  – world record pace
  { color: "#EF4444", speed: 0.00065, label: "NR" },     // red    – national record pace
  { color: "#3B82F6", speed: 0.00052, label: "Target" },  // blue   – target pace
  { color: "#AEAEB2", speed: 0.0004, label: "Base" },     // grey   – base pace
] as const;

/* Track shape: horizontal ellipse */
const TRACK_RX = 0.42; // ratio of canvas width
const TRACK_RY = 0.32; // ratio of canvas height

export default function TrackAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

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
      const elapsed = now - startTime;

      dots.forEach((dot, i) => {
        const angle = offsets[i] + elapsed * dot.speed;
        const x = cx + rx * Math.cos(angle);
        const y = cy + ry * Math.sin(angle);

        /* Glow */
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 10);
        grad.addColorStop(0, dot.color + "40"); // 25% opacity
        grad.addColorStop(1, dot.color + "00");
        ctx.fillStyle = grad;
        ctx.fill();

        /* Dot core */
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative w-full aspect-[16/9] max-w-lg mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
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
