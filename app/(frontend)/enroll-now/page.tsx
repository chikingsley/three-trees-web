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
  Loader2 as SpinnerIcon,
} from "lucide-react"
import { AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import AnimatedStepper from "@/components/AnimatedStepper";
import WelcomeSection from "@/blocks/EnrollForm/Welcome";
import ContactInfoStep from "@/blocks/EnrollForm/ContactInfoStep";
import ProgramInfoStep from "@/blocks/EnrollForm/ProgramInfoStep";
import PaymentStep from "@/blocks/EnrollForm/PaymentStep";
import SchedulingSection from "@/blocks/EnrollForm/SchedulingSection";
import ConsentFormStep from "@/blocks/EnrollForm/ConsentFormStep";
import SuccessStep from "@/blocks/EnrollForm/SuccessStep";
import { useForm, FormProvider, Path } from "react-hook-form";
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
        if (typeof parsedData === 'object' && parsedData !== null &&
          'personalInfo' in parsedData &&
          'payment' in parsedData
        ) {
          const validatedPaymentData = {
            paymentOption: parsedData.payment.paymentOption || "full_program",
            agreeToRecurring: parsedData.payment.agreeToRecurring || false,
          };
          const validatedSchedulingData = {
            selectedClassId: parsedData.scheduling?.selectedClassId || "",
          };
          // Ensure all fields, including new ones, are properly defaulted or loaded
          const defaultPersonalInfo = {
            firstName: "", lastName: "", email: "", phone: "",
            city: "", state: "", zipcode: "",
            sex: "Male",
            county: "", countyOther: "",
            consentToContact: false,
            referralSource: "", referralSourceOther: "",
            whyReferred: "",
            selectedProgram: "",
          };
          const loadedPersonalInfo = { ...defaultPersonalInfo, ...(parsedData.personalInfo || {}) };

          return {
            personalInfo: loadedPersonalInfo,
            scheduling: validatedSchedulingData,
            documents: parsedData.documents || { agreedToTerms: false, signature: "" },
            payment: validatedPaymentData,
          } as EnrollmentFormData;
        }
      }
    } catch (error) {
      console.error("Error loading RHF defaultValues from localStorage:", error);
    }
  }
  // Fallback default values
  return {
    personalInfo: {
      firstName: "", lastName: "", email: "", phone: "",
      city: "", state: "", zipcode: "",
      sex: "Male",
      county: "", countyOther: "",
      consentToContact: false,
      referralSource: "", referralSourceOther: "",
      whyReferred: "",
      selectedProgram: "",
    },
    scheduling: { selectedClassId: "" },
    documents: { agreedToTerms: false, signature: "" },
    payment: {
      paymentOption: "full_program" as PaymentOption,
      agreeToRecurring: false
    },
  };
};

