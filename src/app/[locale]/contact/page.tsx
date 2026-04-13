// ──────────────────────────────────────────
// Contact Page
// ──────────────────────────────────────────
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ContactContent from "@/components/contact/ContactContent";
import { buildSeoMeta } from "@/utils/seo";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "contact" });
  const seo = buildSeoMeta("/contact", locale);
  return {
    title: t("title"),
    description: t("subtitle"),
    ...seo,
  };
}

export default function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <ContactContent />;
}
