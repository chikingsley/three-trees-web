"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// Type definition for PersonalInfo (previously in page.tsx)
export interface PersonalInfo {
  firstName: string
  lastName: string
  city: string
  county: string
  referralSource: string
}

interface PersonalInfoFormProps {
  formData: PersonalInfo
  updateFormData: (data: Partial<PersonalInfo>) => void
}

const PersonalInfoStep: React.FC<PersonalInfoFormProps> = ({
  formData,
  updateFormData,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="pt-2 md:pt-2 px-0"
  >
    <div className="mb-4 text-center">
      <h2 className="text-2xl font-bold mb-1 text-primary">Tell us about yourself</h2>
      <p className="text-muted-foreground text-sm">We&apos;ll use this information to set up your account</p>
    </div>

    <div className="space-y-4 p-2 rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name*</Label>
          <Input
            id="firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name*</Label>
          <Input
            id="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City*</Label>
          <Input
            id="city"
            placeholder="Your city"
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="county">County*</Label>
          <Input
            id="county"
            placeholder="Your county"
            value={formData.county}
            onChange={(e) => updateFormData({ county: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="referralSource">Referral Source*</Label>
        <div className="w-full">
          <Select value={formData.referralSource} onValueChange={(value) => updateFormData({ referralSource: value })}>
            <SelectTrigger id="referralSource" className="w-full min-w-0 text-sm md:text-base px-3 py-2 md:py-2.5">
              <SelectValue placeholder="Select your referral source" />
            </SelectTrigger>
            <SelectContent className="w-full min-w-0">
              <SelectItem value="court">Court Mandated</SelectItem>
              <SelectItem value="probation">Probation Officer</SelectItem>
              <SelectItem value="attorney">Attorney</SelectItem>
              <SelectItem value="self">Self Referral</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  </motion.div>
)

export default PersonalInfoStep; 