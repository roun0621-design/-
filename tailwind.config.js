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
        "pr-black": "#0a0a0a",
        "pr-white": "#fafafa",
        "pr-accent": "#00e5ff",
        "pr-accent-dark": "#00b8d4",
        "pr-gray": {
          50: "#f8f9fa",
          100: "#f1f3f5",
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#ced4da",
          500: "#adb5bd",
          600: "#868e96",
          700: "#495057",
          800: "#343a40",
          900: "#212529",
        },
      },
      fontFamily: {
        display: ["var(--font-audiowide)", "monospace"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "track-pulse": "track-pulse 3s ease-in-out infinite",
      },
      keyframes: {
        "track-pulse": {
          "0%, 100%": { opacity: "0.3", transform: "scaleX(0)" },
          "50%": { opacity: "1", transform: "scaleX(1)" },
        },
      },
    },
  },
  plugins: [],
};
