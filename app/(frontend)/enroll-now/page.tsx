"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  UserIcon,
  CheckCircle2,
  Calendar,
  CalendarCheck,
  FileText,
  FileCheck,
  CircleDollarSign,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"
import { AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import AnimatedStepper from "@/components/AnimatedStepper";
import WelcomeSection from "@/blocks/EnrollForm/Welcome";
import PersonalInfoStep from "@/blocks/EnrollForm/PersonalInfoStep";
import PaymentStep from "@/blocks/EnrollForm/PaymentStep";
import SchedulingSection from "@/blocks/EnrollForm/SchedulingSection";
import ConsentFormStep from "@/blocks/EnrollForm/ConsentFormStep";
import SuccessStep from "@/blocks/EnrollForm/SuccessStep";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  enrollmentFormSchema,
  EnrollmentFormData,
  PaymentOption
} from "@/lib/form-types";
import StepAnimationWrapper from "@/components/StepAnimationWrapper";

const LOCAL_STORAGE_KEY = 'threeTreesEnrollmentFormData';
const STEP_ID_WELCOME = "welcome";
const STEP_ID_SUCCESS = "success";

const getInitialFormValues = (): EnrollmentFormData => {
  if (typeof window !== 'undefined') {
    try {
      const savedData = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Robust check for localStorage data structure
        if (typeof parsedData === 'object' && parsedData !== null &&
          'personalInfo' in parsedData &&
          'payment' in parsedData
          // Add check for scheduling, provide default if missing from old localStorage
        ) {
          const validatedPaymentData = {
            paymentOption: parsedData.payment.paymentOption || "full-program",
            agreeToRecurring: parsedData.payment.agreeToRecurring || false,
          };
          const validatedSchedulingData = {
            selectedClassSlotId: parsedData.scheduling?.selectedClassSlotId || "",
          };
          // Reconstruct ensuring all top-level keys of EnrollmentFormData are present
          return {
            personalInfo: parsedData.personalInfo, // Assume this is valid or has defaults in its own schema
            scheduling: validatedSchedulingData,
            documents: parsedData.documents || { agreedToTerms: false, signature: "" }, // Provide default for documents
            payment: validatedPaymentData,
          } as EnrollmentFormData; // Cast, relying on Zod resolver for final validation
        }
      }
    } catch (error) {
      console.error("Error loading RHF defaultValues from localStorage:", error);
    }
  }
  // Fallback default values
  return {
    personalInfo: {
      firstName: "", lastName: "", city: "", county: "",
      referralSource: "", countyOther: "", referralSourceOther: "",
      whyReferred: "",
      selectedProgram: "",
    },
    scheduling: { selectedClassSlotId: "" },
    documents: { agreedToTerms: false, signature: "" },
    payment: {
      paymentOption: "full_program" as PaymentOption,
      agreeToRecurring: false
    },
  };
};

