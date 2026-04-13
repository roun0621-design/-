// ──────────────────────────────────────────
// Pacing Light Service Page
// ──────────────────────────────────────────
import { unstable_setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import PacingLightDetail from "@/components/services/PacingLightDetail";
import { buildSeoMeta } from "@/utils/seo";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "pacing_light" });
  const seo = buildSeoMeta("/services/pacing-light", locale);
  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    ...seo,
  };
}

export default function PacingLightPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <PacingLightDetail />;
}
