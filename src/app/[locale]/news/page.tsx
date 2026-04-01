// ──────────────────────────────────────────
// News List Page
// ──────────────────────────────────────────
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import NewsListContent from "@/components/news/NewsListContent";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "news" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default function NewsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <NewsListContent />;
}
