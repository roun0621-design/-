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
        "pr-white": "#ffffff",
        "pr-bg": "#F5F5F7",
        "pr-primary": "#1D1D1F",
        "pr-secondary": "#86868B",
        "pr-tertiary": "#AEAEB2",
        "pr-border": "#E5E5E5",
        "pr-border-light": "#F0F0F0",
        "pr-brand": "#B79F58",
        "pr-brand-dark": "#A48D4A",
        "pr-brand-light": "rgba(183, 159, 88, 0.10)",
      },
      fontFamily: {
        display: ["var(--font-audiowide)", "monospace"],
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
