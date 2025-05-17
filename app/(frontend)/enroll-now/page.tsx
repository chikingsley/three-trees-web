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
import type { Program } from "@/payload-types";

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

  // State for fetched full program details
  const [selectedProgramFullDetailsFromServer, setSelectedProgramFullDetailsFromServer] = useState<Program | null>(null);
  const [isProgramDetailsLoading, setIsProgramDetailsLoading] = useState(false);
  const [programDetailsError, setProgramDetailsError] = useState<string | null>(null);

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

  // Effect to fetch full program details when selectedProgram ID changes
  useEffect(() => {
    const programIdString = methods.watch("personalInfo.selectedProgram"); // This is "am", "dv_male" etc.

    if (programIdString) {
      setIsProgramDetailsLoading(true);
      setProgramDetailsError(null);
      setSelectedProgramFullDetailsFromServer(null); // Clear previous details

      // Assuming your API can fetch a program by its `programId` field (e.g., "am")
      // If it needs the MongoDB document ID, this approach needs adjustment.
      fetch(`/api/programs?where[programId][equals]=${programIdString}&depth=1`) // Fetch by programId field and ensure depth for programGroup
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch program details for ${programIdString}. Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (data.docs && data.docs.length > 0) {
            setSelectedProgramFullDetailsFromServer(data.docs[0] as Program);
          } else {
            throw new Error(`Program with ID ${programIdString} not found.`);
          }
        })
        .catch(error => {
          console.error("Error fetching program details:", error);
          setProgramDetailsError(error.message);
          setSelectedProgramFullDetailsFromServer(null);
        })
        .finally(() => {
          setIsProgramDetailsLoading(false);
        });
    } else {
      setSelectedProgramFullDetailsFromServer(null); // Clear details if no program is selected
      setProgramDetailsError(null);
    }
  }, [methods.watch("personalInfo.selectedProgram")]);

  const enrollmentSteps = [
    {
      id: "contact-info", title: "Contact Information", initialIcon: UserIcon, completedIcon: CheckCircle2,
      fields: [
        'personalInfo.firstName', 'personalInfo.lastName', 'personalInfo.email', 'personalInfo.phone',
        'personalInfo.city', 'personalInfo.state', 'personalInfo.zipcode', 'personalInfo.sex',
        'personalInfo.consentToContact'
      ] as Path<EnrollmentFormData>[]
    },
    {
      id: "program-info", title: "Program Information", initialIcon: UserIcon, completedIcon: CheckCircle2,
      fields: [
        'personalInfo.referralSource', 'personalInfo.selectedProgram', 'personalInfo.whyReferred',
        'personalInfo.county', 'personalInfo.countyOther' // countyOther validation is handled by Zod superRefine based on county
      ] as Path<EnrollmentFormData>[]
    },
    {
      id: "scheduling", title: "Schedule Your Sessions", initialIcon: Calendar, completedIcon: CalendarCheck,
      fields: ['scheduling.selectedClassId'] as Path<EnrollmentFormData>[]
    },
    {
      id: "documents", title: "Review Your Consent Form", initialIcon: FileText, completedIcon: FileCheck,
      fields: ['documents.agreedToTerms', 'documents.signature'] as Path<EnrollmentFormData>[]
    },
    {
      id: "payment", title: "Complete Payment", initialIcon: CircleDollarSign, completedIcon: ShieldCheck,
      // Fields for the payment step itself, before final submission (if any)
      fields: ['payment.paymentOption', 'payment.agreeToRecurring'] as Path<EnrollmentFormData>[] 
    },
  ];

  const stepComponents = [
    <WelcomeSection key="welcome" steps={enrollmentSteps} />, 
    <ContactInfoStep key="contact" />,                       
    <ProgramInfoStep key="program" />,                       
    <SchedulingSection 
      key="scheduling" 
      selectedProgramFullDetails={selectedProgramFullDetailsFromServer} 
      clientSex={methods.watch("personalInfo.sex")} 
    />,                  
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
        // Check both agreedToTerms and if signature is filled (and ideally matches name via Zod)
        return !!(docs && docs.agreedToTerms && docs.signature && docs.signature.trim() !== "");
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

  // Helper to get fields for the current UI step based on enrollmentSteps definition
  const getCurrentStepFieldsForValidation = (stepIndex: number): Path<EnrollmentFormData>[] => {
    if (stepIndex > 0 && stepIndex <= enrollmentSteps.length) { 
      const stepConfig = enrollmentSteps[stepIndex - 1]; 
      return stepConfig.fields || [];
    }
    return [];
  };

  // Determine if current step's specific fields are valid according to Zod
  const currentStepFieldsBeingValidated = getCurrentStepFieldsForValidation(currentStep);
  const formErrors = methods.formState.errors;
  let currentStepHasLocalZodErrors = false;
  if (currentStepFieldsBeingValidated.length > 0) {
    for (const fieldPath of currentStepFieldsBeingValidated) {
      let errorForField = formErrors;
      const pathSegments = (fieldPath as string).split('.');
      let pathIsValid = true;
      for (const segment of pathSegments) {
        if (errorForField && typeof errorForField === 'object' && segment in errorForField) {
          // @ts-expect-error - Accessing nested error object dynamically
          errorForField = errorForField[segment];
        } else {
          pathIsValid = false;
          break;
        }
      }
      // @ts-expect-error - Accessing message property on potentially dynamic error object
      if (pathIsValid && errorForField && errorForField.message) {
        currentStepHasLocalZodErrors = true;
        break;
      }
    }
  }
  
  if (currentStep === 4 && formErrors.documents?.signature?.message) { 
      currentStepHasLocalZodErrors = true;
  }

  const areCurrentStepFieldsZodValid = currentStep === 0 ? true : !currentStepHasLocalZodErrors;
  const canProceed = isStepComplete(currentStep) && areCurrentStepFieldsZodValid && 
                     !(currentStep === 3 && isProgramDetailsLoading); // Can't proceed to schedule if details still loading

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
    // Handle Welcome step: No API call, just advance UI
    if (currentStep === 0) {
      setCurrentStep((prev) => prev + 1);
      const nextStepId = getStepIdForIndex(1);
      if (nextStepId) {
        window.history.pushState({ step: 1, id: nextStepId }, "", `#${nextStepId}`);
      }
      contentRef.current?.scrollTo(0, 0);
      return; 
    }

    // Determine fields to validate and API phase based on currentStep
    let fieldsToValidate: Path<EnrollmentFormData>[] = [];
    let submissionPhase = "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let dataToSend: any = {}; 

    // Define field lists for each step that needs validation & API call
    if (currentStep === 1) { // ContactInfoStep
      submissionPhase = "contactInfo";
      fieldsToValidate = [
        'personalInfo.firstName', 'personalInfo.lastName', 'personalInfo.email', 'personalInfo.phone',
        'personalInfo.city', 'personalInfo.state', 'personalInfo.zipcode', 'personalInfo.sex',
        'personalInfo.consentToContact'
      ];
      dataToSend = { personalInfo: watchedPersonalInfo };
    } else if (currentStep === 2) { // ProgramInfoStep
      submissionPhase = "programInfo";
      fieldsToValidate = [
        'personalInfo.referralSource', 'personalInfo.selectedProgram', 'personalInfo.whyReferred',
        'personalInfo.county' 
        // 'personalInfo.referralSourceOther' and 'personalInfo.countyOther' are validated by Zod superRefine based on main field
      ];
      dataToSend = { personalInfo: watchedPersonalInfo }; 
    } else if (currentStep === 3) { // SchedulingSection
      submissionPhase = "scheduling";
      fieldsToValidate = ['scheduling.selectedClassId'];
      dataToSend = { scheduling: { selectedClassId: watchedScheduling.selectedClassId } };
    } else if (currentStep === 4) { // ConsentFormStep
      submissionPhase = "consent";
      fieldsToValidate = ['documents.agreedToTerms', 'documents.signature'];
      dataToSend = { documents: { agreedToTerms: watchedDocuments.agreedToTerms, signature: watchedDocuments.signature } };
    } else if (currentStep === 5) { // PaymentStep - this is the final step before success view
      submissionPhase = "final";
      // For the final step, validate all fields. RHF should do this with zodResolver by default if no specific fields are passed to trigger.
      // Or, list all fields from all schemas if you want to be explicit.
      // For simplicity and given zodResolver is on the form, let trigger() validate all if no specific fields listed for this phase.
      // fieldsToValidate = []; // This would make trigger() validate the whole form
      dataToSend = { ...methods.getValues() }; 
    }

    // Perform client-side validation for the current step's fields
    if (fieldsToValidate.length > 0) {
      const isValidForStep = await methods.trigger(fieldsToValidate);
      if (!isValidForStep) {
        console.log(`Validation failed for step ${currentStep} fields:`, fieldsToValidate, methods.formState.errors);
        // toast.error("Please correct the highlighted errors before proceeding.");
        setIsLoading(false); // Ensure loading is stopped if it was set
        return; // Stop if validation fails
      }
    } else if (submissionPhase === "final") {
      // For the final step, if no specific fieldsToValidate, trigger validation for the whole form
      const isFormTotallyValid = await methods.trigger();
      if (!isFormTotallyValid) {
        console.log("Final form validation failed:", methods.formState.errors);
        // toast.error("Please ensure all parts of the form are correctly filled out.");
        setIsLoading(false);
        return;
      }
    }

    // If no submissionPhase is set (e.g., for steps that just navigate without API call, though welcome is handled),
    // or if it's a step that should proceed without API call (like navigating to payment before final submit)
    if (!submissionPhase) {
      // This case should ideally be handled by the specific step logic if it doesn't make an API call
      // For example, the PaymentStep (currentStep === 5) might just advance UI without an API call here,
      // deferring the 'final' API call to an action within PaymentStep itself.
      // For now, we assume if submissionPhase is determined, an API call is intended.
      // If it was the payment step and we intended to just go to it:
      if (currentStep === 5 && submissionPhase !== 'final') { // Example: if payment step isn't the final API submit itself
          console.log("Proceeding to Payment step UI.");
          setIsLoading(false); // Stop loading if it was set by mistake
          const nextStepIndex = currentStep + 1;
          // ... (UI advancement logic from below can be used here) ...
          setCurrentStep(nextStepIndex);
          contentRef.current?.scrollTo(0, 0);
          const nextStepId = getStepIdForIndex(nextStepIndex);
          if (nextStepId) window.history.pushState({ step: nextStepIndex, id: nextStepId }, "", `#${nextStepId}`);
          return;
      }
      // If other steps don't set a phase but need to advance:
      // else if (currentStep < stepComponents.length - 1) { ... advance UI ... }
      // For now, if no submissionPhase, we assume it's an unhandled case or a step that should just advance UI.
      // The welcome step (currentStep === 0) is already handled.
      // If it is just a UI step without API:
      if (currentStep < enrollmentSteps.length - 1) { // If not the success step
          setIsLoading(true); // To show loading while transitioning
          const nextStepIndex = currentStep + 1;
          setCurrentStep(nextStepIndex);
          contentRef.current?.scrollTo(0, 0);
          const nextStepId = getStepIdForIndex(nextStepIndex);
          if (nextStepId) window.history.pushState({ step: nextStepIndex, id: nextStepId }, "", `#${nextStepId}`);
          setIsLoading(false);
          return;
      }
      setIsLoading(false);
      return; // If no submission phase determined and not a simple UI advance, stop.
    }
    
    setIsLoading(true); // Ensure isLoading is true before API call if not already.

    // API Call Logic (remains largely the same)
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
      // setIsLoading(false); // Moved to finally block

          if (!response.ok) {
        console.error("API Error:", result);
        if (response.status === 401 && result.error?.includes("token")) {
            setEnrollmentToken(null);
            localStorage.removeItem(LOCAL_STORAGE_KEY); // Also clear RHF form data if session invalid
            alert("Your session has expired or is invalid. Please start over.");
            setCurrentStep(0); 
            const stepId = getStepIdForIndex(0);
            if (stepId) window.history.replaceState({ step: 0, id: stepId }, "", `#${stepId}`);
        } else {
            alert(`Error: ${result.error || 'An unknown error occurred.'}`);
        }
        setIsLoading(false); // Ensure loading is stopped
        return; 
      }

      if (submissionPhase === "contactInfo" && result.enrollmentToken) {
        setEnrollmentToken(result.enrollmentToken);
        localStorage.setItem('enrollmentToken', result.enrollmentToken);
      }
      
      const nextStepIndex = currentStep + 1; // Always advance by 1 after successful API call
      const nextStepId = getStepIdForIndex(nextStepIndex);
      if (nextStepId) {
        window.history.pushState({ step: nextStepIndex, id: nextStepId }, "", `#${nextStepId}`);
      }
      setCurrentStep(nextStepIndex);
      contentRef.current?.scrollTo(0, 0); 

    } catch (error) {
      console.error("Network or other error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
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
                  {/* Display loading or error for program details if critical for the current view */}
                  {currentStep === 3 && isProgramDetailsLoading && (
                    <div className="text-center p-4"><SpinnerIcon className="mr-2 h-6 w-6 animate-spin inline-block" /> Loading program schedules...</div>
                  )}
                  {currentStep === 3 && programDetailsError && !isProgramDetailsLoading && (
                    <div className="text-center p-4 text-destructive">Error loading program information: {programDetailsError}</div>
                  )}
                  {/* Render step component if not loading/error OR if not scheduling step */}
                  {!(currentStep === 3 && (isProgramDetailsLoading || programDetailsError)) && stepComponents[currentStep]}
                </div>
              </StepAnimationWrapper>
            </AnimatePresence>
          </div>

          {/* Navigation buttons - also apply consistent max-width if desired */}
          {!isSuccessStep && (
            <div className="container mx-auto max-w-lg mt-auto p-4">
              <div className={isFirstStep ? "flex justify-center" : "flex items-center justify-between"}>
                {!isFirstStep ? (
                  <Button onClick={goToPreviousStep} variant="outline" className="mr-2" disabled={isLoading || isProgramDetailsLoading}>
                    <ArrowLeft size={16} className="mr-2" /> Back
                  </Button>
                ) : (
                  <div></div> /* Placeholder to keep Continue button centered/right */
                )}

                <Button
                  onClick={goToNextStep}
                  size={isFirstStep ? "lg" : "default"}
                  className={`${isFirstStep ? "px-8 py-2 h-auto text-base" : "w-auto"} ${(!canProceed && !isFirstStep) ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  disabled={(!canProceed && !isFirstStep) || isLoading || (currentStep === 2 && isProgramDetailsLoading) /* Disable continue from ProgInfo if details loading for next step */ }
                >
                  {isLoading || (currentStep === 2 && isProgramDetailsLoading) ? ( /* Show general loading or specific program loading */
                    <>
                      <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                      {isProgramDetailsLoading && currentStep ===2 ? "Loading Program..." : (isFirstStep ? "Processing..." : "Saving...")}
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
