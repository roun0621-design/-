"use client";
// ──────────────────────────────────────────
// RevealText – 스크롤에 맞춰 단어가 앞에서부터 켜지는 문장
// 요소가 화면 아래 90% 지점에 들어올 때 시작해 55% 지점에 닿을 때 끝남.
// 스크롤을 올리면 다시 흐려짐 (스크롤 연동).
// "\n" 으로 문단을 나눔. 동작 줄이기 설정 시 그냥 보통 글자.
// ──────────────────────────────────────────
import { createElement, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

interface Props {
  text: string;
  as?: "p" | "h1" | "h2" | "h3";
  className?: string;
  /** 시작 밝기 (0~1). 기본 0.16 */
  from?: number;
}

function Word({
  word,
  progress,
  start,
  end,
  from,
  reduce,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  from: number;
  reduce: boolean;
}) {
  const opacity = useTransform(progress, [start, end], [from, 1]);
  return (
    <motion.span style={reduce ? undefined : { opacity }}>
      {word}
    </motion.span>
  );
}

export default function RevealText({ text, as = "p", className, from = 0.16 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });

  const paragraphs = text.split(/\n+/).map((p) => p.trim().split(/\s+/).filter(Boolean));
  const total = paragraphs.reduce((n, p) => n + p.length, 0);
  let index = 0;

  const children = paragraphs.map((words, pi) => (
    <span key={pi} className={pi > 0 ? "block mt-6" : "block"}>
      {words.map((w, wi) => {
        const i = index++;
        // 각 단어는 전체 진행률 중 자기 구간에서 켜지되, 살짝 겹쳐 부드럽게
        const start = i / total;
        const end = Math.min(1, (i + 1.6) / total);
        return (
          <span key={wi}>
            <Word word={w} progress={scrollYProgress} start={start} end={end} from={from} reduce={reduce} />
            {wi < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  ));

  return createElement(as, { ref, className }, children);
}
