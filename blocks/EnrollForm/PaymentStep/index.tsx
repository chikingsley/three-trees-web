"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  CircleDollarSign,
  CheckCircle2,
  CreditCard,
  ArrowRight,
} from "lucide-react";

// Import Program type from ProgramSelectionStep
import type { Program } from "@/blocks/EnrollForm/ProgramSelectionStep";

// Type definitions (subset of original FormData and PaymentOption from page.tsx)
// These might need to be imported from a central types file in a larger refactor
export type PaymentOption = "per-session" | "full-program";

export interface PaymentData {
  paymentOption: string;
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
}

// Simplified FormData for this component's direct needs. 
// In page.tsx, FormData will still hold the complete structure.
export interface PaymentStepFormData {
  selectedPrograms: string[];
  payment: PaymentData;
}

interface PaymentStepProps {
  formData: PaymentStepFormData; // Using the simplified FormData for this component
  updateFormData: (data: Partial<{ payment: PaymentData }>) => void; // More specific update type
  programsData: Program[];
}

const PaymentStep: React.FC<PaymentStepProps> = ({
  formData,
  updateFormData,
  programsData,
}) => {
  const totalEnrollmentFees = formData.selectedPrograms.reduce((acc, programId) => {
    const program = programsData.find((p) => p.id === programId);
    return acc + (program ? program.enrollmentFee : 0);
  }, 0);

  const calculateTotalCost = (program: Program, method: PaymentOption) => {
    const sessionCost = program.weeks * program.costPerSession;
    if (method === "full-program") {
      return sessionCost * 0.95; // 5% discount
    }
    return sessionCost;
  };

  const calculateOriginalTotal = () => {
    return formData.selectedPrograms.reduce((acc, programId) => {
      const program = programsData.find((p) => p.id === programId);
      return acc + (program ? program.weeks * program.costPerSession : 0);
    }, 0);
  };

  const calculateDueToday = (method: PaymentOption) => {
    if (method === "full-program") {
      return (
        totalEnrollmentFees +
        formData.selectedPrograms.reduce((acc, programId) => {
          const program = programsData.find((p) => p.id === programId);
          return acc + (program ? calculateTotalCost(program, method) : 0);
        }, 0)
      );
    }
    return totalEnrollmentFees;
  };

  const originalTotal = calculateOriginalTotal();
  const discountedTotal = originalTotal * 0.95;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-8 md:pt-8 px-0"
    >
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold mb-1 text-primary">Complete Your Payment</h2>
        <p className="text-muted-foreground text-sm">Choose a payment option to complete your enrollment</p>
      </div>

      <div className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="p-0">
            <table className="w-full">
              <thead className="bg-white rounded-t-lg">
                <tr>
                  <th className="text-left py-2 px-3 text-sm font-medium">Program</th>
                  <th className="text-center py-2 px-3 text-sm font-medium">Duration</th>
                  <th className="text-right py-2 px-3 text-sm font-medium">Per Session</th>
                </tr>
              </thead>
              <tbody className="divide-y p-4">
                {formData.selectedPrograms.map((programId) => {
                  const program = programsData.find((p) => p.id === programId);
                  if (!program) return null;

                  return (
                    <tr key={program.id}>
                      <td className="py-3 px-4">
                        <div className="font-medium">{program.name}</div>
                        <div className="text-xs text-muted-foreground mt-1 pl-1">
                          Enrollment fee: ${program.enrollmentFee.toFixed(2)}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">{program.duration}</td>
                      <td className="py-3 px-3 text-right">${program.costPerSession.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-muted/10">
                <tr>
                  <td colSpan={2} className="py-3 px-3 text-right text-sm">
                    Total Enrollment Fees (due today):
                  </td>
                  <td className="py-3 px-3 text-right font-medium">${totalEnrollmentFees.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            className={`relative p-5 rounded-lg border transition-colors ${
              formData.payment.paymentOption === "per-session"
                ? "bg-white border-green-500"
                : "bg-muted/10 border-border"
            }`}
            onClick={() =>
              updateFormData({
                payment: { ...formData.payment, paymentOption: "per-session" },
              })
            }
          >
            <div className="text-center">
              <Calendar className="w-8 h-8 mx-auto mb-3 text-primary" />
              <div className="font-medium mb-1">Pay Per Session</div>
              <div className="text-sm text-muted-foreground mb-2">
                Pay enrollment fee(s) now, remaining sessions as you attend
              </div>
              <div
                className={`text-base font-semibold ${formData.payment.paymentOption === "per-session" ? "text-green-600" : "text-primary"}`}
              >
                Due today: ${calculateDueToday(formData.payment.paymentOption as PaymentOption).toFixed(2)}
              </div>
            </div>
            {formData.payment.paymentOption === "per-session" && (
              <div className="absolute top-3 right-3">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
              </div>
            )}
          </button>

          <button
            className={`relative p-5 rounded-lg border transition-colors ${
              formData.payment.paymentOption === "full-program"
                ? "bg-white border-green-500"
                : "bg-muted/10 border-border"
            }`}
            onClick={() =>
              updateFormData({
                payment: { ...formData.payment, paymentOption: "full-program" },
              })
            }
          >
            <div className="text-center">
              <CircleDollarSign className="w-8 h-8 mx-auto mb-3 text-primary" />
              <div className="font-medium mb-1">
                Prepay All Sessions <span className="text-green-600">(Save 5%)</span>
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                <span className="line-through">${originalTotal.toFixed(2)}</span>{" "}
                <span>${discountedTotal.toFixed(2)}</span> + ${totalEnrollmentFees.toFixed(2)} enrollment fee(s)
              </div>
              <div
                className={`text-base font-semibold ${formData.payment.paymentOption === "full-program" ? "text-green-600" : "text-primary"}`}
              >
                Due today: ${calculateDueToday(formData.payment.paymentOption as PaymentOption).toFixed(2)}
              </div>
            </div>
            {formData.payment.paymentOption === "full-program" && (
              <div className="absolute top-3 right-3">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
              </div>
            )}
          </button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="p-4 bg-muted/30 border-b">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Payment Method</h3>
              <div className="text-sm">
                <span className="text-muted-foreground">Total due today:</span>{" "}
                <span className="font-bold ml-1 text-primary">
                  ${calculateDueToday(formData.payment.paymentOption as PaymentOption).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center mb-3">
                  <CreditCard size={20} className="text-muted-foreground mr-2" />
                  <span className="font-medium">Card Information</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-3 border rounded-md text-sm"
                      value={formData.payment.cardNumber || ""}
                      onChange={(e) =>
                        updateFormData({
                          payment: { ...formData.payment, cardNumber: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">Expiration Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full p-3 border rounded-md text-sm"
                        value={formData.payment.expiry || ""}
                        onChange={(e) =>
                          updateFormData({
                            payment: { ...formData.payment, expiry: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full p-3 border rounded-md text-sm"
                        value={formData.payment.cvc || ""}
                        onChange={(e) =>
                          updateFormData({
                            payment: { ...formData.payment, cvc: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-primary/90 transition-colors mt-4 flex items-center justify-center">
                Pay ${calculateDueToday(formData.payment.paymentOption as PaymentOption).toFixed(2)} Now
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentStep; 