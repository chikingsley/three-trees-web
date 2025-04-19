'use client'

import React, { useRef } from "react";
import testimonialsData from "@/lib/testimonials.json";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { UseEmblaCarouselType } from "embla-carousel-react";

type CarouselApi = UseEmblaCarouselType[1];

const Testimonials = () => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  
  const [api, setApi] = React.useState<CarouselApi>();

  // Handle scrolling
  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <section className="py-6 md:py-2 bg-background" id="testimonials">
      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-screen-lg">
      <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-evergreen-900 mb-6">
            What People Are Saying
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
        </div>

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
            <CarouselContent className="-ml-4">
              {testimonialsData.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full">
                    <div className="rounded-xl p-6 bg-white shadow-sm border border-gray-200/50 h-full flex flex-col hover:border-black/20 hover:shadow-md transition-all">
                      <div className="mb-4">
                        <p className="text-base font-semibold text-evergreen-900">{testimonial.name}</p>
                        {testimonial.title && (
                          <p className="text-sm text-muted-foreground">
                            {testimonial.title}
                          </p>
                        )}
                      </div>
                      <p className="text-sm md:text-base text-muted-foreground flex-grow">
                        &quot;{testimonial.quote}&quot;
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom Navigation Buttons */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 z-10">
              <button
                onClick={scrollPrev}
                className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-primary hover:bg-gray-50 border border-gray-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
            </div>
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 z-10">
              <button
                onClick={scrollNext}
                className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-primary hover:bg-gray-50 border border-gray-200"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
