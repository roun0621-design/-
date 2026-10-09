// ──────────────────────────────────────────
// Brand Story Page – /brand
// 로고 "브레이크"의 의미, 워드마크, 색, 사용 규칙, 파일 다운로드
// ──────────────────────────────────────────
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import BrandStory from "@/components/brand/BrandStory";
import { buildSeoMeta } from "@/utils/seo";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "brand" });
  const seo = buildSeoMeta("/brand", locale);
  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    ...seo,
  };
}

export default function BrandPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <BrandStory />;
}
