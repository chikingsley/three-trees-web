"use client"

import React, { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import type { EnrollmentFormData } from "@/lib/form-types";
import { referralSources, PROGRAM_DATA, countyNames } from "@/lib/form-types";
import StepHeader from "@/components/StepHeader"
import { cn } from "@/lib/utils"

const ProgramInfoStep: React.FC = () => {
  const { control, watch, setValue, clearErrors } = useFormContext<EnrollmentFormData>();
  const watchedReferralSource = watch("personalInfo.referralSource");
  const watchedCounty = watch("personalInfo.county");

  // Effect to clear countyOther if county is not 'Other'
  useEffect(() => {
    if (watchedCounty !== 'Other') {
      const countyOtherValue = watch("personalInfo.countyOther"); // Get current value before clearing
      if (countyOtherValue) { // Only clear if it has a value
        setValue("personalInfo.countyOther", "", { shouldValidate: true });
        clearErrors("personalInfo.countyOther");
      }
    }
  }, [watchedCounty, setValue, clearErrors, watch]); // watch is stable, but good to include if directly used

  // Effect to clear referralSourceOther if referralSource is not 'Other'
  useEffect(() => {
    if (watchedReferralSource !== 'Other') {
      const referralSourceOtherValue = watch("personalInfo.referralSourceOther");
      if (referralSourceOtherValue) { // Only clear if it has a value
        setValue("personalInfo.referralSourceOther", "", { shouldValidate: true });
        clearErrors("personalInfo.referralSourceOther");
      }
    }
  }, [watchedReferralSource, setValue, clearErrors, watch]);

  const isReferralOtherActive = watchedReferralSource === 'Other';
  const isCountyOtherActive = watchedCounty === 'Other';

  return (
    <>
      <StepHeader
        title="Program & Referral Information"
        subtitle="Tell us about the program you're interested in and how you heard about us."
      />
      <div className="space-y-4 rounded-lg">

        {/* County Row */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
          <FormField
            control={control}
            name="personalInfo.county"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Referral County <span className="">*</span></FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select county..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countyNames.map((county) => (
                      <SelectItem key={county} value={county}>{county}</SelectItem>
                    ))}
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="personalInfo.countyOther"
            render={({ field }) => (
              <FormItem>
                <FormLabel 
                  className={cn(
                    "text-sm", 
                    !isCountyOtherActive && "text-muted-foreground"
                  )}
                > 
                  {isCountyOtherActive ? 'Please specify county' : 'Other County (if not listed)'} 
                  {isCountyOtherActive && <span className="">*</span>}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter county name..." 
                    {...field} 
                    className={cn(
                      "bg-white", 
                      !isCountyOtherActive && 'cursor-not-allowed opacity-50'
                    )}
                    disabled={!isCountyOtherActive}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Referral Source Row */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
          <FormField
            control={control}
            name="personalInfo.referralSource"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Referral Source <span className="">*</span></FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select referral source..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {referralSources.map((source) => (
                      <SelectItem key={source} value={source}>{source}</SelectItem>
                    ))}
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="personalInfo.referralSourceOther"
            render={({ field }) => (
              <FormItem>
                <FormLabel 
                  className={cn(
                    "text-sm", 
                    !isReferralOtherActive && "text-muted-foreground"
                  )}
                >
                  {isReferralOtherActive ? 'Please specify source' : 'Other Referral Source (if not listed)'} 
                  {isReferralOtherActive && <span className="">*</span>}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter referral source..." 
                    {...field} 
                    className={cn(
                      "bg-white", 
                      !isReferralOtherActive && 'cursor-not-allowed opacity-50'
                    )}
                    disabled={!isReferralOtherActive}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="personalInfo.selectedProgram"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Select Program <span className="">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select the program..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PROGRAM_DATA.map((program) => (
                    <SelectItem key={program.id} value={program.id}>
                      {program.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="personalInfo.whyReferred"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Why were you referred? <span className="">*</span></FormLabel>
              <FormControl>
                <Textarea
                  placeholder="In 1-3 sentences, describe the reason / situation you are being referred for..."
                  className="min-h-[80px] bg-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  )
}

export default ProgramInfoStep; 