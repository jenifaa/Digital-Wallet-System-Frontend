import HeroSection from "./HeroSection";
import FeaturesSection from "@/components/marketing/FeaturesSection";

import {
  CTASection,
  TestimonialsSection,
} from "@/components/marketing/LandingSections";
import PremiumFeaturesGrid from "@/components/marketing/MarqueeSection";

import WalletCardsSection from "@/components/marketing/WalletCardsSection";
import WhyChooseUs from "@/components/marketing/WhyChooseUs";
import FAQSection from "../publicPages/FAQ";
import PricingSection from "@/components/marketing/Pricing";

export default function HomePage() {
  return (
    <div>
      <HeroSection />

      <FeaturesSection />
      <PremiumFeaturesGrid></PremiumFeaturesGrid>
      <WhyChooseUs></WhyChooseUs>

      <FAQSection></FAQSection>
      <WalletCardsSection></WalletCardsSection>
    <PricingSection></PricingSection>
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
