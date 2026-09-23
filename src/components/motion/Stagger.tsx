"use client";
// ──────────────────────────────────────────
// Stagger – 카드 묶음이 "한 번에 잔잔하게" 흘러 들어오는 등장 효과
//
// 예전 방식(카드마다 whileInView)은 카드 하나하나가 화면에 걸릴 때마다 각자
// 팝업돼서 스크롤하면 툭·툭·툭 끊겨 보였다. 이제는 묶음(그리드)이 20% 정도
// 보이면 한 번만 트리거되고, 안의 카드들이 0.07초 간격으로 0.9초 동안 부드럽게
// 떠오른다. 동작 줄이기 설정에서는 MotionConfig가 transform을 끄므로 opacity만.
//
//   <Stagger className="grid ...">            ← 묶음 (motion.div, className 그대로)
//     <motion.div variants={staggerItem}>…</motion.div>   ← 각 카드
//   </Stagger>
//
// 묶음 없이 단독으로 쓰는 요소는 <motion.div {...reveal}> 로 같은 곡선을 쓴다.
// ──────────────────────────────────────────
import { motion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

/** 단독 요소용: 자기 자신이 30% 보이면 한 번 부드럽게 등장 */
export const reveal = {
  variants: staggerItem,
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.3 },
} as const;

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "ul";
  /** 묶음이 이만큼 보이면 트리거 (0~1). 기본 0.2 */
  amount?: number;
}

export function Stagger({ children, className, style, as = "div", amount = 0.2 }: Props) {
  const Tag = as === "ul" ? motion.ul : motion.div;
  return (
    <Tag
      className={className}
      style={style}
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </Tag>
  );
}
