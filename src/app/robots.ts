// ──────────────────────────────────────────
// robots.txt
// ──────────────────────────────────────────
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://pace-rise.com/sitemap.xml",
  };
}
