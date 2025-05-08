import React from "react";

export interface StepItem {
  id: string;
  title: string;
  initialIcon: React.ComponentType<{ size?: number; className?: string }>;
  completedIcon: React.ComponentType<{ size?: number; className?: string }>;
}

interface AnimatedStepperProps {
  steps: StepItem[];
  currentStep: number;
  className?: string;
}

const AnimatedStepper: React.FC<AnimatedStepperProps> = ({ steps, currentStep, className }) => {
  return (
    <div className={`w-full max-w-3xl mx-auto overflow-x-auto py-2 pb-4 border-b border-gray-300 ${className ?? ""}`}>
      <ol className="flex items-center justify-center min-w-[320px] max-w-[500px] mx-auto">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isLastStep = index === steps.length - 1;

          const InitialIcon = step.initialIcon;
          const CompletedIcon = step.completedIcon;

          return (
            <li key={step.id} className="flex items-center flex-1 relative">
              {/* Connecting Line */}
              {!isLastStep && (
                <div className="absolute top-6 left-1/2 right-0 h-[2px] bg-gray-200 w-full z-0">
                  <div
                    className={`absolute inset-0 h-full bg-green-500 transition-all duration-500 ease-in-out origin-left ${
                      isCompleted ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </div>
              )}

              {/* Icon Container */}
              <div className="flex flex-col items-center w-full relative z-10">
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-sm
                    transition-all duration-300 bg-white
                    ${
                      isActive
                        ? "border-primary bg-primary/10 scale-110"
                        : isCompleted
                          ? "border-green-500 bg-green-50 scale-100"
                          : "border-gray-200 opacity-70 scale-90"
                    }
                  `}
                >
                  {isCompleted ? (
                    <CompletedIcon size={22} className="text-green-600" />
                  ) : (
                    <InitialIcon size={22} className={isActive ? "text-primary" : "text-muted-foreground"} />
                  )}
                </div>

                {/* Step Title */}
                {/* <span
                  className={`
                  text-xs font-medium mt-2 text-center w-full
                  ${isActive ? "text-primary" : isCompleted ? "text-green-600" : "text-muted-foreground"}
                `}
                >
                  {step.title}
                </span> */}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default AnimatedStepper;
