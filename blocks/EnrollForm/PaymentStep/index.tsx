"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import { useFormContext, Controller } from "react-hook-form";
import {
  CalendarCheck as PayAsYouGoIcon,
  Calendar,
  CircleDollarSign,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label as CheckboxLabel } from "@/components/ui/label";
import type { EnrollmentFormData } from "@/lib/form-types";
import { PROGRAM_DATA, PaymentOption as PaymentOptionType } from "@/lib/form-types";
import StepHeader from "@/components/StepHeader";
import PaymentOptionCard from "./PaymentOptionCard";

// Augment the Window interface to include Square
declare global {
  interface Window {
    Square?: any; // Or a more specific type if you have Square's SDK types
  }
}

// Define icon mapping
const paymentOptionIcons = {
  pay_as_you_go: PayAsYouGoIcon,
  autopay_weekly: Calendar,
  full_program: CircleDollarSign,
};

// Ensure you have these in your environment variables or replace them
const SQUARE_APP_ID = process.env.NEXT_PUBLIC_SQUARE_APP_ID || "YOUR_SQUARE_APP_ID";
const SQUARE_LOCATION_ID = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || "YOUR_SQUARE_LOCATION_ID";

const PaymentStep: React.FC = () => {
  const {
    control,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<EnrollmentFormData>();

  const [card, setCard] = useState<any>(null);
  const [isSquareSdkLoaded, setIsSquareSdkLoaded] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const selectedProgramId = watch("personalInfo.selectedProgram");
  const paymentOption = watch("payment.paymentOption") as PaymentOptionType;
  const selectedProgram = PROGRAM_DATA.find(p => p.id === selectedProgramId);

  const enrollmentFee = selectedProgram ? selectedProgram.enrollmentFee : 0;
  const baseProgramCost = selectedProgram ? selectedProgram.weeks * selectedProgram.costPerSession : 0;

  const getDiscountedProgramCost = (option: PaymentOptionType) => {
    if (!selectedProgram) return 0;
    if (option === "autopay_weekly") return baseProgramCost * 0.95;
    if (option === "full_program") return baseProgramCost * 0.90;
    return baseProgramCost;
  };

  const calculateDueToday = (option: PaymentOptionType) => {
    if (!selectedProgram) return 0;
    if (option === "full_program") {
      return enrollmentFee + getDiscountedProgramCost(option);
    }
    return enrollmentFee;
  };

  const dueToday = calculateDueToday(paymentOption);

  const handlePaymentOptionChange = (newOption: PaymentOptionType) => {
    setValue("payment.paymentOption", newOption, { shouldValidate: true });
    if (newOption !== "autopay_weekly") {
      setValue("payment.agreeToRecurring", false, { shouldValidate: true });
    }
  };

  // Define payment options data
  const paymentOptionsConfig: Array<{
    id: PaymentOptionType;
    title: string;
    discountText: string;
  }> = [
    {
      id: "pay_as_you_go",
      title: "Pay As You Go",
      discountText: "No discount",
    },
    {
      id: "autopay_weekly",
      title: "Autopay Weekly",
      discountText: "Save 5%",
    },
    {
      id: "full_program",
      title: "Prepay Full Program",
      discountText: "Save 10%",
    },
  ];

  useEffect(() => {
    if (isSquareSdkLoaded && SQUARE_APP_ID && SQUARE_LOCATION_ID) {
      const initializeCard = async () => {
        if (!window.Square) {
          console.error("Square SDK not loaded yet");
          setPaymentError("Payment system failed to load. Please refresh.");
          return;
        }
        try {
          const payments = window.Square.payments(SQUARE_APP_ID, SQUARE_LOCATION_ID);
          const cardInstance = await payments.card();
          await cardInstance.attach('#card-container');
          setCard(cardInstance);
          console.log("Square Card mounted.");
          setPaymentError(null); // Clear any previous loading errors
        } catch (e) {
          console.error("Error initializing Square Card:", e);
          setPaymentError("Could not load payment form. Please check your connection or try again.");
        }
      };
      initializeCard();
    } else if (SQUARE_APP_ID === "YOUR_SQUARE_APP_ID" || SQUARE_LOCATION_ID === "YOUR_SQUARE_LOCATION_ID"){
        setPaymentError("Payment system is not configured. Please contact support.");
    }
  }, [isSquareSdkLoaded]);

  const handlePayment = async () => {
    if (!card) {
      setPaymentError("Payment form not ready. Please wait or refresh.");
      return;
    }
    setIsProcessingPayment(true);
    setPaymentError(null);
    try {
      const result = await card.tokenize();
      if (result.status === 'OK') {
        const token = result.token; // This is the cardNonce
        console.log("Card Nonce:", token);
        // TODO: Send this token and form data to your backend API with phase 'finalPayment'
        // Example: await submitFinalPayment({ cardNonce: token, formData: methods.getValues() });
        alert(`Payment successful (simulated)! Nonce: ${token}. Next: Send to backend.`);
        // On success, proceed to the next step in the main form (EnrollNowPage)
        // This might involve calling a prop function like `onPaymentSuccess(token)`
      } else {
        let errorMessage = `Tokenization failed with status: ${result.status}`;
        if (result.errors) {
          errorMessage += `\nErrors: ${result.errors.map((error: { field: string; message: string; detail?: string; category?: string; }) => 
            `Field: ${error.field}, Message: ${error.message}${error.detail ? `, Detail: ${error.detail}` : ''}`
          ).join(", ")}`;
        }
        console.error(errorMessage);
        setPaymentError(errorMessage);
        alert(`Payment Error: ${errorMessage}`); // User-friendly error
      }
    } catch (e: any) {
      console.error("Error during Square tokenization:", e);
      setPaymentError(e.message || "An unexpected error occurred during payment.");
      alert(`Payment Error: ${e.message || "An unexpected error occurred."}`);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <>
      <Script 
        src="https://web.squarecdn.com/v1/square.js" 
        onLoad={() => {
          console.log("Square SDK Script loaded.");
          setIsSquareSdkLoaded(true);
        }}
        onError={() => {
            console.error("Failed to load Square SDK script.");
            setPaymentError("Payment system could not be loaded. Please check your internet connection and refresh the page.");
        }}
      />
      <motion.div className="pt-6 px-0">
        <StepHeader
          title="Complete Your Payment"
          subtitle="Choose a payment option to complete your enrollment"
        />
        <div className="space-y-4 sm:space-y-6">
          {/* --- Program Details Section --- */}
          <div className="border rounded-lg overflow-hidden text-sm max-w-md mx-auto">
            {selectedProgram ? (
              <div className="p-2 space-y-2 bg-white">
                {/* Program Name & Duration */}
                <div className="font-medium text-base mb-1 text-center border-b pb-2">
                  {selectedProgram.name} <span className="text-sm font-normal text-muted-foreground">({selectedProgram.duration})</span>
                </div>

                {/* Details Row (Flex) */}
                <div className="flex justify-between items-start text-xs space-x-2">
                  <div className="flex flex-col text-left flex-1">
                    <span className="text-muted-foreground">Total Cost</span>
                    <span className="font-medium">${baseProgramCost.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col text-center flex-1 px-1">
                    <span className="text-muted-foreground">Per Session</span>
                    <span className="font-medium">${selectedProgram.costPerSession.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col text-right flex-1">
                    <span className="text-muted-foreground">Enroll Fee</span>
                    <span className="font-medium">${enrollmentFee.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-sm text-muted-foreground">
                Please select a program in the previous step.
              </div>
            )}
          </div>
          {/* --- End Program Details Section --- */}

          {/* Payment Options Controller - Now 3 options */}
          <Controller
            name="payment.paymentOption"
            control={control}
            defaultValue="full_program"
            render={({ field }) => (
              <div className="grid grid-cols-3 gap-2">
                {paymentOptionsConfig.map((optionConfig) => (
                  <PaymentOptionCard
                    key={optionConfig.id}
                    optionId={optionConfig.id}
                    title={optionConfig.title}
                    IconComponent={paymentOptionIcons[optionConfig.id]}
                    dueTodayAmount={calculateDueToday(optionConfig.id)}
                    isSelected={field.value === optionConfig.id}
                    onClick={() => handlePaymentOptionChange(optionConfig.id)}
                    discountText={optionConfig.discountText}
                  />
                ))}
              </div>
            )}
          />
          {errors.payment?.paymentOption?.message && (
            <p className="text-xs text-red-500 text-center -mt-2">{errors.payment.paymentOption.message as string}</p>
          )}

          {/* Consent Checkbox for Recurring Payments (Conditional for autopay_weekly) */}
          {paymentOption === 'autopay_weekly' && (
            <div className="pt-2 space-y-1">
              <Controller
                name="payment.agreeToRecurring"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="agreeToRecurring" checked={field.value ?? false} onCheckedChange={field.onChange} />
                    <CheckboxLabel htmlFor="agreeToRecurring" className="text-xs text-muted-foreground font-normal leading-snug">
                      I understand this is a recurring weekly charge (5% session discount) and agree to the terms.
                    </CheckboxLabel>
                  </div>
                )}
              />
              {errors.payment?.agreeToRecurring?.message && (
                <p className="text-xs text-red-500 pt-1 pl-1">{errors.payment.agreeToRecurring.message as string}</p>
              )}
            </div>
          )}

          {/* Payment Method - Square Placeholder */}
          <div className="border rounded-lg overflow-hidden text-sm">
            <div className="p-3 bg-muted/30 border-b">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-base">Payment Method</h3>
                <div className="text-xs">
                  <span className="text-muted-foreground">Due today:</span>{" "}
                  <span className="font-bold ml-1 text-primary">${dueToday.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="p-3">
              <div id="card-container" className="min-h-[50px] border rounded-md p-2 bg-white">
                {/* Square SDK will mount its card fields here. If error, show message. */}
                {!isSquareSdkLoaded && !paymentError && <p className="text-xs text-muted-foreground text-center py-4">Loading payment form...</p>}
              </div>
              {paymentError && <p className="text-xs text-red-500 pt-2 text-center">{paymentError}</p>}
            </div>
          </div>

          {/* Pay Button */}
          <button
            type="button"
            onClick={handlePayment}
            disabled={!card || isProcessingPayment || !isSquareSdkLoaded || !!paymentError}
            className="w-full bg-primary text-white py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors mt-3 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessingPayment ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
            ) : (
              <><ArrowRight size={16} className="mr-2 order-last ml-0" /> Pay ${dueToday.toFixed(2)} Now</>
            )}
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default PaymentStep; 