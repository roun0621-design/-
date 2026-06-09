// ──────────────────────────────────────────
// [locale] Layout – i18n Provider + Navigation
// next-intl v3 compatible (Next.js 14)
// ──────────────────────────────────────────
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { buildSeoMeta } from "@/utils/seo";

// Static generation for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Dynamic metadata per locale
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const seo = buildSeoMeta("/", locale);

  return {
    title: t("title"),
    description: t("description"),
    ...seo,
    openGraph: {
      title: t("title"),
      description: t("description"),
      ...seo.openGraph,
      siteName: "PACE RISE",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "website",
      images: [
        {
          url: "/og-image-v2.png",
          width: 1200,
          height: 630,
          alt: "PACE RISE – Sports Technology for Track & Field",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og-image-v2.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  unstable_setRequestLocale(locale);

  // Fetch all messages for the client provider
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
