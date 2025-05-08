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

interface FormData {
  personalInfo: import('@/blocks/EnrollForm/PersonalInfoStep').PersonalInfo
  scheduling: SchedulingSectionInfo
  documents: ConsentDocumentInfo
  payment: PaymentStepPaymentData
  selectedPrograms: string[]
}

const LOCAL_STORAGE_KEY = 'threeTreesEnrollmentFormData';

// Define step IDs for URL hash (Welcome and Success are special)
const STEP_ID_WELCOME = "welcome";
const STEP_ID_SUCCESS = "success";

export default function EnrollmentForm() {
  const [formData, setFormData] = useState<FormData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedData = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedData) {
          // Basic validation: Check if it's an object and has personalInfo (as a simple check)
          const parsedData = JSON.parse(savedData);
          if (typeof parsedData === 'object' && parsedData !== null && 'personalInfo' in parsedData) {
            return parsedData as FormData; // Assume it matches FormData structure
          }
        }
      } catch (error) {
        console.error("Error loading form data from localStorage:", error);
        // Fallback to default if loading or parsing fails
      }
    }
    // Default initial state if nothing in localStorage or if SSR
    return {
      personalInfo: {
        firstName: "",
        lastName: "",
        city: "",
        county: "",
        referralSource: "",
      },
      scheduling: {
        selectedDay: "",
        selectedTime: "",
      },
      documents: {
        agreedToTerms: false,
        signature: "",
      },
      payment: {
        paymentOption: "full-program", // Default value
        cardNumber: "",
        expiry: "",
        cvc: "",
      },
      selectedPrograms: [],
    };
  });

  // Effect to save formData to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
      } catch (error) {
        console.error("Error saving form data to localStorage:", error);
      }
    }
  }, [formData]);

  // Update form data handlers
  const updatePersonalInfo = (data: Partial<typeof formData.personalInfo>) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...data,
      },
    }))
  }

  const updateScheduling = (data: Partial<typeof formData.scheduling>) => {
    setFormData((prev) => ({
      ...prev,
      scheduling: {
        ...prev.scheduling,
        ...data,
      },
    }))
  }

  const updateDocuments = (data: Partial<typeof formData.documents>) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        ...data,
      },
    }))
  }

  const updateSelectedPrograms = (programs: string[]) => {
    setFormData((prev) => ({
      ...prev,
      selectedPrograms: programs,
    }))
  }

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }))
  }

  const [currentStep, setCurrentStep] = useState(0); // Initial step is 0 (Welcome)
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

  // Array of components for each step with props for form data
  const stepComponents = [
    <WelcomeSection key="welcome" steps={enrollmentSteps} />,
    <PersonalInfoStep key="personal" formData={formData.personalInfo} updateFormData={updatePersonalInfo} />,
    <ProgramSelectionStep
      key="programs"
      selectedPrograms={formData.selectedPrograms}
      updateSelectedPrograms={updateSelectedPrograms}
      programsData={PROGRAM_DATA}
    />,
    <PaymentStep key="payment" formData={formData} updateFormData={updateFormData} programsData={PROGRAM_DATA} />,
    <SchedulingSection key="scheduling" formData={formData.scheduling} updateFormData={updateScheduling} />,
    <ConsentFormStep key="documents" formData={formData.documents} updateFormData={updateDocuments} />,
    <SuccessStep key="success" formData={formData} />,
  ]

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

  const goToNextStep = () => {
    const nextStep = Math.min(currentStep + 1, stepComponents.length - 1);
    const stepId = getStepIdForIndex(nextStep);
    setCurrentStep(nextStep);
    if (stepId) {
      window.history.pushState({ step: nextStep, id: stepId }, "", `#${stepId}`);
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
  const stepperIndex = currentStep === 0 ? 0 : currentStep >= stepComponents.length - 1 ? 4 : currentStep - 1

  return (
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
                <div></div>
              )}

              <Button
                onClick={goToNextStep}
                size={isFirstStep ? "lg" : "default"}
                className={isFirstStep ? "px-8 py-2 h-auto text-base" : "w-auto"}
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
  )
}
