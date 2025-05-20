"use client";

import React, { useEffect, useState, useRef } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import { useFormContext, Controller } from "react-hook-form";
import {
  CalendarCheck as PayAsYouGoIcon,
  Calendar,
  CircleDollarSign,
  Loader2,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label as CheckboxLabel } from "@/components/ui/label";
import type { EnrollmentFormData } from "@/lib/form-types";
import { PROGRAM_DATA, PaymentOption as PaymentOptionType } from "@/lib/form-types";
import StepHeader from "@/components/StepHeader";
import PaymentOptionCard from "./PaymentOptionCard";

// Minimal interfaces for Square Web Payments SDK objects we interact with
interface SquarePayments {
  card(): Promise<SquareCard>;
  // Add other payment methods here if you use them (e.g., applePay, googlePay)
}

interface SquareCard {
  attach(selector: string): Promise<void>;
  tokenize(verificationDetails?: SquareVerificationDetails): Promise<SquareTokenizeResult>;
  // Add other card methods if you use them
}

interface SquareVerificationDetails {
  amount: string;
  currencyCode: string;
  intent: 'CHARGE' | 'STORE' | 'CHARGE_AND_STORE';
  billingContact: {
    familyName?: string;
    givenName?: string;
    email?: string;
    countryCode?: string;
    postalCode?: string;
    city?: string;
    addressLines?: string[];
    phone?: string;
  };
  customerInitiated: boolean;
  sellerKeyedIn: boolean;
  // customerId?: string; // If you have a Square Customer ID and want to associate the token
}

interface SquareTokenizeResultError {
  field: string;
  message: string;
  detail?: string;
  category?: string;
}
interface SquareTokenizeResult {
  status: string; // 'OK' on success
  token?: string; // The card nonce
  errors?: SquareTokenizeResultError[];
}

declare global {
  interface Window {
    Square?: {
      payments(applicationId: string, locationId: string): SquarePayments;
    };
  }
}

// Define icon mapping
const paymentOptionIcons = {
  pay_as_you_go: PayAsYouGoIcon,
  autopay_weekly: Calendar,
  full_program: CircleDollarSign,
};

// Ensure you have these in your environment variables or replace them
const SQUARE_APPLICATION_ID = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID || "YOUR_SQUARE_APPLICATION_ID";
const SQUARE_LOCATION_ID = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || "YOUR_SQUARE_LOCATION_ID";
const SQUARE_ENVIRONMENT_ENDPOINT = process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT_ENDPOINT || "https://sandbox.web.squarecdn.com/v1/square.js";

