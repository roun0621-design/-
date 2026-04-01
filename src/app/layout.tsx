// ──────────────────────────────────────────
// Root Layout – Font Loading & Global Styles
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
    "PACE RISE leads innovation in track & field through Wavelight LED pacing systems and real-time race management technology.",
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
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
