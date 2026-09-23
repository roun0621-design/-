"use client";
// ──────────────────────────────────────────
// CountUp – 화면에 들어오면 0부터 올라가는 숫자
// "500+" "1,200명" 처럼 앞뒤 글자가 붙은 값도 숫자 부분만 센다.
// 숫자가 없는 값("진도 · 제주", "Node")은 그대로 표시.
// SSR/초기 HTML에는 최종값이 들어가므로 검색엔진과 JS 미지원 환경에서도 안전.
// ──────────────────────────────────────────
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface Props {
  value: string;
  className?: string;
  duration?: number;
}

const NUMERIC = /^(\D*?)(\d[\d,]*)(.*)$/;

export default function CountUp({ value, className, duration = 1.6 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [display, setDisplay] = useState(value);

  const match = value.match(NUMERIC);

  useEffect(() => {
    if (!match || reduce) return;
    const [, prefix, digits, suffix] = match;
    const target = parseInt(digits.replace(/,/g, ""), 10);
    const useComma = digits.includes(",");
    const format = (n: number) =>
      `${prefix}${useComma ? Math.round(n).toLocaleString("en-US") : Math.round(n)}${suffix}`;

    if (!inView) {
      setDisplay(format(0));
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(format(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
