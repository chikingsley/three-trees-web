import { Navbar } from "@/components/navbar";
import Hero from "@/components/hero-section";
import WhyChooseSection from "@/components/why-choose-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        {/* === SECTIONS BASED ON STRATEGY === */}
        {/* 1. Hero Section (Above) */}
        {/* 2. Trust Bar / Social Proof */}
        {/* <TrustBar /> */}
        {/* 3. "Why Three Trees?" / The Difference Section */}
        <WhyChooseSection />
        {/* 4. Court-Mandated Class Focus Section */}
        {/* <ClassFocus /> */}
        {/* 5. "How It Works" Section */}
        {/* <HowItWorks /> */}
        {/* 6. Powerful Testimonial Section */}
        {/* <Testimonials /> */}
        {/* 7. Final Call to Action (CTA) Section */}
        {/* <FinalCTA /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
