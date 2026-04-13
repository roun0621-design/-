// ──────────────────────────────────────────
// About Page
// ──────────────────────────────────────────
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import AboutContent from "@/components/about/AboutContent";
import { buildSeoMeta } from "@/utils/seo";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "about" });
  const seo = buildSeoMeta("/about", locale);
  return {
    title: t("title"),
    description: t("subtitle"),
    ...seo,
  };
}

export default function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <AboutContent />;
}
