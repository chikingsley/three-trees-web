import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// --- Type Definitions ---
interface StatItem {
  value?: string;
  description?: string;
}

interface ButtonLink {
  text?: string;
  href?: string;
}

interface ImageInfo {
  src?: string;
  alt?: string;
}

interface AboutCbiProps {
  tagline?: string;
  headline?: string;
  paragraph?: string;
  stat1?: StatItem;
  stat2?: StatItem;
  button?: ButtonLink;
  image?: ImageInfo;
}

// --- Default Values ---
const defaultProps: Required<AboutCbiProps> = {
  tagline: "Our Proven Method",
  headline: "The CBI Method: Fostering Lasting Change",
  paragraph: "Developed by Three Trees Counseling, the Cognitive Behavioral Inquiry (CBI) method is our proprietary approach to helping people achieve meaningful and sustainable change. It uniquely blends the proven principles of Cognitive Behavioral Therapy (CBT) with mindfulness practices.",
  stat1: {
    value: "95%",
    description: "Success Rate: Graduates remain violation-free 3 years post-completion."
  },
  stat2: {
    value: "40k+",
    description: "Lives Changed: Individuals empowered to redirect their paths since our founding."
  },
  button: {
    text: "Learn More",
    href: "/about"
  },
  image: {
    src: "/undraw_high-five_w86k.svg",
    alt: "Illustration of two people giving a high five"
  }
};

export default function AboutCbiMethod(props: AboutCbiProps) {
  // Merge props with defaults, ensuring deep merge for nested objects
  const finalProps = {
    ...defaultProps,
    ...props,
    stat1: { ...defaultProps.stat1, ...props.stat1 },
    stat2: { ...defaultProps.stat2, ...props.stat2 },
    button: { ...defaultProps.button, ...props.button },
    image: { ...defaultProps.image, ...props.image },
  };

  const { tagline, headline, paragraph, stat1, stat2, button, image } = finalProps;

  return (
    <section className="py-8 md:py-12 lg:py-20 bg-[#EEF0FC] dark:bg-gray-900">
      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-screen-lg">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            {tagline && (
              <p className="text-sm font-semibold text-primary dark:text-blue-400 uppercase tracking-wider mb-2">
                {tagline}
              </p>
            )}
            {headline && (
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                {headline}
              </h2>
            )}
            {paragraph && (
              <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                {paragraph}
              </p>
            )}

            {/* Stats Section */}
            {(stat1?.value || stat2?.value) && (
              <div className="mt-8 grid grid-cols-2 gap-8">
                {stat1?.value && (
                  <div>
                    <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{stat1.value}</p>
                    {stat1.description && (
                      <p className="mt-1 text-sm sm:text-base text-muted-foreground">
                        {stat1.description}
                      </p>
                    )}
                  </div>
                )}
                {stat2?.value && (
                  <div>
                    <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{stat2.value}</p>
                    {stat2.description && (
                      <p className="mt-1 text-sm sm:text-base text-muted-foreground">
                        {stat2.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Learn More Button */}
            {button?.href && (
              <div className="mt-8">
                <Button variant="outline" size="sm" asChild className="font-semibold">
                  <Link href={button.href}> 
                    {button.text} <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}

          </div>
          {image?.src && (
            <div className="order-1 md:order-2 flex justify-center">
              <Image
                src={image.src}
                alt={image.alt || ''} // Provide empty string default for alt
                width={450} // Keep explicit width/height or make them props too?
                height={320}
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
