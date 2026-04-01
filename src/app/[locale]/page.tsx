// ──────────────────────────────────────────
// Home Page
// ──────────────────────────────────────────
import { unstable_setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import InstagramFeed from "@/components/home/InstagramFeed";

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <InstagramFeed />
    </>
  );
}
