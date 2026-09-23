"use client";
// ──────────────────────────────────────────
// Parallax – 스크롤보다 느리게 움직이는 사진 레이어
// 바깥 div는 overflow-hidden 프레임, 안쪽 레이어는 살짝 확대(scale)한 채
// 화면을 지나는 동안 위→아래로 amount% 만큼 이동. 확대 배율은 항상
// 1 + 2*amount/100 이상이어야 가장자리가 비지 않음.
// ──────────────────────────────────────────
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  /** 이동량 (% of height). 기본 6 */
  amount?: number;
  /** 안쪽 레이어 확대 배율. 기본 1.14 (amount 6에 맞춤) */
  scale?: number;
  className?: string;
}

export default function Parallax({ children, amount = 6, scale = 1.14, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        className="relative w-full h-full will-change-transform"
        style={reduce ? undefined : { y, scale }}
      >
        {children}
      </motion.div>
    </div>
  );
}
