import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const headline = "Evidence-based behavioral change programs that work.";
  const subHeadline = "Court‑mandated classes, campus interventions, and workplace training powered by our Cognitive Behavioral Inquiry (CBI) method.";

  return (
    <section className="relative flex flex-col items-center justify-center py-20 text-center min-h-[75vh] md:min-h-[90vh] overflow-hidden">
      {/* Full Bleed Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/headerbg.jpg"
          alt="Background"
          fill
          priority
          quality={90}
          className="object-cover"
        />
        {/* Overlay to improve content visibility */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
      </div>
      
      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-screen-lg w-full relative z-20">
        <div className="max-w-3xl mx-auto">
          {/* Hero Text */}
          <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            {headline}
          </h1>
          {/* Subheadline */}
          <div className="inline-block mt-6 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-lg border-2 border-primary">
            <p className="text-lg md:text-xl text-white font-medium max-w-2xl mx-auto">
              {subHeadline}
            </p>
          </div>
          <div className="mt-12 flex flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full text-base shadow-none">
              <Link href="#enroll">
                Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full text-base shadow-none bg-transparent border-white text-white hover:bg-white/10">
              <Link href="#contact-us">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
