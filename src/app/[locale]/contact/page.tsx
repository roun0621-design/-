// ──────────────────────────────────────────
// Contact Page
// ──────────────────────────────────────────
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ContactContent from "@/components/contact/ContactContent";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description: t("subtitle"),
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
