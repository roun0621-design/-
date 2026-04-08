// ──────────────────────────────────────────
// Root Layout – Font Loading & Global Styles
// Apple/Stripe Minimal White Theme
// ──────────────────────────────────────────
import type { Metadata } from "next";
import { Audiowide, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
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

// ── GA4 Measurement ID ──
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// ── Global Metadata (fallback) ──
export const metadata: Metadata = {
  title: {
    default: "PACE RISE | Sports Technology – Track & Field Systems",
    template: "%s | PACE RISE",
  },
  description:
    "PACE RISE는 대한민국 육상의 질적 성장과 선수 기량 향상을 최우선 과제로 삼습니다. 실시간 페이싱 라이트 시스템과 경기 운영 시스템(COS)으로 육상의 새로운 기준을 제시합니다.",
  metadataBase: new URL("https://pace-rise.com"),
  keywords: [
    "PACE RISE", "페이스라이즈", "Wavelight", "웨이브라이트",
    "LED pacing light", "LED 페이싱 라이트", "track and field",
    "육상", "경기 운영 시스템", "COS", "PACE RISE : Node",
    "sports technology", "스포츠 테크놀로지",
    "Diamond League", "KTFL", "한국실업육상연맹",
  ],
  openGraph: {
    type: "website",
    siteName: "PACE RISE",
    locale: "ko_KR",
    alternateLocale: "en_US",
    images: [
      {
        url: "/og-image-v2.png",
        width: 1200,
        height: 630,
        alt: "PACE RISE – Sports Technology for Track & Field",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image-v2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

// ── JSON-LD Structured Data ──
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PACE RISE",
  alternateName: "페이스라이즈",
  url: "https://pace-rise.com",
  logo: "https://pace-rise.com/logo-character-gold.png",
  email: "pacerise.run@gmail.com",
  sameAs: ["https://www.instagram.com/pace.rise"],
  description:
    "LED 트랙 페이싱 시스템(웨이브라이트) 및 경기 운영 시스템(PACE RISE : Node)을 통해 육상 경기의 새로운 기준을 제시하는 스포츠 테크놀로지 기업",
  knowsAbout: [
    "LED Pacing Light System",
    "Wavelight System",
    "Track and Field Technology",
    "Competition Operating System",
  ],
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
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_title: document.title,
                  send_page_view: true,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-white text-pr-primary">
        {children}
      </body>
    </html>
  );
}
