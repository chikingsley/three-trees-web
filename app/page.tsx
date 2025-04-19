import { Navbar } from "@/components/navbar";
import Hero from "@/components/01-hero-section";
import AboutCbi from '@/components/03-about-cbi';
import WhyChooseSection from "@/components/04-why-choose-section";
import ProgramsGlance from "@/components/05-programs-glance";
import EnrollmentTimeline from "@/components/06-enrollment-timeline-new";
import Testimonials from "@/components/07-testimonials-new";
import CTABanner from "@/components/08-cta-banner";
import TrustIndicators from "@/components/02-trust-indicators";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <TrustIndicators />
        <AboutCbi />
        {/* 3. "Why Three Trees?" / The Difference Section */}
        <WhyChooseSection />
        {/* 4. Court-Mandated Class Focus Section */}
        <ProgramsGlance />
        {/* 5. "How It Works" Section */}
        <EnrollmentTimeline />
        {/* 6. Powerful Testimonial Section */}
        <Testimonials />
        {/* 7. Final Call to Action (CTA) Section */}
        <CTABanner />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
 