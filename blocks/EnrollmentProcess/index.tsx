import Image from "next/image";

// --- Type Definitions ---
interface EnrollmentStep {
  title: string;
  description: string;
}

interface ImageInfo {
  src?: string;
  alt?: string;
}

interface EnrollmentTimelineProps {
  id?: string;
  title?: string;
  steps?: EnrollmentStep[];
  image?: ImageInfo;
}

// --- Default Values ---
const defaultProps: Required<EnrollmentTimelineProps> = {
  id: "enroll",
  title: "Enrollment Process",
  steps: [
  {
    title: "Choose Your Program",
    description:
      "Select the program that matches your needs or court requirements.",
  },
  {
    title: "Complete Registration",
    description:
      "Fill out our simple enrollment form with your personal information and program details.",
  },
  {
    title: "Payment",
    description:
      "Pay for your program using our secure payment system. Payment plans available.",
  },
  {
    title: "Receive Confirmation",
    description:
      "Get your enrollment confirmation and program details via email.",
  },
  {
    title: "Begin Your Program",
    description:
      "Start your program according to the schedule provided in your confirmation.",
  }
  ],
  image: {
    src: "/images/enrollment.jpg",
    alt: "Woman enrolling in online class"
  }
};

export default function EnrollmentTimeline(props: EnrollmentTimelineProps) {
  // Merge props with defaults
  const { id, title, steps, image } = { 
    ...defaultProps, 
    ...props, 
    image: { ...defaultProps.image, ...props.image } 
  };

  // Ensure steps is always an array
  const finalSteps = steps || [];

  return (
    <section className="py-8 bg-gray-100" id={id}>
      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-screen-lg">
        <div className="text-center mb-8 md:mb-12">
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          {title && (
          <h2 className="text-3xl font-semibold tracking-tight text-evergreen-900 mb-6">
              {title}
          </h2>
          )}
          <div className="h-1 w-20 bg-primary mx-auto mb-12"></div>
        </div>
        <div className="flex flex-row items-start gap-4 sm:gap-6 lg:gap-12">
          {/* Image */}
          {image?.src && (
          <div className="w-1/3 sm:w-2/5 md:w-1/2 flex justify-center order-1">
            <div className="rounded-lg shadow-md overflow-hidden relative bg-gray-100" style={{ width: '100%', maxWidth: '320px', height: '400px' }}>
              <Image
                  src={image.src}
                  alt={image.alt || ''} // Default alt
                fill
                sizes="(max-width: 768px) 70vw, 320px"
                className="object-cover"
                style={{ objectPosition: 'center center', transform: 'scale(1.2)' }}
                priority
              />
            </div>
          </div>
          )}

          {/* Timeline */}
          {finalSteps.length > 0 && (
            <div className={`w-2/3 sm:w-3/5 md:w-1/2 order-2 ${!image?.src ? 'w-full md:w-full' : ''}`}> {/* Adjust width if no image */} 
            <div className="relative ml-6">
                {/* Timeline line - adjusted height dynamically */} 
                {finalSteps.length > 1 && (
                   <div 
                     className="absolute left-0 top-0 border-l-2 border-primary/30 z-0" 
                     style={{ bottom: '2.5rem' }} // Adjust based on icon size and last item padding
                   />
                 )}

                {finalSteps.map(({ title, description }, index) => (
                <div key={index} className="relative pl-6 sm:pl-10 pb-6 sm:pb-2 last:pb-0">
                  {/* Timeline Icon */}
                  <div className="absolute left-px -translate-x-1/2 h-6 w-6 sm:h-8 sm:w-8 border-2 border-primary flex items-center justify-center rounded-full bg-white z-10 shadow-sm">
                      {index === finalSteps.length - 1 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="font-semibold text-sm sm:text-base text-primary">{index + 1}</span>
                    )}
                  </div>
                  {/* Content */}
                  <div className="pt-0 space-y-1 sm:space-y-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-evergreen-900">{title}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}
        </div>
      </div>
    </section>
  );
}
