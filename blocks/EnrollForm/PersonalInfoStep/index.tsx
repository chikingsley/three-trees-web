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
import { countyNames, referralSources, PROGRAM_DATA } from "@/lib/form-types";
import StepHeader from "@/components/StepHeader"

const PersonalInfoStep: React.FC = () => {
  const { 
    control,
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
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="personalInfo.firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">First Name <span className="">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name..." {...field} className="bg-white"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="personalInfo.lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Last Name <span className="">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Enter last name..." {...field} className="bg-white"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="personalInfo.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">City <span className="">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Enter your city" {...field} className="bg-white"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="personalInfo.sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Sex <span className="">*</span></FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select sex..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <FormField
              control={control}
              name="personalInfo.county"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">County <span className="">*</span></FormLabel>
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
          </div>
          {watchedCounty === 'Other' && (
            <div className="flex-1">
              <FormField
                control={control}
                name="personalInfo.countyOther"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Enter county name<span className="">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Enter county name..." {...field} className="bg-white"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
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
                  <FormItem className="mt-4">
                    <FormLabel className="text-sm">Please specify source <span className="">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Enter referral source..." {...field} className="bg-white"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <div>
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
          </div>
        </div>

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

export default PersonalInfoStep; 