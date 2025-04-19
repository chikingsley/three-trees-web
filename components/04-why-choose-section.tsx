import { CheckCircle, Clock, FileText, Heart } from "lucide-react";

const WhyChooseSection = () => {
  const iconClass = "h-6 w-6 text-primary";

  const features = [
    {
      icon: <CheckCircle className={iconClass} />,
      title: "Proven",
      description: "95% of our graduates have no new legal issues three years post‑completion",
    },
    {
      icon: <Clock className={iconClass} />,
      title: "Flexible",
      description: "Weekday, evening, weekend, and fully online options mirror your schedule",
    },
    {
      icon: <FileText className={iconClass} />,
      title: "Transparent",
      description: "Referral sources receive weekly progress reports—no more guess‑work",
    },
    {
      icon: <Heart className={iconClass} />,
      title: "Trauma‑informed",
      description: "Our CBI model pairs the principles of CBT with mindfulness for deeper, lasting change",
    },
  ];

  return (
    <section className="py-8 md:py-12 lg:py-20 bg-sand-50">
      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-screen-lg">
        <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-black mb-6">
            Why Choose Three Trees
          </h2>
          <p className="text-lg text-black max-w-2xl mx-auto mb-6">
            We combine evidence-based approaches with compassionate service to create lasting positive change in our participants&apos; lives.
          </p>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background rounded-lg p-6 shadow-sm border border-gray-200/50 hover:border-black/20 hover:shadow-md transition-all h-full"
            >
              <div className="flex items-center mb-3">
                <div className="mr-3">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-black">
                  {feature.title}
                </h3>
              </div>
              <p className="text-muted-foreground text-md">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
