'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import * as Icons from '@/components/ui/animated-icons';

// Common props interface for the animated icons
interface AnimatedIconProps {
  size?: number;
  className?: string;
  // Add other common props if necessary
}

// Map string names to actual icon components, typed with common props
const iconComponentMap: { [key: string]: React.ComponentType<AnimatedIconProps> } = {
  UserIcon: Icons.UserIcon,
  UserRoundCheckIcon: Icons.UserRoundCheckIcon,
  CalendarDaysIcon: Icons.CalendarDaysIcon,
  CalendarCheckIcon: Icons.CalendarCheckIcon,
  FileTextIcon: Icons.FileTextIcon,
  FileCheckIcon: Icons.FileCheckIcon,
  CircleDollarSignIcon: Icons.CircleDollarSignIcon,
  ShieldCheckIcon: Icons.ShieldCheckIcon,
};

export interface Step {
  id: string;
  title: string;
  initialIcon: keyof typeof iconComponentMap; // Use keys for type safety
  completedIcon: keyof typeof iconComponentMap;
}

interface AnimatedStepperProps {
  steps: Step[];
  currentStep: number; // 0-based index
  className?: string;
}

const AnimatedStepper: React.FC<AnimatedStepperProps> = ({ 
  steps, 
  currentStep, 
  className 
}) => {

  return (
    <div className={cn("flex items-start w-full px-4 py-8", className)}>
      <ol className="flex items-start w-full max-w-3xl mx-auto">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isLastStep = index === steps.length - 1;

          const InitialIcon = iconComponentMap[step.initialIcon];
          const CompletedIcon = iconComponentMap[step.completedIcon];

          return (
            <li key={step.id} className={cn("relative flex w-full items-start", !isLastStep && "flex-1")} >
              <div className="flex flex-col items-center gap-1 shrink-0">
                {/* Icon Container */}
                <motion.div
                  initial={false}
                  animate={isActive ? "active" : isCompleted ? "completed" : "inactive"}
                  variants={{
                    inactive: { scale: 0.9, opacity: 0.6 },
                    active: { scale: 1.1, opacity: 1 },
                    completed: { scale: 1, opacity: 1 },
                  }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 font-medium",
                    isActive ? "border-primary bg-primary/10" : 
                    isCompleted ? "border-green-500 bg-green-500/10" : 
                    "border-gray-300 bg-gray-50"
                  )}
                >
                   <AnimatePresence initial={false} mode="wait">
                     <motion.div
                       key={isCompleted ? 'completed' : 'initial'} // Key change triggers animation
                       initial={{ opacity: 0, scale: 0.5 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0, scale: 0.5 }}
                       transition={{ duration: 0.2 }}
                     >
                       {isCompleted ? 
                         <CompletedIcon size={24} className="text-green-600" /> : 
                         <InitialIcon size={24} className={isActive ? "text-primary" : "text-gray-500"} />
                       }
                     </motion.div>
                   </AnimatePresence>
                </motion.div>
                {/* Step Title */}
                <p className={cn(
                  "text-xs sm:text-sm font-medium text-center mt-1 w-20 break-words",
                  isActive ? "text-primary" :
                  isCompleted ? "text-green-600" :
                  "text-gray-500"
                )}>
                  {step.title}
                </p>
              </div>

              {/* Connecting Line */}
              {!isLastStep && (
                <div className="flex-1 h-12 flex items-center px-2 sm:px-4">
                  <div className="relative w-full h-[2px] bg-gray-200">
                     <motion.div 
                       className="absolute top-0 left-0 h-full bg-primary"
                       initial={{ scaleX: 0 }}
                       animate={{ scaleX: isCompleted || isActive ? 1 : 0 }}
                       transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
                       style={{ originX: 0 }}
                     />
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default AnimatedStepper;
