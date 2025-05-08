"use client"

import type React from "react"

// Define the type for individual steps based on the structure of enrollmentSteps
interface EnrollmentStep {
  id: string;
  title: string;
  initialIcon: React.ElementType; // Lucide icons are components
  completedIcon: React.ElementType; // Lucide icons are components
}

interface WelcomeSectionProps {
  steps: EnrollmentStep[];
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ steps }) => {
  return (
    <div className="pt-6 md:pt-6 px-6 md:px-8 flex flex-col flex-1 items-center justify-center">
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-10 mx-auto">
        <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-5 text-primary">Welcome to Three Trees</h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Complete your enrollment in
        </p>
        <p className="text-lg md:text-xl text-muted-foreground mb-3">
          <span className="font-medium text-primary">less than 2 minutes</span>
        </p>
      </div>

      {/* Steps Section */}
      <div className="space-y-4 text-left mb-2 max-w-md mx-auto w-full">
        {steps.map((step, idx) => {
          const Icon = step.initialIcon; // Use initialIcon from the passed steps
          return (
            <div key={idx} className="flex items-start">
              <div className="bg-primary/10 p-1.5 md:p-2 rounded-full mr-3 md:mr-4 shrink-0 flex items-center justify-center">
                <div className="md:hidden"><Icon size={18} className="text-primary" /></div>
                <div className="hidden md:block"><Icon size={20} className="text-primary" /></div>
              </div>
              <div>
                <h3 className="font-medium text-sm md:text-base">{step.title}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WelcomeSection; 