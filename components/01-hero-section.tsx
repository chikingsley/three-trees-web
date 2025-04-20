"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  const headline = "Evidence-based behavioral change programs that work.";
  const subHeadline = "Court‑mandated classes, campus interventions, and workplace training powered by our Cognitive Behavioral Inquiry (CBI) method.";

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center py-20 text-center min-h-[95vh] overflow-hidden">
      {/* Full Bleed Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div 
          className="absolute inset-0 w-full h-full z-0 bg-[url('/images/headerbg.jpg')] bg-cover bg-center md:bg-fixed" 
        />
        {/* Overlay to improve content visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60 z-10"></div>
      </div>
      
      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-screen-lg w-full relative z-20">
        <div className="max-w-3xl mx-auto">
          {/* Hero Text */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-6 text-3xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter text-white" 
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
          >
            {headline}
          </motion.h1>
          {/* Subheadline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="inline-block mt-6 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-lg border-2 border-primary"
          >
            <p className="text-sm sm:text-sm md:text-base lg:text-xl text-white font-medium max-w-2xl mx-auto">
              {subHeadline}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 sm:mt-12 flex flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Button asChild size="default" className="rounded-full text-sm sm:text-base shadow-none hover:border-white hover:border-1">
              <Link href="#enroll">
                Enroll Now <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="default" className="rounded-full text-sm sm:text-base shadow-none bg-white border-white text-primary hover:bg-primary/50 hover:text-white">
              <Link href="#contact-us">
                Contact Us
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Animated Scroll Chevron */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1.2, duration: 0.5 },
          y: { delay: 1.2, duration: 1.5, repeat: Infinity }
        }}
        onClick={() => scrollToSection('why-choose-section')}
      >
        <ChevronDown className="h-10 w-10 text-white" />
      </motion.div>
    </section>
  );
};

export default Hero;
