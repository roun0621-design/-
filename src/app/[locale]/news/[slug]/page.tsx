// ──────────────────────────────────────────
// News Detail Page
// ──────────────────────────────────────────
import { unstable_setRequestLocale } from "next-intl/server";
import NewsDetailContent from "@/components/news/NewsDetailContent";

export default function NewsDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  unstable_setRequestLocale(locale);
  return <NewsDetailContent slug={slug} />;
}
