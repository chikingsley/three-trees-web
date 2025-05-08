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
    <div className="pt-6 flex flex-col flex-1 items-center justify-center">
      {/* Header Section */}
      <div className="text-center mx-auto">
        <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-5 text-primary">Welcome to Three Trees</h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Complete your enrollment in
        </p>
        <p className="text-lg md:text-xl text-muted-foreground">
          <span className="font-medium text-primary">less than 2 minutes</span>
        </p>
      </div>

      {/* Separator */}
      <div className="w-[100px] mx-auto my-6 md:mb-8">
        <div className="h-px bg-primary"></div>
      </div>

      {/* Steps Section */}
      <div className="space-y-4 text-left mb-2 mx-auto w-[280px] md:w-[320px]">
        {steps.map((step, idx) => {
          const Icon = step.initialIcon; // Use initialIcon from the passed steps
          return (
            <div key={idx} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-sm md:text-base">{step.title}</h3>
              </div>
              <div className="bg-primary/10 rounded-full shrink-0 flex items-center justify-center">
                <div className="md:hidden p-2"><Icon size={18} className="text-primary" /></div>
                <div className="hidden md:block p-2"><Icon size={20} className="text-primary" /></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WelcomeSection; 