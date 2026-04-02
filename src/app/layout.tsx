// ──────────────────────────────────────────
// Root Layout – Font Loading & Global Styles
// Apple/Stripe Minimal White Theme
// ──────────────────────────────────────────
import type { Metadata } from "next";
import { Audiowide, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// ── Google Fonts ──
const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// ── Global Metadata (fallback) ──
export const metadata: Metadata = {
  title: {
    default: "PACE RISE | Sports Technology",
    template: "%s | PACE RISE",
  },
  description:
    "PACE RISE는 대한민국 육상의 질적 성장과 선수 기량 향상을 최우선 과제로 삼습니다. 실시간 페이싱 라이트 시스템과 경기 운영 시스템(COS)으로 육상의 새로운 기준을 제시합니다.",
  metadataBase: new URL("https://pace-rise.com"),
  openGraph: {
    type: "website",
    siteName: "PACE RISE",
    locale: "ko_KR",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      className={`${audiowide.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-white text-pr-primary">
        {children}
      </body>
    </html>
  );
}
