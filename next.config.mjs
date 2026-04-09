import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      // 이전 사이트(카페24) URL → 새 페이지로 리다이렉트
      { source: "/WLxPR", destination: "/services/pacing-light", permanent: true },
      { source: "/About", destination: "/about", permanent: true },
      { source: "/1527524024", destination: "/contact", permanent: true },
      // 숫자 URL 일괄 리다이렉트 → 홈
      { source: "/21", destination: "/", permanent: true },
      { source: "/23", destination: "/", permanent: true },
      { source: "/25", destination: "/", permanent: true },
      { source: "/32", destination: "/", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "behold.pictures",
      },
      {
        protocol: "https",
        hostname: "cdn.behold.pictures",
      },
      {
        protocol: "https",
        hostname: "cdn2.behold.pictures",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
