// ──────────────────────────────────────────
// COS (Competition Operating System) Page
// ──────────────────────────────────────────
import { unstable_setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import COSDetail from "@/components/services/COSDetail";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "cos" });
  return {
    title: t("meta_title"),
    description: t("meta_desc"),
  };
}

export default function COSPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <COSDetail />;
}