export default function EnrollmentForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [enrollmentToken, setEnrollmentToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

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

  const enrollmentSteps = [
    { id: "contact-info", title: "Contact Information", initialIcon: UserIcon, completedIcon: CheckCircle2 },
    { id: "program-info", title: "Program Information", initialIcon: UserIcon, completedIcon: CheckCircle2 },
    { id: "scheduling", title: "Schedule Your Sessions", initialIcon: Calendar, completedIcon: CalendarCheck },
    { id: "documents", title: "Review Your Consent Form", initialIcon: FileText, completedIcon: FileCheck },
    { id: "payment", title: "Complete Payment", initialIcon: CircleDollarSign, completedIcon: ShieldCheck },
  ];

  const stepComponents = [
    <WelcomeSection key="welcome" steps={enrollmentSteps} />,
    <ContactInfoStep key="contact" />,
    <ProgramInfoStep key="program" />,
    <SchedulingSection key="scheduling" />,
    <ConsentFormStep key="documents" />,
    <PaymentStep key="payment" />,
    <SuccessStep key="success" />,
  ];

  const watchedPersonalInfo = methods.watch("personalInfo");
  const watchedScheduling = methods.watch("scheduling");
  const watchedDocuments = methods.watch("documents");
  const watchedPaymentInfo = methods.watch("payment");

  // Updated isStepComplete logic for new steps
  const isStepComplete = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0: return true; // Welcome
      case 1: { // ContactInfoStep
        const pi = watchedPersonalInfo;
        if (!pi) return false;
        // Removed county and countyOther checks from here
        return !!(pi.firstName && pi.lastName && pi.email && pi.phone && pi.city && pi.state && pi.zipcode && pi.sex && pi.consentToContact);
      }
      case 2: { // ProgramInfoStep
        const pi = watchedPersonalInfo;
        if (!pi) return false;
        // Added county and countyOther checks here
        return !!(pi.referralSource && (pi.referralSource !== 'Other' || pi.referralSourceOther) && pi.selectedProgram && pi.whyReferred && pi.county && (pi.county !== 'Other' || pi.countyOther));
      }
      case 3: { // SchedulingSection (was step 2)
        const sched = watchedScheduling;
        return !!(sched && sched.selectedClassId);
      }
      case 4: { // ConsentFormStep (was step 3)
        const docs = watchedDocuments;
        return !!(docs && docs.agreedToTerms);
      }
      case 5: { // PaymentStep (was step 4)
        const payment = watchedPaymentInfo;
        if (!payment || !payment.paymentOption) return false;
        if (payment.paymentOption === 'autopay_weekly' && !payment.agreeToRecurring) return false;
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
    if (!isStepComplete(currentStep)) {
      // Trigger validation for the current step's fields if needed
      // This depends on how granular you want the validation trigger to be.
      // For example, for step 1 (ContactInfo), trigger validation for personalInfo fields.
      let fieldsToValidate: Path<EnrollmentFormData>[] = [];
      if (currentStep === 1) { // ContactInfo
        fieldsToValidate = Object.keys(methods.getValues('personalInfo')).map(k => `personalInfo.${k}` as Path<EnrollmentFormData>);
      } else if (currentStep === 2) { // ProgramInfo
        fieldsToValidate = ['personalInfo.referralSource', 'personalInfo.referralSourceOther', 'personalInfo.selectedProgram', 'personalInfo.whyReferred', 'personalInfo.county', 'personalInfo.countyOther'];
      } else if (currentStep === 3) { // Scheduling
        fieldsToValidate = ['scheduling.selectedClassId']; // Changed here
      } else if (currentStep === 4) { // Documents
        fieldsToValidate = ['documents.agreedToTerms', 'documents.signature'];
      } else if (currentStep === 5) { // Payment
        fieldsToValidate = ['payment.paymentOption', 'payment.agreeToRecurring'];
      }
      
      const allValid = await methods.trigger(fieldsToValidate.length > 0 ? fieldsToValidate : undefined );
      if (!allValid) return;
    }

    setIsLoading(true);
    let submissionPhase = "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let dataToSend: any = {}; 

    // Determine submission phase and data based on currentStep
    if (currentStep === 0) { // Welcome step, no API call, just advance
        setIsLoading(false);
        const nextStepIndex = currentStep + 1;
        const nextStepId = getStepIdForIndex(nextStepIndex);
        if (nextStepId) {
            window.history.pushState({ step: nextStepIndex, id: nextStepId }, "", `#${nextStepId}`);
        }
        setCurrentStep(nextStepIndex);
        contentRef.current?.scrollTo(0, 0); // Scroll to top
        return;
    }
    if (currentStep === 1) { // ContactInfoStep
      submissionPhase = "contactInfo";
      dataToSend = { personalInfo: watchedPersonalInfo };
    } else if (currentStep === 2) { // ProgramInfoStep
      submissionPhase = "programInfo";
      dataToSend = { personalInfo: watchedPersonalInfo }; 
    } else if (currentStep === 3) { // SchedulingSection
      submissionPhase = "scheduling";
      dataToSend = { scheduling: { selectedClassId: watchedScheduling.selectedClassId } }; // Changed here
    } else if (currentStep === 4) { // ConsentFormStep
      submissionPhase = "consent";
      dataToSend = { documents: watchedDocuments };
    } else if (currentStep === 5) { // PaymentStep - this is the final step before success view
      submissionPhase = "final";
      // For the final step, send all form data according to EnrollmentFormData structure
      dataToSend = { ...methods.getValues() }; // Send all form data
    }

    if (!submissionPhase) {
      setIsLoading(false);
      console.error("Invalid step or submissionPhase not set.");
      // Optionally, show an error to the user
      return;
    }

    try {
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (enrollmentToken && submissionPhase !== 'contactInfo') {
        headers['Authorization'] = `Bearer ${enrollmentToken}`;
      }

      const response = await fetch("/api/enroll", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ submissionPhase, ...dataToSend }),
      });

      const result = await response.json();
      setIsLoading(false);

      if (!response.ok) {
        console.error("API Error:", result);
        // Handle specific errors, e.g., token expiration
        if (response.status === 401 && result.error?.includes("token")) {
            // Token issue, perhaps clear token and redirect to contact info or show message
            setEnrollmentToken(null);
            // Optionally, force user back to contact info step or show a specific message
            // setCurrentStep(getIndexForStepId('contact-info') || 1);
            alert("Your session has expired or is invalid. Please start over from the contact information step if issues persist.");
        } else {
            alert(`Error: ${result.error || 'An unknown error occurred.'}`);
        }
        return; // Stop processing on error
      }

      // Store token from contactInfo response
      if (submissionPhase === "contactInfo" && result.enrollmentToken) {
        setEnrollmentToken(result.enrollmentToken);
      }
      
      // If this was the last actual data submission step (Payment / step 5)
      // and it was successful, advance to the SuccessStep (index 6)
      const nextStepIndex = currentStep === 5 ? currentStep + 1 : currentStep + 1;
      const nextStepId = getStepIdForIndex(nextStepIndex);
      if (nextStepId) {
        window.history.pushState({ step: nextStepIndex, id: nextStepId }, "", `#${nextStepId}`);
      }
      setCurrentStep(nextStepIndex);
      contentRef.current?.scrollTo(0, 0); // Scroll to top

    } catch (error) {
      setIsLoading(false);
      console.error("Network or other error:", error);
      alert("An unexpected error occurred. Please try again.");
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
  if (currentStep >= 1 && currentStep <= enrollmentSteps.length) {
    stepperIndex = currentStep - 1;
  } else if (currentStep > enrollmentSteps.length) {
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
                  disabled={(!canProceed && !isFirstStep) || isLoading}
                >
                  {isLoading ? (
                    <>
                      <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                      {isFirstStep ? "Processing..." : "Saving..."}
                    </>
                  ) : (
                    <>
                      {isFirstStep ? "Start Enrollment" : "Continue"}
                      {!isLastStep && <ArrowRight size={16} className="ml-2" />}
                    </>
                  )}
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
