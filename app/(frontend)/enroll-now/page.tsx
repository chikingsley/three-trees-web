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
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import AnimatedStepper from "@/components/AnimatedStepper";
import WelcomeSection from "@/blocks/EnrollForm/Welcome";
import PersonalInfoStep from "@/blocks/EnrollForm/PersonalInfoStep";
import ProgramSelectionStep from "@/blocks/EnrollForm/ProgramSelectionStep";
import PaymentStep, { PaymentData as PaymentStepPaymentData } from "@/blocks/EnrollForm/PaymentStep";
import SchedulingSection, { SchedulingInfo as SchedulingSectionInfo } from "@/blocks/EnrollForm/SchedulingSection";
import ConsentFormStep, { DocumentInfo as ConsentDocumentInfo } from "@/blocks/EnrollForm/ConsentFormStep";
import SuccessStep from "@/blocks/EnrollForm/SuccessStep";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  enrollmentFormSchema, 
  EnrollmentFormData, 
  personalInfoSchema // Keep this if used for old FormData interface 
} from "@/lib/form-types"; // Import from new types file

const PROGRAM_DATA: import('@/blocks/EnrollForm/ProgramSelectionStep').Program[] = [
  {
    id: "dv",
    name: "Domestic Violence",
    duration: "26 weeks",
    description: "For individuals addressing domestic violence issues",
    weeks: 26,
    costPerSession: 35,
    enrollmentFee: 50,
  },
  {
    id: "sort",
    name: "Sex Offender Responsible Thinking",
    duration: "18 months",
    description: "Specialized program for sex offender rehabilitation",
    weeks: 78,
    costPerSession: 40,
    enrollmentFee: 90,
  },
  {
    id: "am",
    name: "Anger Management",
    duration: "12 weeks",
    description: "Learn to manage anger and emotional responses",
    weeks: 12,
    costPerSession: 35,
    enrollmentFee: 50,
  },
  {
    id: "sact",
    name: "Substance Abuse + Critical Thinking",
    duration: "12 weeks",
    description: "Address substance abuse issues with critical thinking skills",
    weeks: 12,
    costPerSession: 35,
    enrollmentFee: 50,
  },
  {
    id: "pp",
    name: "Positive Parenting",
    duration: "12 weeks",
    description: "Develop effective parenting skills and techniques",
    weeks: 12,
    costPerSession: 35,
    enrollmentFee: 50,
  },
]

// The old FormData interface (transitional)
interface FormData {
  personalInfo: import("zod").infer<typeof personalInfoSchema>; // Keep using imported personalInfoSchema for this
  scheduling: SchedulingSectionInfo;
  documents: ConsentDocumentInfo;
  payment: PaymentStepPaymentData;
  selectedPrograms: string[]; // This part of old FormData will be handled by RHF's selectedPrograms
}

const LOCAL_STORAGE_KEY = 'threeTreesEnrollmentFormData';
const STEP_ID_WELCOME = "welcome";
const STEP_ID_SUCCESS = "success";

const getInitialFormValues = (): EnrollmentFormData => {
  if (typeof window !== 'undefined') {
    try {
      const savedData = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Add more robust validation/migration if needed to ensure parsedData matches EnrollmentFormData
        // For now, basic check and trust Zod to validate on interaction
        if (typeof parsedData === 'object' && parsedData !== null && 'personalInfo' in parsedData) {
          return parsedData as EnrollmentFormData;
        }
      }
    } catch (error) {
      console.error("Error loading RHF defaultValues from localStorage:", error);
    }
  }
  return {
    personalInfo: { 
      firstName: "", 
      lastName: "", 
      city: "", 
      county: "", 
      referralSource: "", 
      countyOther: "",
      referralSourceOther: ""
    },
    selectedPrograms: [],
    scheduling: { selectedDay: "", selectedTime: "" },
    documents: { agreedToTerms: false, signature: "" },
    payment: { paymentOption: "full-program", cardNumber: "", expiry: "", cvc: "" },
  };
};

