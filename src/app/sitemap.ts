// ──────────────────────────────────────────
// Dynamic Sitemap.xml – Multilingual SEO
// ──────────────────────────────────────────
import { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity";

const BASE_URL = "https://pace-rise.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    { path: "", priority: 1.0 },
    { path: "/about", priority: 0.8 },
    { path: "/news", priority: 0.7 },
    { path: "/contact", priority: 0.6 },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap(
    ({ path, priority }) => [
      {
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority,
        alternates: {
          languages: {
            ko: `${BASE_URL}${path}`,
            en: `${BASE_URL}/en${path}`,
          },
        },
      },
    ]
  );

  // Dynamic news pages from Sanity
  let newsEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await sanityClient.fetch(
      `*[_type == "newsPost"] { slug, language, publishedAt }`
    );

    newsEntries = (posts || []).map(
      (post: { slug: { current: string }; language: string; publishedAt: string }) => ({
        url:
          post.language === "ko"
            ? `${BASE_URL}/news/${post.slug.current}`
            : `${BASE_URL}/en/news/${post.slug.current}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      })
    );
  } catch {
    // Sanity not configured yet – skip dynamic entries
  }

  return [...staticEntries, ...newsEntries];
}
