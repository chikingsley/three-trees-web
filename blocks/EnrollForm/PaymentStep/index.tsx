"use client";

import React from "react";
import { motion } from "framer-motion";
import { useFormContext, Controller } from "react-hook-form";
import {
  CalendarCheck as PayAsYouGoIcon,
  Calendar,
  CircleDollarSign,
  ArrowRight,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label as CheckboxLabel } from "@/components/ui/label";
import type { EnrollmentFormData } from "@/lib/form-types";
import { PROGRAM_DATA, PaymentOption as PaymentOptionType } from "@/lib/form-types";
import StepHeader from "@/components/StepHeader";
import PaymentOptionCard from "./PaymentOptionCard";

// Define icon mapping
const paymentOptionIcons = {
  pay_as_you_go: PayAsYouGoIcon,
  autopay_weekly: Calendar,
  full_program: CircleDollarSign,
};

const PaymentStep: React.FC = () => {
  const {
    control,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<EnrollmentFormData>();

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

  return (
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
            {/* Placeholder for Square Card Element */}
            <div id="card-container" className="min-h-[100px] border rounded-md p-2 bg-white">
              {/* Square SDK will mount its card fields here */}
              <p className="text-xs text-muted-foreground text-center py-4">Secure card input will appear here.</p>
            </div>
          </div>
        </div>

        {/* Pay Button */}
        <button
          type="button" // Will eventually trigger Square tokenization then next step
          className="w-full bg-primary text-white py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors mt-3 flex items-center justify-center">
          Pay ${dueToday.toFixed(2)} Now
          <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default PaymentStep; 