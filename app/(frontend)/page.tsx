import Navbar from "@/blocks/NavBar";
import Hero from "@/blocks/Hero";
import WhyChooseSection from "@/blocks/WhyChooseUs";
import ProgramsGlance from "@/blocks/ProgramsAtAGlance";
import EnrollmentTimeline from "@/blocks/EnrollmentProcess";
import Testimonials from "@/blocks/WhatPeopleAreSaying";
import CTABanner from "@/blocks/CTAReadyToStart";
import TrustIndicators from "@/blocks/TrustIndicators";
import ThreeTreesApproach from "@/blocks/TheThreePillarsOfLastingChange";
import SectionDivider from '@/components/SectionDivider';
import Footer from '@/blocks/Footer';

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
