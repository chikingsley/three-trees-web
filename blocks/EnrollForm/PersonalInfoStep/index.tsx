"use client"

import React from "react"
import { useFormContext, Controller, useWatch } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { EnrollmentFormData } from "@/lib/form-types";
import { countyNames, referralSources, PROGRAM_DATA } from "@/lib/form-types";
import { Textarea } from "@/components/ui/textarea"
import StepHeader from "@/components/StepHeader"

const PersonalInfoStep: React.FC = () => {
  const { 
    register, 
    control,
    formState: { errors } 
  } = useFormContext<EnrollmentFormData>();

  const watchedCounty = useWatch({ control, name: "personalInfo.county" });
  const watchedReferralSource = useWatch({ control, name: "personalInfo.referralSource" });

  return (
    <>
      <StepHeader 
        title="Tell us about yourself"
        subtitle="We'll use this information to set up your account"
      />
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
                  <SelectTrigger id="county" className="w-full min-w-0 text-sm px-3 py-2">
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
                <SelectTrigger id="referralSource" className="w-full min-w-0 text-sm px-3 py-2">
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

        <div className="space-y-1 pt-2">
          <Label className="text-sm" htmlFor="selectedProgram">Select Program*</Label>
          <Controller
            name="personalInfo.selectedProgram"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <SelectTrigger id="selectedProgram" className="w-full min-w-0 text-sm px-3 py-2">
                  <SelectValue placeholder="Select the program..." />
                </SelectTrigger>
                <SelectContent>
                  {PROGRAM_DATA.map((program) => (
                    <SelectItem key={program.id} value={program.id}>
                      {program.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.personalInfo?.selectedProgram?.message && (
            <p className="text-xs text-red-500 pt-1">{errors.personalInfo.selectedProgram.message as string}</p>
          )}
        </div>

        <div className="space-y-1 pt-2">
          <Label className="text-sm" htmlFor="whyReferred">Why were you referred?*</Label>
          <Textarea 
            id="whyReferred"
            placeholder="In 1-3 sentences, describe the reason / situation you are being referred for..."
            className="text-sm min-h-[80px]"
            {...register("personalInfo.whyReferred")}
          />
          {errors.personalInfo?.whyReferred?.message && (
            <p className="text-xs text-red-500 pt-1">{errors.personalInfo.whyReferred.message as string}</p>
          )}
        </div>

      </div>
    </>
  )
}

export default PersonalInfoStep; 