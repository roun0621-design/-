// ──────────────────────────────────────────
// News Detail Page – Redirect to News List
// Instagram 기반으로 전환되어 개별 상세 페이지 불필요
// ──────────────────────────────────────────
import { redirect } from "next/navigation";

export default function NewsDetailPage({
  params: { locale },
}: {
  params: { locale: string; slug: string };
}) {
  redirect(`/${locale}/news`);
}
