import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function AboutCbiMethod() {
  return (
    <section className="py-8 md:py-12 lg:py-20 bg-[#EEF0FC] dark:bg-gray-900" style={{ backgroundColor: 'rgba(91, 117, 235, 0.1)' }}>
      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-screen-lg">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <p className="text-sm font-semibold text-primary dark:text-blue-400 uppercase tracking-wider mb-2">
              Our Proven Method
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              The CBI Method: Fostering Lasting Change
            </h2>
            <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
              Developed by Three Trees Counseling, the Cognitive Behavioral Inquiry (CBI) method is our proprietary approach to helping people achieve meaningful and sustainable change. It uniquely blends the proven principles of Cognitive Behavioral Therapy (CBT) with mindfulness practices.
            </p>

            {/* Stats Section - Always 2 columns */}
            <div className="mt-8 grid grid-cols-2 gap-8">
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">95%</p>
                <p className="mt-1 text-sm sm:text-base text-muted-foreground">
                  Success Rate: Graduates remain violation-free 3 years post-completion.
                </p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">40k+</p>
                <p className="mt-1 text-sm sm:text-base text-muted-foreground">
                  Lives Changed: Individuals empowered to redirect their paths since our founding.
                </p>
              </div>
            </div>

            {/* Learn More Button - Styled like header outline button */}
            <div className="mt-8">
              <Button variant="outline" size="sm" asChild className="font-semibold">
                <Link href="/about"> 
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <Image
              src="/undraw_high-five_w86k.svg"
              alt="Illustration of two people giving a high five"
              width={450} // Adjust width as needed
              height={320} // Adjust height based on aspect ratio or desired size
              priority // Load image sooner if it's above the fold
            />
          </div>
        </div>
      </div>
    </section>
  );
}
