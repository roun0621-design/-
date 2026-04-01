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

// Instagram Post (from API)
export interface InstagramPost {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

// Contact Form Data
export interface ContactFormData {
  name: string;
  email: string;
  organization?: string;
  type: "wavelight" | "event" | "partnership" | "other";
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
