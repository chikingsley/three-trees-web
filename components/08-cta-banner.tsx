import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Custom animated grid pattern component based on the template
const AnimatedGridPattern = ({
  numSquares = 30,
  maxOpacity = 0.1,
  duration = 3,
  className,
}: {
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      <div className="absolute inset-0 grid grid-cols-6 gap-1">
        {Array.from({ length: numSquares }).map((_, i) => (
          <div
            key={i}
            className="relative col-span-1 row-span-1 h-full w-full"
            style={{
              opacity: Math.random() * maxOpacity,
              animation: `pulse ${duration + Math.random() * 2}s ease-in-out infinite`,
            }}
          >
            <div className="absolute inset-0 bg-primary/20 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function CTABanner() {
  return (
    <section className="px-4 md:px-6 py-0" id="contact-us">
      <div className="relative overflow-hidden my-8 md:my-12 w-full bg-primary text-primary-foreground max-w-screen-lg mx-auto rounded-2xl py-10 md:py-16 px-6 md:px-14">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_right,white,rgba(255,255,255,0.6),transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        />
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_top_left,white,rgba(255,255,255,0.6),transparent)]",
            "inset-x-0 inset-y-0 h-[200%] skew-y-12"
          )}
        />
        <div className="relative z-0 flex flex-col gap-3">
          <h3 className="text-3xl md:text-4xl font-semibold text-white">
            Ready to Start?
          </h3>
          <p className="mt-2 text-base md:text-lg text-white/90">
            Take the first step toward lasting change with Three Trees. Our programs are designed to help you succeed.
          </p>
        </div>
        <div className="relative z-0 mt-8 md:mt-12 flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="bg-white text-primary border-2 border-white hover:bg-white hover:border-foreground hover:text-primary">
            <Link href="/enroll" className="flex items-center">
              Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" className="bg-secondary text-secondary-foreground border-2 border-secondary hover:bg-secondary/90 hover:text-secondary-foreground">
            <Link href="/contact" className="flex items-center">
              Contact Us <Calendar className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
