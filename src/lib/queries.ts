// ──────────────────────────────────────────
// GROQ Queries for Sanity CMS
// ──────────────────────────────────────────

// 뉴스/블로그 리스트 조회
export const NEWS_LIST_QUERY = `*[_type == "newsPost" && language == $locale] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  "thumbnail": thumbnail.asset->url,
  category,
  language
}`;

// 뉴스/블로그 상세 조회
export const NEWS_DETAIL_QUERY = `*[_type == "newsPost" && slug.current == $slug && language == $locale][0] {
  _id,
  title,
  slug,
  excerpt,
  body,
  publishedAt,
  "thumbnail": thumbnail.asset->url,
  "images": images[].asset->url,
  category,
  language,
  seo {
    metaTitle,
    metaDescription,
    "ogImage": ogImage.asset->url
  }
}`;

// 최신 뉴스 N건 (홈페이지용)
export const LATEST_NEWS_QUERY = `*[_type == "newsPost" && language == $locale] | order(publishedAt desc) [0...$limit] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  "thumbnail": thumbnail.asset->url,
  category
}`;
