"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

// Type definition for DocumentInfo (previously in page.tsx)
export interface DocumentInfo {
  agreedToTerms: boolean
  signature: string
}

interface ConsentFormStepProps {
  formData: DocumentInfo
  updateFormData: (data: Partial<DocumentInfo>) => void
}

const ConsentFormStep: React.FC<ConsentFormStepProps> = ({
  formData,
  updateFormData,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="pt-8 md:pt-8 px-0"
  >
    <div className="mb-4 text-center">
      <h2 className="text-2xl font-bold mb-1 text-primary">Review Program Agreement</h2>
      <p className="text-muted-foreground text-sm">Please read and sign the following document</p>
    </div>

    <div className="p-2 rounded-lg space-y-4">
      <div className="h-56 overflow-y-auto p-4 rounded-lg border border-border mb-2">
        <p className="text-sm text-muted-foreground mb-3">
          This PROGRAM AGREEMENT (&quot;Agreement&quot;) is made and entered into as of the date of signature below, by
          and between the Participant and the Program Provider.
        </p>
        <p className="text-sm text-muted-foreground mb-3">
          <strong>1. PROGRAM PARTICIPATION.</strong> Participant agrees to attend all scheduled sessions on time and
          participate fully in all program activities. Participant understands that missing sessions may result in
          program failure and possible court notification.
        </p>
        <p className="text-sm text-muted-foreground mb-3">
          <strong>2. CONFIDENTIALITY.</strong> Participant information will be kept confidential except as required by
          law or court order. Group discussions are confidential and participants agree not to disclose information
          about other participants outside of sessions.
        </p>
        <p className="text-sm text-muted-foreground mb-3">
          <strong>3. PROGRAM RULES.</strong> Participant agrees to abide by all program rules, including but not limited
          to: maintaining sobriety during sessions, treating staff and other participants with respect, completing all
          assignments, and adhering to payment schedules.
        </p>
      </div>

      <div className="flex items-center p-3 rounded-lg">
        <Checkbox
          id="agree"
          checked={formData.agreedToTerms}
          onCheckedChange={(checked) => updateFormData({ agreedToTerms: checked === true })}
        />
        <Label htmlFor="agree" className="ml-2 text-muted-foreground">
          I have read and agree to the Program Agreement
        </Label>
      </div>

      <div className="p-4 rounded-lg">
        <Label className="block text-lg font-medium mb-3">Electronic Signature</Label>
        <div className="border border-border rounded-md h-24 flex items-center justify-center">
          {/* This will likely need a proper signature pad component in a real app */}
          <span className="text-muted-foreground">Sign here</span> 
        </div>
        <Button
          variant="ghost"
          className="mt-2 p-0 h-auto text-primary"
          onClick={() => updateFormData({ signature: "" })} // Clears signature, actual signing needs more logic
        >
          Clear signature
        </Button>
      </div>
    </div>
  </motion.div>
)

export default ConsentFormStep; 