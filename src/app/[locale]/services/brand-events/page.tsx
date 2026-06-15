// ──────────────────────────────────────────
// Brand & Events Service Page
// ──────────────────────────────────────────
import { unstable_setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import BrandEventsDetail from "@/components/services/BrandEventsDetail";
import { buildSeoMeta } from "@/utils/seo";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "brand_events" });
  const seo = buildSeoMeta("/services/brand-events", locale);
  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    ...seo,
  };
}

export default function BrandEventsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <BrandEventsDetail />;
}
