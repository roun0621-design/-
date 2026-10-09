"use client";
// ──────────────────────────────────────────
// BreakSymbol – 심볼이 "깨지는" 장면을 스크롤(또는 값)로 재생
//   progress 0   : 온전한 수직 바 (결승선)
//   0.15 → 0.35  : 55° 절단선이 드러남 (금)
//   0.35 → 1     : 위 조각이 절단면을 따라 위로 밀려 올라감 (RISE), 틈에 타탄 섬광
// 기하는 01_symbol SVG 그대로. 위 조각의 이동 벡터 (6.31, -17.01) = 절단면 방향.
// ──────────────────────────────────────────
import { motion, useTransform, type MotionValue } from "framer-motion";
import { SYMBOL_VIEWBOX, SYMBOL_LOWER, SYMBOL_UPPER } from "./Symbol";
import { TARTAN } from "./colors";

const SLIDE_X = 6.31;
const SLIDE_Y = -17.01;
const easeOutQuint = (x: number) => 1 - Math.pow(1 - x, 5);

interface Props {
  progress: MotionValue<number>;
  /** 조각 색. 기본 Track Black (밝은 배경). 어두운 배경이면 Line White */
  color?: string;
  className?: string;
}

export default function BreakSymbol({ progress, color = "#0E0E10", className = "" }: Props) {
  const slide = useTransform(progress, (p) => easeOutQuint(Math.min(1, Math.max(0, (p - 0.35) / 0.65))));
  // 온전한 상태: 위 조각을 (-SLIDE) 만큼 내려 아래 조각과 맞닿게 → 깨지며 (0,0)으로
  const x = useTransform(slide, (s) => -SLIDE_X * (1 - s));
  const y = useTransform(slide, (s) => -SLIDE_Y * (1 - s));
  // 절단선: 0.15~0.35에서 나타났다가 조각이 벌어지면 사라짐
  const cut = useTransform(progress, [0.15, 0.35, 0.55], [0, 1, 0]);
  // 틈 섬광: 벌어지기 시작할 때 번쩍
  const glow = useTransform(progress, [0.35, 0.45, 0.8], [0, 0.9, 0]);

  return (
    <svg viewBox={SYMBOL_VIEWBOX} className={className} aria-hidden overflow="visible">
      {/* 틈 섬광 (타탄) */}
      <motion.polygon points="38,71.14 62,36.86 68.31,19.85 44.31,54.13" fill={TARTAN} style={{ opacity: glow }} />
      <polygon points={SYMBOL_LOWER} fill={color} />
      <motion.g style={{ x, y }}>
        <polygon points={SYMBOL_UPPER} fill={color} />
      </motion.g>
      {/* 절단선 */}
      <motion.line x1="38" y1="71.14" x2="62" y2="36.86" stroke={TARTAN} strokeWidth="1.2" style={{ opacity: cut }} />
    </svg>
  );
}
