/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── 2026-10 리브랜딩: 트랙에서 가져온 색 (pace-rise-logo/colors.txt) ──
        "pr-white": "#ffffff",
        "pr-paper": "#F4F3EF", // Line White – 페이지 배경
        "pr-paper-2": "#EAE8E2", // 교차 섹션 배경
        "pr-bg": "#EAE8E2",
        "pr-ink": "#0E0E10", // Track Black
        "pr-cinder": "#1B1B1E", // 다크 UI 패널
        "pr-primary": "#0E0E10",
        "pr-secondary": "#4A4843",
        "pr-tertiary": "#8A867E", // Lane Grey
        "pr-border": "#D6D3CB",
        "pr-border-light": "#E6E4DE",
        "pr-tartan": "#C24A2E", // 포인트 — 꼭 필요한 곳에만
        "pr-tartan-light": "#D9573A", // 어두운 배경 위 텍스트
        "pr-brand": "#B8432A", // Tartan Text – 밝은 배경 위 강조 텍스트
        "pr-brand-dark": "#A63C25",
        "pr-brand-light": "rgba(194, 74, 46, 0.08)",
      },
      fontFamily: {
        display: ["var(--font-audiowide)", "Pretendard Variable", "Pretendard", "sans-serif"],
        sans: [
          "var(--font-inter)",
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
        mono: ["var(--font-mono)", "monospace"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
        34: "8.5rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
