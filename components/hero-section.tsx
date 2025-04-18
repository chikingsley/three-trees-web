import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  // Using one of the suggested headlines from LANDING_PAGE_STRATEGY.md - Changed to be more direct
  const headline = "Change that lasts.";

  // Using the suggested sub-headline structure from LANDING_PAGE_STRATEGY.md
  const subHeadline = "Court‑mandated classes, campus interventions, and workplace training powered by Cognitive Behavioral Inquiry (CBI).";

  return (
    <section className="container mx-auto flex flex-col items-center justify-center py-20 md:py-32 px-6 text-center min-h-[calc(80vh)]">
      <div className="max-w-3xl">
        <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
          {headline}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {subHeadline}
        </p>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary CTA from strategy */}
          <Button asChild size="lg" className="w-full sm:w-auto rounded-full text-base shadow-none">
            <Link href="#enroll"> {/* Link target might need refinement later */}
              Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          {/* Secondary CTA - linking to a future 'how it works' section */}
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-full text-base shadow-none">
            <Link href="#contact-us">
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero; // Exporting as Hero
