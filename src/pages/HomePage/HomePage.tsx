import HeroSection from "./HeroSection";
import FeaturesSection from "@/components/marketing/FeaturesSection";
import StatsSection, {
  CTASection,
  TestimonialsSection,
} from "@/components/marketing/LandingSections";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
