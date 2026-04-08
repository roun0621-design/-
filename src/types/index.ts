// ──────────────────────────────────────────
// Global Type Definitions
// ──────────────────────────────────────────

// Sanity News Post
export interface NewsPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  body?: any[]; // Portable Text blocks
  publishedAt: string;
  thumbnail?: string;
  images?: string[];
  category?: "event" | "tech" | "partnership" | "media";
  language: "ko" | "en";
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
  };
}

// Instagram Post (from Behold.so API)
export interface InstagramPost {
  id: string;
  caption?: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  imageUrl: string;       // CDN 최적화 medium 이미지
  imageUrlLarge: string;  // CDN 최적화 large 이미지
  thumbnailUrl?: string;  // CDN 최적화 small 이미지
  permalink: string;
  timestamp: string;
  colorPalette?: {
    dominant: string;
    muted: string;
    vibrant: string;
    vibrantLight: string;
    vibrantDark: string;
  };
}

// Contact Form Data
export interface ContactFormData {
  name: string;
  email: string;
  organization?: string;
  type: "" | "pacing" | "cos" | "event" | "partnership" | "demo" | "other";
  message: string;
  locale: string;
}

// Site Settings (from Sanity)
export interface SiteSettings {
  companyName: string;
  description?: string;
  descriptionEn?: string;
  email: string;
  instagram: string;
  website: string;
  recordsSystemUrl?: string;
  logo?: string;
  ogImage?: string;
}

// Locale type
export type Locale = "ko" | "en";
