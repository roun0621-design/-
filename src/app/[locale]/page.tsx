// ──────────────────────────────────────────
// Home Page
// ──────────────────────────────────────────
import { unstable_setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import IntroSection from "@/components/home/IntroSection";
import TrustSection from "@/components/home/TrustSection";
import ServicesSection from "@/components/home/ServicesSection";
import VisionSection from "@/components/home/VisionSection";
import InstagramFeed from "@/components/home/InstagramFeed";
import NodeWelcomeModal from "@/components/layout/NodeWelcomeModal";

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <div className="section-divider" />
      <IntroSection />
      <div className="section-divider" />
      <TrustSection />
      <ServicesSection />
      <VisionSection />
      <div className="section-divider" />
      <InstagramFeed />
      <NodeWelcomeModal />
    </>
  );
}
