import AppFeaturesGrid from "@/components/marketing/AppFeatureGrid";
import HeroSection from "./HeroSection";
import FeaturesSection from "@/components/marketing/FeaturesSection";

import StatsSection, {
  CTASection,
  TestimonialsSection,
} from "@/components/marketing/LandingSections";
import PremiumFeaturesGrid from "@/components/marketing/MarqueeSection";

import WalletCardsSection from "@/components/marketing/WalletCardsSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />

      <FeaturesSection />
 <PremiumFeaturesGrid></PremiumFeaturesGrid>
      <StatsSection />
     
      <WalletCardsSection></WalletCardsSection>
      <AppFeaturesGrid></AppFeaturesGrid>
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
