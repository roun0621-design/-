"use client";
// ──────────────────────────────────────────
// ScrollProgress – 헤더 상단의 얇은 골드 진행 바 (페이지 읽은 비율)
// ──────────────────────────────────────────
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-pr-brand"
      style={{ scaleX }}
    />
  );
}
