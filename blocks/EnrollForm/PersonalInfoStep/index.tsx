"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useFormContext, Controller, useWatch } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { EnrollmentFormData } from "@/lib/form-types"; // Import the main form data type
import { countyNames, referralSources } from "@/lib/form-types"; // Import options

// Local interfaces PersonalInfoData and ExpectedFormValues are removed.

const PersonalInfoStep: React.FC = () => {
  const { 
    register, 
    control,
    formState: { errors } 
  } = useFormContext<EnrollmentFormData>(); // Use the imported EnrollmentFormData type

  // Watch the values of county and referralSource to conditionally show 'Other' fields
  const watchedCounty = useWatch({ control, name: "personalInfo.county" });
  const watchedReferralSource = useWatch({ control, name: "personalInfo.referralSource" });

  // The getErrorMessage helper can be simplified or used directly with the now typed errors object
  // For example: errors.personalInfo?.firstName?.message

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-2 px-0"
    >
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold mb-1 text-primary">Tell us about yourself</h2>
        <p className="text-muted-foreground text-xs">We&apos;ll use this information to set up your account</p>
      </div>

      <div className="space-y-4 rounded-lg">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-sm" htmlFor="firstName">First Name*</Label>
            <Input
              className="text-sm"
              id="firstName"
              placeholder="Enter first name..."
              {...register("personalInfo.firstName")}
            />
            {errors.personalInfo?.firstName?.message && (
              <p className="text-xs text-red-500 pt-1">{errors.personalInfo.firstName.message as string}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label className="text-sm" htmlFor="lastName">Last Name*</Label>
            <Input
              className="text-sm"
              id="lastName"
              placeholder="Enter last name..."
              {...register("personalInfo.lastName")}
            />
            {errors.personalInfo?.lastName?.message && (
              <p className="text-xs text-red-500 pt-1">{errors.personalInfo.lastName.message as string}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-sm" htmlFor="city">City*</Label>
            <Input
              className="text-sm"
              id="city"
              placeholder="Enter city..."
              {...register("personalInfo.city")}
            />
            {errors.personalInfo?.city?.message && (
              <p className="text-xs text-red-500 pt-1">{errors.personalInfo.city.message as string}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label className="text-sm" htmlFor="county">County*</Label>
            <Controller
              name="personalInfo.county"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value ?? ""}>
                  <SelectTrigger id="county" className="w-full min-w-0 text-sm">
                    <SelectValue placeholder="Select county..." />
                  </SelectTrigger>
                  <SelectContent>
                    {countyNames.map((county) => (
                      <SelectItem key={county} value={county}>{county}</SelectItem>
                    ))}
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.personalInfo?.county?.message && (
              <p className="text-xs text-red-500 pt-1">{errors.personalInfo.county.message as string}</p>
            )}
            {watchedCounty === 'Other' && (
              <div className="pt-1 space-y-1">
                <Label htmlFor="countyOther" className="text-xs text-muted-foreground">Please specify county*</Label>
                <Input
                  className="text-sm"
                  id="countyOther"
                  placeholder="Enter county name..."
                  {...register("personalInfo.countyOther")}
                />
                 {errors.personalInfo?.countyOther?.message && (
                    <p className="text-xs text-red-500 pt-1">{errors.personalInfo.countyOther.message as string}</p>
                  )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-sm" htmlFor="referralSource">Referral Source*</Label>
          <Controller
            name="personalInfo.referralSource"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <SelectTrigger id="referralSource" className="w-full min-w-0 text-sm">
                  <SelectValue placeholder="Select referral source..." />
                </SelectTrigger>
                <SelectContent>
                  {referralSources.map((source) => (
                    <SelectItem key={source} value={source}>{source}</SelectItem>
                  ))}
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.personalInfo?.referralSource?.message && (
            <p className="text-xs text-red-500 pt-1">{errors.personalInfo.referralSource.message as string}</p>
          )}
          {watchedReferralSource === 'Other' && (
            <div className="pt-1 space-y-1">
              <Label htmlFor="referralSourceOther" className="text-xs text-muted-foreground">Please specify source*</Label>
              <Input
                className="text-sm"
                id="referralSourceOther"
                placeholder="Enter referral source..."
                {...register("personalInfo.referralSourceOther")}
              />
              {errors.personalInfo?.referralSourceOther?.message && (
                  <p className="text-xs text-red-500 pt-1">{errors.personalInfo.referralSourceOther.message as string}</p>
                )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default PersonalInfoStep; 