export default function EnrollmentForm() {
  const [formData, setFormData] = useState<FormData>(() => {
    const initialRHFValues = getInitialFormValues();
    // Map/cast RHF values to the old FormData structure for transitional period
    return {
      personalInfo: initialRHFValues.personalInfo,
      scheduling: initialRHFValues.scheduling,
      documents: initialRHFValues.documents,
      payment: initialRHFValues.payment,
      selectedPrograms: initialRHFValues.selectedPrograms,
    } as unknown as FormData; // Needs careful casting or a mapping function
  });

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

  // Old update handlers (kept for non-RHF steps during transition)
  const updateScheduling = (data: Partial<SchedulingSectionInfo>) => {
    setFormData((prev) => ({ ...prev, scheduling: { ...prev.scheduling, ...data } }));
  };
  const updateDocuments = (data: Partial<ConsentDocumentInfo>) => {
    setFormData((prev) => ({ ...prev, documents: { ...prev.documents, ...data } }));
  };
  const updateSelectedPrograms = (programs: string[]) => {
    setFormData((prev) => ({ ...prev, selectedPrograms: programs }));
  };
  // Corrected updatePaymentData to match PaymentStep's expected prop type
  const updatePaymentData = (data: Partial<{ payment: PaymentStepPaymentData }>) => { 
    setFormData((prev) => ({
      ...prev,
      payment: { 
        ...prev.payment, 
        ...(data.payment) // Spread the payment object from the data argument
      }
    }));
  };

  const [currentStep, setCurrentStep] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const enrollmentSteps = [
    {
      id: "personal-info",
      title: "Personal Information",
      initialIcon: UserIcon,
      completedIcon: CheckCircle2,
    },
    {
      id: "program-selection",
      title: "Select Your Program(s)",
      initialIcon: FileText,
      completedIcon: FileCheck,
    },
    {
      id: "scheduling",
      title: "Schedule Your Sessions",
      initialIcon: Calendar,
      completedIcon: CalendarCheck,
    },
    {
      id: "documents",
      title: "Review Your Consent Form",
      initialIcon: FileText,
      completedIcon: FileCheck,
    },
    {
      id: "payment",
      title: "Complete Payment",
      initialIcon: CircleDollarSign,
      completedIcon: ShieldCheck,
    },
  ]

  const stepComponents = [
    <WelcomeSection key="welcome" steps={enrollmentSteps} />,
    <PersonalInfoStep key="personal" />, 
    <ProgramSelectionStep
      key="programs"
      selectedPrograms={formData.selectedPrograms} 
      updateSelectedPrograms={updateSelectedPrograms} 
      programsData={PROGRAM_DATA}
    />,
    <PaymentStep 
      key="payment" 
      formData={formData} 
      updateFormData={updatePaymentData} // Now correctly matches PaymentStep's prop type
      programsData={PROGRAM_DATA} 
    />,
    <SchedulingSection 
      key="scheduling" 
      formData={formData.scheduling} 
      updateFormData={updateScheduling} 
    />,
    <ConsentFormStep 
      key="documents" 
      formData={formData.documents} 
      updateFormData={updateDocuments} 
    />,
    <SuccessStep key="success" formData={formData} />,
  ];

  // --- Watch relevant fields for current step validation --- 
  const watchedPersonalInfo = methods.watch("personalInfo");
  // TODO: Watch fields for other steps as they get refactored
  // const watchedSelectedPrograms = methods.watch("selectedPrograms");
  // const watchedScheduling = methods.watch("scheduling");
  // const watchedDocuments = methods.watch("documents");

  // --- Determine if current step is valid enough to proceed --- 
  const isStepComplete = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0: // Welcome step
        return true;
      case 1: { // PersonalInfoStep - Revised Logic
        const pi = watchedPersonalInfo;
        if (!pi) return false; // Should not happen, but safe check

        const baseComplete = !!(pi.firstName && pi.lastName && pi.city);
        if (!baseComplete) return false;

        const countySelected = !!pi.county; // Is any county option chosen?
        if (!countySelected) return false;
        if (pi.county === 'Other' && !pi.countyOther) return false; // If Other, is countyOther filled?
        
        const referralSelected = !!pi.referralSource; // Is any referral source chosen?
        if (!referralSelected) return false;
        if (pi.referralSource === 'Other' && !pi.referralSourceOther) return false; // If Other, is referralSourceOther filled?
        
        // All checks passed
        return true; 
      }
      // TODO: Add cases for other steps
      // case 2: // ProgramSelectionStep
      //   return watchedSelectedPrograms && watchedSelectedPrograms.length > 0;
      // case 3: // PaymentStep - might always be true if payment is last step before success?
      // case 4: // SchedulingStep
      //   return !!(watchedScheduling?.selectedDay && watchedScheduling?.selectedTime);
      // case 5: // ConsentFormStep
      //   return !!watchedDocuments?.agreedToTerms;
      default:
        return false; // Or true if subsequent steps don't need validation to enable button
    }
  };

  const canProceed = isStepComplete(currentStep);

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
    let canProceed = true;
    // Validate PersonalInfoStep (assuming it's at index 1 of stepComponents)
    if (currentStep === 1) { 
      canProceed = await methods.trigger("personalInfo");
    }
    // TODO: Add validation triggers for other steps as they are refactored
    // e.g., if (currentStep === 2) { canProceed = await methods.trigger("selectedPrograms"); }

    if (canProceed) {
      const nextStep = Math.min(currentStep + 1, stepComponents.length - 1);
      const stepId = getStepIdForIndex(nextStep);
      setCurrentStep(nextStep);
      if (stepId) {
        window.history.pushState({ step: nextStep, id: stepId }, "", `#${stepId}`);
      }
    } else {
      // Optionally, scroll to the first error or give general feedback
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

  // Scroll to top when changing steps
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }
  }, [currentStep]);

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === stepComponents.length - 1
  const isSuccessStep = currentStep === stepComponents.length - 1

  // Calculate which step to highlight in the stepper (welcome and success are not in the stepper)
  const stepperIndex = currentStep === 0 ? 0 : currentStep >= stepComponents.length - 1 ? enrollmentSteps.length - 1 : currentStep - 1

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col min-h-screen bg-muted">
        <main className="flex-1 pt-8 sm:pt-8 pb-4 sm:pb-6 flex flex-col" ref={contentRef}>
          {/* Full-width stepper without card wrapper */}
          {currentStep > 0 && currentStep < stepComponents.length - 1 && (
            <div className="mb-2 sm:mb-4 container mx-auto px-4">
              <AnimatedStepper steps={enrollmentSteps} currentStep={stepperIndex} />
            </div>
          )}

          {/* Content area - removed card wrapper */}
          <div className="flex-1 flex justify-center py-2 sm:py-4 container mx-auto px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="w-full max-w-2xl mx-auto"
              >
                {stepComponents[currentStep]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          {!isSuccessStep && (
            <div className="container mx-auto px-4 max-w-2xl mt-auto pt-4 sm:pt-6 pb-2">
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
                  className={`${isFirstStep ? "px-8 py-2 h-auto text-base" : "w-auto"} ${
                    !canProceed && !isFirstStep ? "opacity-50 cursor-not-allowed" : ""
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
          <div className="container mx-auto px-4 text-xs sm:text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-y-2">
            <span>© {new Date().getFullYear()} Three Trees. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </FormProvider>
  )
}
