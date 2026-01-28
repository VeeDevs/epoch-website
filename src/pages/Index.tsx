import { HeroSection } from "@/components/landing/HeroSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { ThemesSection } from "@/components/landing/ThemesSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { AvailabilityCalendar } from "@/components/landing/AvailabilityCalendar";
import { ReviewsSection } from "@/components/landing/ReviewsSection";
import { BookingSection } from "@/components/landing/BookingSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen font-body">
      <HeroSection />
      <AboutSection />
      <ThemesSection />
      <PricingSection />
      <AvailabilityCalendar />
      <ReviewsSection />
      <BookingSection />
      <Footer />
    </div>
  );
};

export default Index;
