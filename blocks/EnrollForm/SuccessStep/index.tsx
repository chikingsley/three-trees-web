"use client"

import type React from "react"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Specific FormData type for SuccessStep's needs
interface SuccessStepFormData {
  personalInfo: {
    firstName?: string
  }
  scheduling: {
    selectedDay?: string
    selectedTime?: string
  }
  // Add other parts of FormData if SuccessStep ever needs them
}

interface SuccessStepProps {
  formData: SuccessStepFormData
}

const SuccessStep: React.FC<SuccessStepProps> = ({ formData }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="pt-8 md:pt-8 px-0 text-center"
  >
    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <CheckCircle2 size={40} className="text-green-600" />
    </div>
    <h2 className="text-3xl font-bold mb-3 text-primary">Enrollment Complete!</h2>
    <p className="text-xl text-muted-foreground mb-6">
      Thank you for completing your enrollment
      {formData.personalInfo.firstName ? `, ${formData.personalInfo.firstName}` : ""}. We&apos;ve sent a confirmation
      email with all the details.
    </p>
    <div className="max-w-md mx-auto border border-border rounded-lg p-5 text-left mb-6 shadow-sm">
      <h3 className="font-medium text-lg mb-4">Your Next Steps:</h3>
      <ul className="space-y-3">
        <li className="flex items-center">
          <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center mr-3 shrink-0">
            <span className="text-green-600 text-sm font-bold">1</span>
          </div>
          <span>Check your email for program details and materials</span>
        </li>
        <li className="flex items-center">
          <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center mr-3 shrink-0">
            <span className="text-green-600 text-sm font-bold">2</span>
          </div>
          <span>
            Attend your first session {formData.scheduling.selectedDay ? `on ${formData.scheduling.selectedDay}` : ""}{" "}
            {formData.scheduling.selectedTime ? `at ${formData.scheduling.selectedTime.split(" - ")[0]}` : ""}
          </span>
        </li>
        <li className="flex items-center">
          <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center mr-3 shrink-0">
            <span className="text-green-600 text-sm font-bold">3</span>
          </div>
          <span>Complete any pre-session assignments if provided</span>
        </li>
      </ul>
    </div>
    <Button className="bg-primary text-primary-foreground px-6 py-2 text-base h-auto">Go to Your Dashboard</Button>
  </motion.div>
)

export default SuccessStep; 