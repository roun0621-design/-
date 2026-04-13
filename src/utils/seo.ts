// ──────────────────────────────────────────
// SEO Utility – 페이지별 canonical, alternates, og:url 생성
// ──────────────────────────────────────────
import type { Metadata } from "next";

const BASE_URL = "https://pace-rise.com";

/**
 * 페이지 경로와 locale에 따라 canonical, alternates, og:url을 생성
 * @param path - locale prefix 제외한 경로 (예: "/about", "/services/cos", "/" for home)
 * @param locale - "ko" | "en"
 */
export function buildSeoMeta(path: string, locale: string): Pick<Metadata, "alternates" | "openGraph"> {
  // ko는 prefix 없음, en은 /en prefix
  const koUrl = path === "/" ? BASE_URL : `${BASE_URL}${path}`;
  const enUrl = path === "/" ? `${BASE_URL}/en` : `${BASE_URL}/en${path}`;
  const canonicalUrl = locale === "ko" ? koUrl : enUrl;

  return {
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ko: koUrl,
        en: enUrl,
      },
    },
    openGraph: {
      url: canonicalUrl,
      siteName: "PACE RISE",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/og-image-v2.png`,
          width: 1200,
          height: 630,
          alt: "PACE RISE – Sports Technology for Track & Field",
        },
      ],
    },
  };
}
