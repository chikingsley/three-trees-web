"use client"

import React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import type { EnrollmentFormData } from "@/lib/form-types";
import { CLASS_SCHEDULE_DATA } from "@/lib/form-types";
import { MailCheck, CalendarCheck, ClipboardCheck } from "lucide-react";

// SuccessStepFormData interface removed
// SuccessStepProps interface removed

const SuccessStep: React.FC = () => {
  const { getValues } = useFormContext<EnrollmentFormData>();
  const RHFformData = getValues(); // Get current RHF form values

  const firstName = RHFformData.personalInfo?.firstName;
  const selectedSlotId = RHFformData.scheduling?.selectedClassSlotId;

  let dayTimeDisplay = "";
  if (selectedSlotId) {
    const selectedSlot = CLASS_SCHEDULE_DATA.find(slot => slot.id === selectedSlotId);
    if (selectedSlot) {
      dayTimeDisplay = `on ${selectedSlot.day} at ${selectedSlot.time.split(" - ")[0]}`;
    }
  }

  // Data for the next steps section
  const nextStepsData = [
    {
      icon: MailCheck,
      text: "Check your email for program details and materials."
    },
    {
      icon: CalendarCheck,
      text: `Attend your first session ${dayTimeDisplay}.`
    },
    {
      icon: ClipboardCheck, 
      text: "Complete any pre-session assignments if provided."
    }
  ];

  return (
    <div className="text-center pt-6">
      <h2 className="text-xl font-bold mb-2 text-primary">Enrollment Complete!</h2>
      <p className="text-xs text-muted-foreground mb-4">
        Thank you for completing your enrollment
        {firstName ? `, ${firstName}` : ""}. We&apos;ve sent a confirmation
        email with all the details.
      </p>
      
      {/* Next Steps - Styled like WelcomeSection items */}
      <div className="text-left text-sm space-y-3 px-2 py-4 mb-6">
        <h3 className="font-semibold text-base text-primary mb-2">Your Next Steps:</h3>
        {/* Removed ul, now using divs similar to WelcomeSection */}
        <div className="space-y-3">
          {nextStepsData.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div key={idx} className="flex items-start">
                <div className="bg-primary/10 p-1.5 rounded-full mr-3 shrink-0 flex items-center justify-center">
                  <IconComponent size={16} className="text-primary" /> {/* Smaller icon for this context */}
                </div>
                <div className="text-xs text-muted-foreground">
                  {step.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Button className="bg-primary text-primary-foreground px-6 py-2 text-sm h-auto">Go to Your Dashboard</Button>
    </div>
  );
};

export default SuccessStep; 