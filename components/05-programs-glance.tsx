'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define type for section refs
type SectionRefs = {
  [key: string]: (HTMLDivElement | null)[];
};

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
          "Individuals referred by judges, attorneys, or probation officers. Enroll and attend weekly CBI-led sessions. Progress reports sent directly to referring agencies.",
          "Students referred by conduct offices, Title IX, or counseling centers. Complete a guided workbook. Attend a live, facilitator-led 3-hour lab session.",
          "HR leaders or management refer employees for one-on-one or group-based training. Customized workshops based on organizational needs. Optional follow-up coaching."
        ]
      },
      {
        title: "Outcome",
        cols: [
          "✔️Court-recognized completion certificate. ✔️Reduced recidivism and improved decision-making. ✔️Weekly progress reports to the court. ✔️Completion letters sent directly to referrer.",
          "✔️Improved student accountability. 95% have no repeat violations. ✔️Completion report for the conduct record. ✔️Helps retain students at risk of suspension.",
          "✔️Measurable improvement in emotional regulation. ✔️Employer receives action plan & documentation. ✔️Retains high-potential employees from termination. ✔️Fulfills HR & compliance goals (e.g., DEI, professionalism)."
        ]
      }
    ],
    slugs: ["court-mandated", "college", "corporate"]
  };

  // State for active category in mobile view
  const [activeCategory, setActiveCategory] = useState(0);

  // Refs for each section type to match heights
  const sectionRefs = useRef<SectionRefs>({});

  // Handle navigation for mobile carousel
  const handlePrevious = () => {
    setActiveCategory(prev => (prev > 0 ? prev - 1 : programsData.categories.length - 1));
  };

  const handleNext = () => {
    setActiveCategory(prev => (prev < programsData.categories.length - 1 ? prev + 1 : 0));
  };

  // Function to render content with icons for outcomes
  const renderContent = (content: string, rowTitle: string) => {
    if (rowTitle !== "Outcome") {
      return content.split('. ').map((point, i) => (
        <p key={i} className={i > 0 ? 'mt-2' : ''}>
          {point}{i < content.split('. ').length - 1 && point.trim().length > 0 ? '.' : ''}
        </p>
      ));
    }

    // For outcome section, replace ✔️ with CheckCircle icon
    return content.split('✔️').filter(item => item.trim().length > 0).map((point, i) => (
      <div key={i} className="flex items-start gap-2 mt-2 first:mt-0">
        <CheckCircle className="min-w-4 h-4 text-primary mt-0.5" />
        <span>{point.trim()}</span>
      </div>
    ));
  };

  return (
    <section className="py-8 md:py-12 lg:py-20 bg-background">
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
                        {renderContent(row.cols[categoryIndex], row.title)}
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

        {/* MOBILE VIEW - Carousel (Visible only on mobile) */}
        <div className="md:hidden space-y-4">
          {/* Tabs/Pills for category selection */}
          <div className="flex justify-center gap-2 mb-6 overflow-x-auto pb-2">
            {programsData.categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveCategory(index)}
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

          {/* Carousel with navigation arrows */}
          <div className="relative">
            {/* Previous button */}
            <button
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-primary hover:bg-gray-50 border border-gray-200"
              aria-label="Previous program"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Cards container with transition */}
            <div className="overflow-hidden rounded-lg">
              <div
                className="transition-transform duration-300 ease-in-out flex"
                style={{ transform: `translateX(-${activeCategory * 100}%)` }}
              >
                {programsData.categories.map((category, categoryIndex) => (
                  <div
                    key={category}
                    className="w-full flex-shrink-0 px-6"
                  >
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
                                {renderContent(row.cols[categoryIndex], row.title)}
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
                ))}
              </div>
            </div>

            {/* Next button */}
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-primary hover:bg-gray-50 border border-gray-200"
              aria-label="Next program"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Indicator dots */}
          <div className="flex justify-center space-x-2 mt-4">
            {programsData.categories.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
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
