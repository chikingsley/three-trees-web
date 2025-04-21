'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { UseEmblaCarouselType } from "embla-carousel-react";

// Define type for section refs
type SectionRefs = {
  [key: string]: (HTMLDivElement | null)[];
};

type CarouselApi = UseEmblaCarouselType[1];

const ProgramsGlance = () => {
  // Data structure for the programs
  const programsData = {
    categories: ["Courts & Probation", "Universities", "Employers"],
    rows: [
      {
        title: "What We Handle",
        cols: [
          "Anger Management, Domestic Violence, Substance Abuse, Peaceful Parenting",
          "Conflict Resolution, Alcohol & Drug Awareness, Healthy Relationships, Student Leadership",
          "Diversity Equity & Inclusion, Leadership Development, Conflict Management"
        ]
      },
      {
        title: "Program Duration",
        cols: [
          "12 to 78 weeks (1 session per week). Flexible scheduling available.",
          "2-4 weeks (1 session per week). Can be customized to meet organization needs.",
          "Customized duration tailored to meet organizational needs."
        ]
      },
      {
        title: "How it works",
        cols: [
          "Individuals referred by judges, attorneys, or probation officers. Progress reports sent directly to referring agencies.",
          "Students referred by conduct offices, Title IX, or counseling centers. Reporting customizable to meet university needs.",
          "HR leaders or management refer employees for one-on-one or group-based training. Customized workshops based on organizational needs."
        ]
      }
    ],
    slugs: ["court-mandated", "college", "corporate"]
  };

  // State for active category in mobile view
  const [activeCategory, setActiveCategory] = useState(0);

  // Refs for each section type to match heights
  const sectionRefs = useRef<SectionRefs>({});
  
  // Carousel setup
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  
  const [api, setApi] = React.useState<CarouselApi>();

  // Handle carousel navigation
  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
    const index = api?.selectedScrollSnap();
    if (index !== undefined) setActiveCategory(index);
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
    const index = api?.selectedScrollSnap();
    if (index !== undefined) setActiveCategory(index);
  }, [api]);
  
  // Update activeCategory when slide changes
  React.useEffect(() => {
    if (!api) return;
    
    api.on("select", () => {
      setActiveCategory(api.selectedScrollSnap());
    });
  }, [api]);

  // Function to render content with points
  const renderContent = (content: string) => {
    return content.split('. ').map((point, i) => (
      <p key={i} className={i > 0 ? 'mt-2' : ''}>
        {point}{i < content.split('. ').length - 1 && point.trim().length > 0 ? '.' : ''}
      </p>
    ));
  };

  return (
    <section className="py-8 bg-background">
      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-screen-lg">
        <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-evergreen-900 mb-6">
            Programs at a Glance
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
        </div>

        {/* DESKTOP VIEW - Grid Layout (Hidden on mobile) */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {programsData.categories.map((category, categoryIndex) => (
            <div
              key={category}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200/50 transition-all hover:shadow-md hover:-translate-y-1 relative"
            >
              {/* Category Header with "More" link */}
              <div className="border-b border-primary/30 px-5 py-3 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-evergreen-900">{category}</h3>
                <Link
                  href={`/services/${programsData.slugs[categoryIndex]}`}
                  className="text-primary hover:text-primary/80 transition-colors"
                  aria-label="View more details"
                >
                  <ExternalLink size={16} />
                </Link>
              </div>

              {/* Category Content */}
              <div className="p-5 flex flex-col h-full">
                <dl className="space-y-4 flex-grow">
                  {programsData.rows.map((row) => (
                    <div
                      key={row.title}
                      className="pb-3 border-b border-gray-100 last:border-0"
                      ref={el => {
                        // Store ref to this section
                        if (!sectionRefs.current[row.title]) {
                          sectionRefs.current[row.title] = [];
                        }
                        sectionRefs.current[row.title][categoryIndex] = el;
                      }}
                    >
                      <dt className="font-semibold mb-1 text-base">
                        {row.title}
                      </dt>
                      <dd className="text-sm text-muted-foreground">
                        {renderContent(row.cols[categoryIndex])}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Learn More button */}
                <div className="pt-4 mt-auto">
                  <Link
                    href={`/services/${programsData.slugs[categoryIndex]}`}
                    className="flex items-center justify-center px-4 py-2 bg-primary/10 text-primary hover:bg-primary/15 text-sm font-medium rounded-full transition-colors w-full"
                  >
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE VIEW - Swipeable Carousel (Visible only on mobile) */}
        <div className="md:hidden space-y-4">
          {/* Tabs/Pills for category selection */}
          <div className="flex justify-center gap-2 mb-6 overflow-x-auto pb-2">
            {programsData.categories.map((category, index) => (
              <button
                key={category}
                onClick={() => {
                  api?.scrollTo(index);
                  setActiveCategory(index);
                }}
                className={cn(
                  "px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  activeCategory === index
                    ? "bg-primary text-white"
                    : "bg-white text-muted-foreground border border-gray-200 hover:text-primary"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Swipeable Carousel */}
          <div className="relative">
            <Carousel
              setApi={setApi}
              plugins={[plugin.current]}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {programsData.categories.map((category, categoryIndex) => (
                  <CarouselItem key={category}>
                    <div className="px-6">
                      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200/50">
                        <div className="border-b border-primary/30 px-5 py-3">
                          <h3 className="text-lg font-semibold text-evergreen-900">{category}</h3>
                        </div>

                        <div className="p-5">
                          <dl className="space-y-4">
                            {programsData.rows.map((row) => (
                              <div key={row.title} className="pb-3 border-b border-gray-100 last:border-0">
                                <dt className="font-semibold mb-1 text-base">
                                  {row.title}
                                </dt>
                                <dd className="text-sm text-muted-foreground">
                                  {renderContent(row.cols[categoryIndex])}
                                </dd>
                              </div>
                            ))}
                          </dl>

                          <div className="pt-4">
                            <Link
                              href={`/services/${programsData.slugs[categoryIndex]}`}
                              className="flex w-full items-center justify-center px-4 py-2 bg-primary text-white hover:bg-primary/90 text-sm font-medium rounded-full transition-colors"
                            >
                              Learn More <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation Controls */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 z-10">
                <button
                  onClick={scrollPrev}
                  className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-primary hover:bg-gray-50 border border-gray-200"
                  aria-label="Previous program"
                >
                  <ChevronLeft size={18} />
                </button>
              </div>
              
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 z-10">
                <button
                  onClick={scrollNext}
                  className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-primary hover:bg-gray-50 border border-gray-200"
                  aria-label="Next program"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </Carousel>
          </div>

          {/* Indicator dots */}
          <div className="flex justify-center space-x-2 mt-4">
            {programsData.categories.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  api?.scrollTo(index);
                  setActiveCategory(index);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  activeCategory === index ? "bg-primary" : "bg-gray-300 hover:bg-primary/30"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsGlance;
