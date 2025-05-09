"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react"; 
import type { LucideProps } from "lucide-react";

interface PaymentOptionCardProps {
  title: string;
  IconComponent: React.ElementType<LucideProps>;
  dueTodayAmount: number;
  isSelected: boolean;
  onClick: () => void;
  discountText?: string; 
  optionId: string; 
}

const PaymentOptionCard: React.FC<PaymentOptionCardProps> = ({
  title,
  IconComponent,
  dueTodayAmount,
  isSelected,
  onClick,
  discountText,
  optionId,
}) => {
  let titleLine1 = title;
  let titleLine2 = "";
  const lastSpaceIndex = title.lastIndexOf(" ");

  if (title.includes("Prepay Full Program")) { 
    titleLine1 = "Prepay Full";
    titleLine2 = "Program";
  } else if (lastSpaceIndex > 0 && lastSpaceIndex < title.length - 1) {
    const potentialLine1 = title.substring(0, lastSpaceIndex);
    const potentialLine2 = title.substring(lastSpaceIndex + 1);
    if (potentialLine2) { 
      titleLine1 = potentialLine1;
      titleLine2 = potentialLine2;
    }
  }

  return (
    <button
      type="button"
      className={`relative p-3 rounded-lg border transition-colors text-sm flex flex-col justify-between h-full w-full
        ${isSelected
          ? "bg-white border-primary ring-2 ring-primary"
          : "bg-muted/10 border-border hover:bg-gray-50"
        }`}
      onClick={onClick}
      aria-pressed={isSelected}
      data-testid={`payment-option-${optionId}`}
    >
      {/* Top Section: Icon and Title */}
      <div className="w-full flex-grow flex flex-col items-center justify-center text-center mb-1">
        <IconComponent className="w-6 h-6 mb-1.5 text-primary" />
        <div className="font-medium text-sm leading-tight">
          <div>{titleLine1}</div>
          {titleLine2 && <div>{titleLine2}</div>}
        </div>
      </div>

      {/* Bottom Section: Discount and Due Today */}
      <div className="mt-auto text-center pt-1">
        {discountText && (
          <div
            className={`text-xs mb-1 text-center ${
              discountText.includes("Save")
                ? "text-green-600"
                : "text-muted-foreground"
              }`}
          >
            {discountText}
          </div>
        )}
        <div
          className={`text-xs ${isSelected ? "text-primary font-medium" : "text-foreground"
            }`}
        >
          Due today:
        </div>
        <div
          className={`text-sm font-semibold ${isSelected ? "text-primary" : "text-foreground"
            }`}
        >
          ${dueTodayAmount.toFixed(2)}
        </div>
      </div>

      {isSelected && (
        <div className="absolute top-2 right-2">
          <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-3 h-3 text-green-600" />
          </div>
        </div>
      )}
    </button>
  );
};

export default PaymentOptionCard; 