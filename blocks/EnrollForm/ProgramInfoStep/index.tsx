"use client"

import React from "react"
import { useFormContext, useWatch } from "react-hook-form"
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
import { referralSources, PROGRAM_DATA } from "@/lib/form-types";
import StepHeader from "@/components/StepHeader"

const ProgramInfoStep: React.FC = () => {
  const { control } = useFormContext<EnrollmentFormData>();
  const watchedReferralSource = useWatch({ control, name: "personalInfo.referralSource" });

  return (
    <>
      <StepHeader 
        title="Program & Referral Information"
        subtitle="Tell us about the program you're interested in and how you heard about us."
      />
      <div className="space-y-4 rounded-lg">
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

        {watchedReferralSource === 'Other' && (
          <FormField
            control={control}
            name="personalInfo.referralSourceOther"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Please specify source <span className="">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Enter referral source..." {...field} className="bg-white"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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