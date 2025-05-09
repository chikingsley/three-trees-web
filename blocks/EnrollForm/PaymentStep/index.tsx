"use client";

import React from "react";
import { motion } from "framer-motion";
import { useFormContext, Controller } from "react-hook-form";
import {
  CalendarCheck as PayAsYouGoIcon,
  Calendar,
  CircleDollarSign,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label as CheckboxLabel } from "@/components/ui/label";
import type { EnrollmentFormData } from "@/lib/form-types";
import { PROGRAM_DATA, PaymentOption } from "@/lib/form-types";
import StepHeader from "@/components/StepHeader";

const PaymentStep: React.FC = () => {
  const {
    control,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<EnrollmentFormData>();

  const selectedProgramId = watch("personalInfo.selectedProgram");
  const paymentOption = watch("payment.paymentOption") as PaymentOption;
  const selectedProgram = PROGRAM_DATA.find(p => p.id === selectedProgramId);

  const enrollmentFee = selectedProgram ? selectedProgram.enrollmentFee : 0;
  const baseProgramCost = selectedProgram ? selectedProgram.weeks * selectedProgram.costPerSession : 0;

  const getDiscountedProgramCost = (option: PaymentOption) => {
    if (!selectedProgram) return 0;
    if (option === "autopay_weekly") return baseProgramCost * 0.95;
    if (option === "full_program") return baseProgramCost * 0.90;
    return baseProgramCost;
  };

  const calculateDueToday = (option: PaymentOption) => {
    if (!selectedProgram) return 0;
    if (option === "full_program") {
      return enrollmentFee + getDiscountedProgramCost(option);
    }
    return enrollmentFee;
  };

  const dueToday = calculateDueToday(paymentOption);

  const handlePaymentOptionChange = (newOption: PaymentOption) => {
    setValue("payment.paymentOption", newOption, { shouldValidate: true });
    if (newOption !== "autopay_weekly") {
      setValue("payment.agreeToRecurring", false, { shouldValidate: true });
    }
  };

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {/* Pay As You Go Button */}
              <button
                type="button"
                className={`relative p-3 rounded-lg border transition-colors text-sm flex flex-col justify-between h-full ${field.value === "pay_as_you_go"
                    ? "bg-white border-primary ring-2 ring-primary"
                    : "bg-muted/10 border-border hover:bg-gray-50"
                  }`}
                onClick={() => handlePaymentOptionChange("pay_as_you_go")}
              >
                <div className="text-center mb-1">
                  <PayAsYouGoIcon className="w-6 h-6 mx-auto mb-1.5 text-primary" />
                  <div className="font-medium text-sm">Pay As You Go</div>
                  <div className="text-xs text-muted-foreground mt-0.5">No discount</div>
                </div>
                <div className={`text-sm font-semibold mt-1 ${field.value === "pay_as_you_go" ? "text-primary" : "text-foreground"}`}>
                  Due today: ${calculateDueToday("pay_as_you_go").toFixed(2)}
                </div>
                {field.value === "pay_as_you_go" && (
                  <div className="absolute top-2 right-2">
                    <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-green-600" />
                    </div>
                  </div>
                )}
              </button>

              {/* Autopay Weekly Button */}
              <button
                type="button"
                className={`relative p-3 rounded-lg border transition-colors text-sm flex flex-col justify-between h-full ${field.value === "autopay_weekly"
                    ? "bg-white border-primary ring-2 ring-primary"
                    : "bg-muted/10 border-border hover:bg-gray-50"
                  }`}
                onClick={() => handlePaymentOptionChange("autopay_weekly")}
              >
                <div className="text-center mb-1">
                  <Calendar className="w-6 h-6 mx-auto mb-1.5 text-primary" />
                  <div className="font-medium text-sm">Autopay Weekly</div>
                  <div className="text-xs text-green-600 mt-0.5">Save 5% on sessions</div>
                </div>
                <div className={`text-sm font-semibold mt-1 ${field.value === "autopay_weekly" ? "text-primary" : "text-foreground"}`}>
                  Due today: ${calculateDueToday("autopay_weekly").toFixed(2)}
                </div>
                {field.value === "autopay_weekly" && (
                  <div className="absolute top-2 right-2">
                    <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-green-600" />
                    </div>
                  </div>
                )}
              </button>

              {/* Prepay Full Program Button */}
              <button
                type="button"
                className={`relative p-3 rounded-lg border transition-colors text-sm flex flex-col justify-between h-full ${field.value === "full_program"
                    ? "bg-white border-primary ring-2 ring-primary"
                    : "bg-muted/10 border-border hover:bg-gray-50"
                  }`}
                onClick={() => handlePaymentOptionChange("full_program")}
              >
                <div className="text-center mb-1">
                  <CircleDollarSign className="w-6 h-6 mx-auto mb-1.5 text-primary" />
                  <div className="font-medium text-sm">Prepay Full Program</div>
                  <div className="text-xs text-green-600 mt-0.5">Save 10% on sessions</div>
                </div>
                <div className={`text-sm font-semibold mt-1 ${field.value === "full_program" ? "text-primary" : "text-foreground"}`}>
                  Due today: ${calculateDueToday("full_program").toFixed(2)}
                </div>
                {field.value === "full_program" && (
                  <div className="absolute top-2 right-2">
                    <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-green-600" />
                    </div>
                  </div>
                )}
              </button>
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