import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  // Using one of the suggested headlines from LANDING_PAGE_STRATEGY.md - Changed to be more direct
  const headline = "Court-Approved Classes That Actually Work.";

  // Using the suggested sub-headline structure from LANDING_PAGE_STRATEGY.md
  const subHeadline = "Court-Accepted Nationwide. Evidence-based, 'at-home' live group sessions for Anger Management, Domestic Violence, Substance Use, Parenting, and more, designed for lasting results.";

  return (
    <section className="container mx-auto flex flex-col items-center justify-center py-20 md:py-32 px-6 text-center min-h-[calc(80vh)]">
      <div className="max-w-3xl">
        {/* Changed Badge variant to outline for better readability */}
        <Badge variant="outline" className="rounded-full py-1 px-3">
          Guaranteed Court Acceptance
        </Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          {headline}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          {subHeadline}
        </p>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary CTA from strategy */}
          <Button asChild size="lg" className="w-full sm:w-auto rounded-full text-base">
            <Link href="#enroll"> {/* Link target might need refinement later */}
              Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          {/* Secondary CTA - linking to a future 'how it works' section */}
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-full text-base shadow-none">
            <Link href="#how-it-works">
              Learn How It Works
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero; // Exporting as Hero
