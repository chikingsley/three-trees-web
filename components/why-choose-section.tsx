import { CheckCircle, Clock, FileText, Heart } from "lucide-react";

const WhyChooseSection = () => {
  const features = [
    {
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      title: "Proven",
      description: "95% of our graduates have no new legal issues three years post‑completion",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Flexible",
      description: "Weekday, evening, weekend, and fully online options mirror your schedule",
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Transparent",
      description: "Referral sources receive weekly progress reports—no more guess‑work",
    },
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      title: "Trauma‑informed",
      description: "Our CBI model pairs the principles of CBT with mindfulness for deeper, lasting change",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Why Choose Three Trees
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine evidence-based approaches with compassionate service to create lasting positive change in our participants&apos; lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-background rounded-lg p-6 shadow-sm border border-border/50 hover:border-primary/20 hover:shadow-md transition-all"
            >
              <div className="mb-4 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-center">
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
