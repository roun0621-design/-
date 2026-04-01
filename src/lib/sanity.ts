// ──────────────────────────────────────────
// Sanity Client Configuration
// ──────────────────────────────────────────
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// ⚠️ Replace these with your actual Sanity project values
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_TOKEN, // Server-side only
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
