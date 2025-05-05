import { CheckCircle, Clock, FileText, Heart, LucideIcon } from "lucide-react";

// --- Type Definitions ---

// Map icon names to Lucide components
const iconMap: { [key: string]: LucideIcon } = {
  CheckCircle,
  Clock,
  FileText,
  Heart
};

// Structure for a single feature item
interface FeatureItem {
  iconName: keyof typeof iconMap;
  title: string;
  description: string;
}

// Props for the main component
interface WhyChooseSectionProps {
  id?: string; // Allow passing an ID for anchor links
  title?: string;
  subtitle?: string;
  features?: FeatureItem[];
}

// --- Default Values ---
const defaultProps: Required<WhyChooseSectionProps> = {
  id: "why-choose-section",
  title: "Why Choose Three Trees",
  subtitle: "We combine evidence-based approaches with compassionate service to create lasting positive change in our participants' lives.",
  features: [
    {
      iconName: 'CheckCircle',
      title: "Proven",
      description: "95% of our graduates have no new legal issues three years post‑completion",
    },
    {
      iconName: 'Clock',
      title: "Flexible",
      description: "Weekday, evening, weekend, and fully online options mirror your schedule",
    },
    {
      iconName: 'FileText',
      title: "Transparent",
      description: "Referral sources receive weekly progress reports—no more guess‑work",
    },
    {
      iconName: 'Heart',
      title: "No-Hassle",
      description: "Five-minute online enrollment, online scheduling, and no hidden fees",
    },
  ]
};

const WhyChooseSection = (props: WhyChooseSectionProps) => {
  // Merge props with defaults
  const { id, title, subtitle, features } = { ...defaultProps, ...props };
  const iconClass = "h-6 w-6 text-primary"; // Keep icon class consistent

  return (
    <section id={id} className="py-8 md:py-12 lg:py-20 bg-sand-50">
      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-screen-lg">
        {/* Decorative Line */} 
        <div className="h-0 w-20 bg-primary mx-auto mb-6"></div>
        
        <div className="text-center mb-8 md:mb-12">
          {/* Title */}
          {title && (
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-black mb-6">
              {title}
          </h2>
          )}
          {/* Subtitle */}
          {subtitle && (
          <p className="text-md md:text-lg text-black max-w-2xl mx-auto mb-6">
              {subtitle}
          </p>
          )}
          {/* Decorative Line */} 
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.iconName];
            if (!IconComponent) return null; // Skip if icon name is invalid

            return (
            <div
              key={index}
              className="bg-background rounded-lg p-6 shadow-sm border border-gray-200/50 hover:border-black/20 hover:shadow-md transition-all h-full"
            >
              <div className="flex items-center mb-3">
                <div className="mr-3">
                    <IconComponent className={iconClass} />
                </div>
                <h3 className="text-lg font-semibold text-black">
                  {feature.title}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm md:text-md">
                {feature.description}
              </p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
