"use client";
// ──────────────────────────────────────────
// Motion Provider – 사이트 전역 모션 설정
//  · MotionConfig reducedMotion="user": OS의 "동작 줄이기" 설정을 켠 사용자는
//    framer-motion의 transform 애니메이션이 자동으로 꺼짐 (opacity만 유지)
//  · Lenis: 관성(스무스) 스크롤. 휠/트랙패드에만 적용, 터치는 네이티브 유지.
//    동작 줄이기 사용자에게는 마운트하지 않음.
// ──────────────────────────────────────────
import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "framer-motion";
import "lenis/dist/lenis.css";

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      {reduce ? (
        children
      ) : (
        <ReactLenis
          root
          options={{
            lerp: 0.1,
            duration: 1.15,
            smoothWheel: true,
            syncTouch: false,
            anchors: true, // <a href="#features"> 같은 페이지 내 링크도 부드럽게
          }}
        >
          {children}
        </ReactLenis>
      )}
    </MotionConfig>
  );
}
