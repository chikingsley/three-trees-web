'use client'

import React, { useRef } from "react";
import testimonialsData from "./testimonials.json";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Testimonials = () => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <section className="py-12 md:py-20 bg-background" id="testimonials">
      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-screen-lg">
      <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-evergreen-900 mb-6">
            What People Are Saying
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
        </div>

        <Carousel
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
                  <div className="rounded-xl p-6 bg-white shadow-sm border border-gray-200/50 h-full flex flex-col">
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}

export default Testimonials;
