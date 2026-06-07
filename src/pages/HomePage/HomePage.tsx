import HeroSection from "./HeroSection";
import FeaturesSection from "@/components/marketing/FeaturesSection";


import StatsSection, {
  CTASection,
  TestimonialsSection,
} from "@/components/marketing/LandingSections";

import WalletCardsSection from "@/components/marketing/WalletCardsSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
   
      <FeaturesSection />
      <StatsSection />
      <WalletCardsSection></WalletCardsSection>
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
