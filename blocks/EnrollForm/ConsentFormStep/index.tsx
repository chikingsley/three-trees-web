"use client"

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import StepHeader from "@/components/StepHeader";
import type { EnrollmentFormData } from "@/lib/form-types";

const ConsentFormStep: React.FC = () => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<EnrollmentFormData>();

  return (
    <>
      <StepHeader
        title="Review Program Agreement"
        subtitle="Please read and sign the following document"
      />
      <div className="space-y-4 rounded-lg">
        <div className="h-56 overflow-y-auto p-3 rounded-lg border border-border mb-2 text-xs">
          <p className="text-muted-foreground mb-3">
            This PROGRAM AGREEMENT (&quot;Agreement&quot;) is made and entered into as of the date of signature below, by
            and between the Participant and the Program Provider.
          </p>
          <p className="text-muted-foreground mb-3">
            <strong>1. PROGRAM PARTICIPATION.</strong> Participant agrees to attend all scheduled sessions on time and
            participate fully in all program activities. Participant understands that missing sessions may result in
            program failure and possible court notification.
          </p>
          <p className="text-muted-foreground mb-3">
            <strong>2. CONFIDENTIALITY.</strong> Participant information will be kept confidential except as required by
            law or court order. Group discussions are confidential and participants agree not to disclose information
            about other participants outside of sessions.
          </p>
          <p className="text-muted-foreground mb-3">
            <strong>3. PROGRAM RULES.</strong> Participant agrees to abide by all program rules, including but not limited
            to: maintaining sobriety during sessions, treating staff and other participants with respect, completing all
            assignments, and adhering to payment schedules.
          </p>
        </div>

        <Controller
          name="documents.agreedToTerms"
          control={control}
          render={({ field }) => (
            <div className="flex items-center p-2 rounded-lg hover:bg-muted/50 cursor-pointer" onClick={() => field.onChange(!field.value)}>
              <Checkbox
                id="agreedToTerms"
                checked={field.value}
                onCheckedChange={field.onChange} // RHF handles state
                className="mr-2"
              />
              <Label htmlFor="agreedToTerms" className="text-xs text-muted-foreground font-normal cursor-pointer">
                I have read and agree to the Program Agreement.
              </Label>
            </div>
          )}
        />
        {errors.documents?.agreedToTerms?.message && (
          <p className="text-xs text-red-500 px-2 -mt-2">{errors.documents.agreedToTerms.message as string}</p>
        )}

        {/* Electronic Signature - This is a placeholder. Real e-signature is complex. */}
        {/* For RHF, if signature was a text field, you would register it. */}
        {/* Since it's a visual concept here, we don't tie it to RHF state unless it becomes an input */}
        <div className="p-2 rounded-lg mt-2">
          <Label className="block text-sm font-medium mb-2">Electronic Signature</Label>
          <div className="border border-border rounded-md h-20 flex items-center justify-center bg-background">
            {/* If methods.watch("documents.signature") had a value, you could display it here */}
            <span className="text-muted-foreground text-sm">Sign here (Visual Placeholder)</span>
          </div>
          <Button
            variant="link"
            className="mt-1 p-0 h-auto text-primary text-xs"
            onClick={() => setValue("documents.signature", "", { shouldValidate: false, shouldDirty: false })} // Example: Clear a signature if it were RHF state
          >
            Clear signature
          </Button>
          {errors.documents?.signature?.message && (
            <p className="text-xs text-red-500 pt-1">{errors.documents.signature.message as string}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ConsentFormStep; 