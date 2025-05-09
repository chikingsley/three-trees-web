"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Calendar,
  CircleDollarSign,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label as CheckboxLabel } from "@/components/ui/label";
import type { EnrollmentFormData } from "@/lib/form-types";
import { PROGRAM_DATA, Program, PaymentOption } from "@/lib/form-types"; 
import StepHeader from "@/components/StepHeader";

const PaymentStep: React.FC = () => {
  const { 
    control, 
    watch, 
    formState: { errors } 
  } = useFormContext<EnrollmentFormData>();

  const selectedProgramId = watch("personalInfo.selectedProgram");
  const paymentOption = watch("payment.paymentOption") as PaymentOption;
  const selectedProgram = PROGRAM_DATA.find(p => p.id === selectedProgramId);

  const enrollmentFee = selectedProgram ? selectedProgram.enrollmentFee : 0;
  const calculateOriginalSessionTotal = (program: Program | undefined) => program ? program.weeks * program.costPerSession : 0;
  const originalSessionTotal = calculateOriginalSessionTotal(selectedProgram);
  const calculateDiscountedSessionTotal = (program: Program | undefined) => program ? (program.weeks * program.costPerSession * 0.95) : 0;
  const discountedSessionTotal = calculateDiscountedSessionTotal(selectedProgram);

  const calculateDueToday = (option: PaymentOption) => {
    if (!selectedProgram) return 0;
    if (option === "full-program") {
      return enrollmentFee + discountedSessionTotal;
    }
    return enrollmentFee; // Only enrollment fee for per-session due today
  };
  const dueToday = calculateDueToday(paymentOption);

  return (
    <>
      <StepHeader 
        title="Complete Your Payment"
        subtitle="Choose a payment option to complete your enrollment"
      />
      <div className="space-y-6">
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
                  <span className="font-medium">${originalSessionTotal.toFixed(2)}</span>
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

        {/* Payment Options Controller */}
        <Controller
          name="payment.paymentOption"
          control={control}
          defaultValue="full-program" 
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-2"> 
              {/* Pay Per Session Button */}
              <button
                type="button" 
                className={`relative p-3 rounded-lg border transition-colors text-sm ${ 
                  field.value === "per-session"
                    ? "bg-white border-green-500"
                    : "bg-muted/10 border-border hover:bg-gray-50"
                }`}
                onClick={() => field.onChange("per-session")}
              >
                <div className="text-center">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-medium mb-0.5 text-sm">
                    {field.value === "per-session" ? "Start Weekly Payments" : "Pay Per Session"}
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">Enrollment fee now</div>
                  <div className={`text-sm font-semibold ${field.value === "per-session" ? "text-green-600" : "text-primary"}`}>
                    Due today: ${calculateDueToday("per-session").toFixed(2)}
                  </div>
                </div>
                {field.value === "per-session" && (
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
                className={`relative p-3 rounded-lg border transition-colors text-sm ${ 
                  field.value === "full-program"
                    ? "bg-white border-green-500"
                    : "bg-muted/10 border-border hover:bg-gray-50"
                }`}
                onClick={() => field.onChange("full-program")}
              >
                <div className="text-center">
                  <CircleDollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-medium mb-0.5 text-sm">Prepay <span className="text-green-600">(Save 5%)</span></div>
                  <div className="text-xs text-muted-foreground mb-1">
                    <span className="line-through">${originalSessionTotal.toFixed(2)}</span>{" "}
                    <span>${discountedSessionTotal.toFixed(2)}</span> + ${enrollmentFee.toFixed(2)} fee
                  </div>
                  <div className={`text-sm font-semibold ${field.value === "full-program" ? "text-green-600" : "text-primary"}`}>
                    Due today: ${calculateDueToday("full-program").toFixed(2)}
                  </div>
                </div>
                 {field.value === "full-program" && (
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

        {/* Consent Checkbox for Recurring Payments (Conditional) */}
        {paymentOption === 'per-session' && (
          <div className="pt-2 space-y-1">
            <Controller
              name="payment.agreeToRecurring"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="agreeToRecurring"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <CheckboxLabel htmlFor="agreeToRecurring" className="text-xs text-muted-foreground font-normal leading-snug">
                    I understand this is a recurring weekly charge and agree to the terms.
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
    </>
  );
};

export default PaymentStep; 