export default function EnrollmentForm() {
  const methods = useForm<EnrollmentFormData>({
    resolver: zodResolver(enrollmentFormSchema),
    defaultValues: getInitialFormValues(),
    mode: "onChange",
  });

  // Effect to save RHF form data to localStorage
  useEffect(() => {
    const subscription = methods.watch((value) => {
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
          // If you need to keep the old `formData` state in sync during transition:
          // setFormData(value as any); // This can be risky due to potential type mismatches
        } catch (error) {
          console.error("Error saving RHF form data to localStorage:", error);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const [currentStep, setCurrentStep] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Reorder enrollmentSteps: Payment is now last before Success
  const enrollmentSteps = [
    { id: "personal-info", title: "Personal Information", initialIcon: UserIcon, completedIcon: CheckCircle2 },
    { id: "scheduling", title: "Schedule Your Sessions", initialIcon: Calendar, completedIcon: CalendarCheck },
    { id: "documents", title: "Review Your Consent Form", initialIcon: FileText, completedIcon: FileCheck },
    { id: "payment", title: "Complete Payment", initialIcon: CircleDollarSign, completedIcon: ShieldCheck },
  ];

  // Reorder stepComponents accordingly
  const stepComponents = [
    <WelcomeSection key="welcome" steps={enrollmentSteps} />,
    <PersonalInfoStep key="personal" />,
    <SchedulingSection key="scheduling" />,
    <ConsentFormStep key="documents" />,
    <PaymentStep key="payment" />,
    <SuccessStep key="success" />,
  ];

  const watchedPersonalInfo = methods.watch("personalInfo");
  const watchedScheduling = methods.watch("scheduling");
  const watchedDocuments = methods.watch("documents");
  const watchedPaymentInfo = methods.watch("payment");

  const isStepComplete = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0: return true; // Welcome
      case 1: { // PersonalInfoStep 
        const pi = watchedPersonalInfo;
        if (!pi) return false;
        const baseComplete = !!(pi.firstName && pi.lastName && pi.city && pi.whyReferred && pi.selectedProgram);
        if (!baseComplete) return false;
        const countySelected = !!pi.county;
        if (!countySelected) return false;
        if (pi.county === 'Other' && !pi.countyOther) return false;
        const referralSelected = !!pi.referralSource;
        if (!referralSelected) return false;
        if (pi.referralSource === 'Other' && !pi.referralSourceOther) return false;
        return true;
      }
      case 2: { // SchedulingSection
        const sched = watchedScheduling;
        // console.log(`Step 2 (Scheduling) Check: watchedScheduling =`, sched);
        // console.log(`Step 2: sched && sched.selectedClassSlotId =`, sched && sched.selectedClassSlotId);
        const isComplete = !!(sched && sched.selectedClassSlotId);
        // console.log(`Step 2: isComplete =`, isComplete);
        return isComplete;
      }
      case 3: { // ConsentFormStep
        const docs = watchedDocuments;
        return !!(docs && docs.agreedToTerms);
      }
      case 4: { // PaymentStep - Updated logic
        const payment = watchedPaymentInfo;
        if (!payment || !payment.paymentOption) return false; // Must select an option

        // If autopay_weekly is selected, consent is required
        if (payment.paymentOption === 'autopay_weekly' && !payment.agreeToRecurring) return false;

        // For pay_as_you_go and full_program, consent is not strictly required by this check
        // (though Zod schema ensures agreeToRecurring is false if not autopay_weekly for data integrity)
        return true;
      }
      default: return false;
    }
  };

  const canProceed = isStepComplete(currentStep);
  // console.log(`Current Step: ${currentStep}, Can Proceed: ${canProceed}, Watched Scheduling:`, watchedScheduling);

  // Helper to get step ID/hash for a given index
  const getStepIdForIndex = (index: number): string | undefined => {
    if (index === 0) return STEP_ID_WELCOME;
    if (index === stepComponents.length - 1) return STEP_ID_SUCCESS;
    // For steps in between, use the ID from enrollmentSteps (adjusting index)
    // enrollmentSteps maps to stepComponents[1] through stepComponents[length-2]
    const mappedIndex = index - 1;
    if (mappedIndex >= 0 && mappedIndex < enrollmentSteps.length) {
      return enrollmentSteps[mappedIndex].id;
    }
    return undefined;
  };

  // Helper to get step index for a given ID/hash
  const getIndexForStepId = (id: string): number | undefined => {
    if (id === STEP_ID_WELCOME) return 0;
    if (id === STEP_ID_SUCCESS) return stepComponents.length - 1;
    const mappedIndex = enrollmentSteps.findIndex(step => step.id === id);
    if (mappedIndex !== -1) return mappedIndex + 1; // Adjust back to stepComponents index
    return undefined;
  };

  // Handle initial load from URL hash and browser history navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const hash = window.location.hash.substring(1); // Remove #
      let targetStep = 0; // Default to first step
      if (event.state && typeof event.state.step === 'number') {
        targetStep = event.state.step;
      } else if (hash) {
        const indexFromHash = getIndexForStepId(hash);
        if (indexFromHash !== undefined) {
          targetStep = indexFromHash;
        }
      }
      setCurrentStep(targetStep);
    };

    // Initial load: set step based on hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
      const indexFromHash = getIndexForStepId(initialHash);
      if (indexFromHash !== undefined) {
        setCurrentStep(indexFromHash);
      } else {
        // If hash is invalid, push default state (welcome step) to history
        const defaultStepId = getStepIdForIndex(0);
        if (defaultStepId) {
          window.history.replaceState({ step: 0, id: defaultStepId }, "", `#${defaultStepId}`);
        }
      }
    } else {
      // No hash, ensure history state is set for the initial step (Welcome)
      const defaultStepId = getStepIdForIndex(0);
      if (defaultStepId) {
        window.history.replaceState({ step: 0, id: defaultStepId }, "", `#${defaultStepId}`);
      }
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []); // Run only on mount and unmount

  const goToNextStep = async () => {
    let canProceedValidation = true;
    switch (currentStep) {
      case 1: // PersonalInfo
        canProceedValidation = await methods.trigger("personalInfo");
        break;
      case 2: // Scheduling
        canProceedValidation = await methods.trigger("scheduling");
        break;
      case 3: // Documents
        canProceedValidation = await methods.trigger("documents");
        break;
      case 4: // Payment
        canProceedValidation = await methods.trigger("payment");
        break;
      default: break;
    }

    if (canProceedValidation) {
      const nextStep = Math.min(currentStep + 1, stepComponents.length - 1);
      const stepId = getStepIdForIndex(nextStep);
      setCurrentStep(nextStep);
      if (stepId) {
        window.history.pushState({ step: nextStep, id: stepId }, "", `#${stepId}`);
      }
    } else {
      console.log("Validation errors:", methods.formState.errors);
    }
  };

  const goToPreviousStep = () => {
    const prevStep = Math.max(currentStep - 1, 0);
    const stepId = getStepIdForIndex(prevStep);
    setCurrentStep(prevStep);
    if (stepId) {
      window.history.pushState({ step: prevStep, id: stepId }, "", `#${stepId}`);
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }
  }, [currentStep]);

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === stepComponents.length - 1
  const isSuccessStep = currentStep === stepComponents.length - 1

  let stepperIndex = -1;
  if (currentStep >= 1 && currentStep <= 4) {
    stepperIndex = currentStep - 1;
  } else if (currentStep > 4) {
    stepperIndex = enrollmentSteps.length - 1;
  }

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col min-h-screen bg-muted">
        <main className="flex-1 py-4 flex flex-col" ref={contentRef}>
          {/* Full-width stepper without card wrapper */}
          {currentStep > 0 && currentStep < stepComponents.length - 1 && (
            <div className="mb-4 container mx-auto">
              {/* Pass the calculated stepperIndex */}
              <AnimatedStepper steps={enrollmentSteps} currentStep={stepperIndex} />
            </div>
          )}

          {/* Content area - simplified width */}
          <div className="flex-1 flex justify-center container mx-auto px-4">
            <AnimatePresence mode="wait">
              <StepAnimationWrapper customKey={currentStep}>
                <div className="w-full max-w-md mx-auto">
                  {stepComponents[currentStep]}
                </div>
              </StepAnimationWrapper>
            </AnimatePresence>
          </div>

          {/* Navigation buttons - also apply consistent max-width if desired */}
          {!isSuccessStep && (
            <div className="container mx-auto max-w-lg mt-auto p-4">
              <div className={isFirstStep ? "flex justify-center" : "flex items-center justify-between"}>
                {!isFirstStep ? (
                  <Button onClick={goToPreviousStep} variant="outline" className="mr-2">
                    <ArrowLeft size={16} className="mr-2" /> Back
                  </Button>
                ) : (
                  <div></div> /* Placeholder to keep Continue button centered/right */
                )}

                <Button
                  onClick={goToNextStep}
                  size={isFirstStep ? "lg" : "default"}
                  className={`${isFirstStep ? "px-8 py-2 h-auto text-base" : "w-auto"} ${!canProceed && !isFirstStep ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  disabled={!canProceed && !isFirstStep} // Disable if step not complete (and not first step)
                >
                  {isFirstStep ? "Start Enrollment" : "Continue"}
                  {!isLastStep && <ArrowRight size={16} className="ml-2" />}
                </Button>
              </div>
            </div>
          )}
        </main>

        <footer className="bg-background border-t py-3 sm:py-4">
          <div className="container mx-auto text-sm text-muted-foreground flex flex-col items-center justify-between gap-y-2">
            <span>© {new Date().getFullYear()} Three Trees. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </FormProvider>
  )
}
