import { Navbar } from "@/components/navbar";
import Hero from "@/components/01-hero-section";
import WhyChooseSection from "@/components/04-why-choose-section";
import ProgramsGlance from "@/components/05-programs-glance";
import EnrollmentTimeline from "@/components/06-enrollment-timeline";
import Testimonials from "@/components/07-testimonials";
import CTABanner from "@/components/08-cta-banner";
import TrustIndicators from "@/components/02-trust-indicators";
import ThreeTreesApproach from "@/components/05-three-trees-approach";
import SectionDivider from '@/components/section-divider';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <Hero />
      <TrustIndicators />
      {/* <AboutCbi /> */}
      {/* 3. "Why Three Trees?" / The Difference Section */}
      <WhyChooseSection />
      <SectionDivider />
      {/* Three Pillars of Lasting Change Section */}
      <ThreeTreesApproach />
      <SectionDivider
        topColor="#EEF0FC"
        bottomColor="white"
      />
      {/* 4. Court-Mandated Class Focus Section */}
      <ProgramsGlance />
      <SectionDivider
        topColor="white"
        bottomColor="#F3F4F6"
      />
      {/* 5. "How It Works" Section */}
      <EnrollmentTimeline />
      <SectionDivider
        topColor="#F3F4F6"
        bottomColor="white"
      />
      {/* 6. Powerful Testimonial Section */}
      <Testimonials />
      {/* 7. Final Call to Action (CTA) Section */}
      <CTABanner />
      <Footer />
    </div>
  );
}
