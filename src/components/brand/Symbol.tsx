// ──────────────────────────────────────────
// Symbol – 심볼 "브레이크" 단독 (pace-rise-logo/01_symbol)
// 55°로 잘린 수직 바. 위 조각은 절단면을 따라 위로 밀려 있다.
// color: "tartan" | "mono"(currentColor). 최소 24px.
// ──────────────────────────────────────────
import { TARTAN } from "./colors";

export const SYMBOL_VIEWBOX = "38 6.99 30.31 85.01";
export const SYMBOL_LOWER = "38,92 62,92 62,36.86 38,71.14";
export const SYMBOL_UPPER = "44.31,54.13 68.31,19.85 68.31,6.99 44.31,6.99";

interface Props {
  className?: string;
  color?: "tartan" | "mono";
  title?: string;
}

export default function Symbol({ className = "", color = "tartan", title = "PACE RISE" }: Props) {
  const fill = color === "tartan" ? TARTAN : "currentColor";
  return (
    <svg viewBox={SYMBOL_VIEWBOX} className={className} role="img" aria-label={title}>
      <polygon points={SYMBOL_LOWER} fill={fill} />
      <polygon points={SYMBOL_UPPER} fill={fill} />
    </svg>
  );
}