const PaymentStep: React.FC = () => {
  const {
    control,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<EnrollmentFormData>();

  const [card, setCard] = useState<SquareCard | null>(null);
  const [isSquareSdkLoaded, setIsSquareSdkLoaded] = useState(false);
  const [isInitializingCard, setIsInitializingCard] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  const cardContainerRef = useRef<HTMLDivElement>(null);

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
    if (!SQUARE_APPLICATION_ID || SQUARE_APPLICATION_ID === "YOUR_SQUARE_APPLICATION_ID" || 
        !SQUARE_LOCATION_ID || SQUARE_LOCATION_ID === "YOUR_SQUARE_LOCATION_ID") {
      console.error("Square payment system is not configured. Application ID or Location ID is missing or uses placeholders.");
      setPaymentError("Payment system is not configured. Please contact support.");
      setIsSquareSdkLoaded(false);
      return;
    }

    if (isSquareSdkLoaded && cardContainerRef.current && !card && !isInitializingCard) {
      const initializeCardWithRetry = async () => {
        setIsInitializingCard(true);
        setPaymentError(null);
        console.log("Attempting to initialize Square Card...");

        let attempts = 0;
        const maxAttempts = 5;
        const delayMs = 500;

        const tryInit = async () => {
          if (window.Square) {
            console.log("Square SDK found on window object.");
            try {
              const payments = window.Square.payments(SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID);
              const cardInstance = await payments.card();
              console.log("Card instance created. Attaching to #card-container...");
              if (document.getElementById('card-container')) {
                 await cardInstance.attach('#card-container');
                 setCard(cardInstance);
                 console.log("Square Card mounted successfully.");
                 setPaymentError(null); 
              } else {
                console.error("#card-container not found in DOM for attach.");
                setPaymentError("Payment form element not found. Please try refreshing.");
              }
            } catch (e) {
              console.error("Error initializing Square Card:", e);
              setPaymentError("Could not load payment form. Please check your connection or try again.");
            } finally {
              setIsInitializingCard(false);
            }
          } else {
            attempts++;
            if (attempts <= maxAttempts) {
              console.warn(`Square SDK not on window. Attempt ${attempts}/${maxAttempts}. Retrying in ${delayMs}ms...`);
              setTimeout(tryInit, delayMs);
            } else {
              console.error("Square SDK failed to load on window after multiple attempts.");
              setPaymentError("Payment system failed to initialize after multiple attempts. Please refresh.");
              setIsInitializingCard(false);
            }
          }
        };
        await tryInit();
      };
      initializeCardWithRetry();
    }
  }, [isSquareSdkLoaded, card, isInitializingCard]);

  const handlePayment = async () => {
    if (!card) {
      setPaymentError("Payment form not ready. Please wait for it to load or refresh the page.");
      if (isInitializingCard) {
        setPaymentError("Payment form is still initializing. Please wait a moment.");
      }
      return;
    }
    setIsProcessingPayment(true);
    setPaymentError(null);
    try {
      // Construct verificationDetails
      const verificationDetails: SquareVerificationDetails = {
        amount: dueToday.toFixed(2),
        currencyCode: 'USD', // Assuming USD, adjust if necessary
        intent: 'CHARGE',    // Or 'CHARGE_AND_STORE' if you plan to save the card
        billingContact: {
          givenName: watch("personalInfo.firstName") || undefined,
          familyName: watch("personalInfo.lastName") || undefined,
          email: watch("personalInfo.email") || undefined,
        },
        customerInitiated: true,
        sellerKeyedIn: false,
      };

      const result = await card.tokenize(verificationDetails); // Pass verificationDetails
      if (result.status === 'OK') {
        const token = result.token;
        console.log("Card Nonce:", token, "Verification Details Sent:", verificationDetails);
        // TODO: This is where you would send the token and other relevant data (like dueToday, paymentOption)
        // to your backend API endpoint (e.g., /api/enroll with phase finalPayment)
        alert(`Payment tokenization successful (simulated)! Nonce: ${token}. Amount: $${dueToday.toFixed(2)}. Next: Send to backend.`);

        // For now, we'll keep the client-side alert.
        // The actual call to your /api/enroll should happen here.
        // Example of what that might look like (you'll need to adapt this):
        /*
        const response = await fetch('/api/enroll', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            submissionPhase: 'finalPayment',
            clientToken: getValues('clientToken'), // Assuming you have clientToken in form state
            paymentDetails: {
              cardNonce: token,
              dueTodayAmount: dueToday,
              paymentOption: paymentOption,
            }
          }),
        });
        const responseData = await response.json();
        if (response.ok) {
          console.log('Backend payment processing successful:', responseData);
          // Potentially navigate to a success step or show a success message
        } else {
          console.error('Backend payment processing failed:', responseData);
          setPaymentError(responseData.error || 'Payment processing failed on the server.');
        }
        */

      } else {
        let errorMessage = `Tokenization failed: ${result.errors?.[0]?.message || 'Unknown error'}`;
        if (result.errors) {
          errorMessage = `Tokenization failed. Errors: ${result.errors.map((error: SquareTokenizeResultError) =>
            `${error.field}: ${error.message}${error.detail ? ` (${error.detail})` : ''}`
          ).join("; ")}`;
        }
        console.error("Square tokenization error:", result);
        setPaymentError(errorMessage);
        alert(`Payment Error: ${errorMessage}`);
      }
    } catch (e) {
      const err = e as Error;
      console.error("Error during Square tokenization:", err);
      setPaymentError(`An unexpected error occurred: ${err.message}`);
      alert(`Payment Error: ${err.message}`);
    } finally {
      setIsProcessingPayment(false);
    }
  };
  
  const isLoading = !isSquareSdkLoaded || isInitializingCard;

  return (
    <>
      <Script
        src={SQUARE_ENVIRONMENT_ENDPOINT}
        onLoad={() => {
          console.log("Square SDK Script loaded via next/script.");
          setIsSquareSdkLoaded(true);
        }}
        onError={(e) => {
          console.error("Failed to load Square SDK script:", e);
          setPaymentError("Payment system critical error: SDK script failed to load. Check internet and refresh.");
          setIsSquareSdkLoaded(false);
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
          <div className="bg-white p-4 border rounded-lg shadow-sm max-w-md mx-auto">
            <label htmlFor="card-container" className="block text-sm font-medium text-gray-700 mb-1">
              Card Information
            </label>
            <div id="card-container" ref={cardContainerRef} className="border rounded p-2"></div>
            {isLoading && !paymentError && (
              <div className="text-center text-sm text-gray-500">
                <Loader2 className="animate-spin inline-block mr-2" /> Loading payment form...
              </div>
            )}
            {isSquareSdkLoaded && !isInitializingCard && !card && !paymentError && cardContainerRef.current &&(
               <div className="text-center text-sm text-gray-500">
                <Loader2 className="animate-spin inline-block mr-2" /> Finalizing payment form...
              </div>
            )}
            {paymentError && (
              <div className="mt-2 text-center text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {paymentError}
            </div>
            )}
          </div>

          {/* Pay Button */}
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={handlePayment}
              disabled={isLoading || isProcessingPayment || !card || !!paymentError}
              className="w-full max-w-md mx-auto bg-brand-primary hover:bg-brand-primary-dark text-primary font-semibold pb-3 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary-light transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isProcessingPayment ? (
                <><Loader2 className="animate-spin mr-2" /> Processing...</>
              ) : (
                <><CircleDollarSign className="mr-2 text-lg text-primary" /> Confirm & Pay ${dueToday.toFixed(2)}</>
              )}
            </button>
          </div>
      </div>
    </motion.div>
    </>
  );
};

export default PaymentStep; 