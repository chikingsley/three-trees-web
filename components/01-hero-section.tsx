import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const headline = "Change that lasts.";
  const subHeadline = "Court‑mandated classes, campus interventions, and workplace training powered by Cognitive Behavioral Inquiry (CBI).";

  return (
    <section className="flex flex-col items-center justify-center py-20 text-center min-h-[75vh] md:min-h-[90vh]">
      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-screen-lg w-full">
        <div className="max-w-3xl mx-auto">
          <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            {headline}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {subHeadline}
          </p>
          <div className="mt-12 flex flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full text-base shadow-none">
              <Link href="#enroll">
                Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full text-base shadow-none">
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
