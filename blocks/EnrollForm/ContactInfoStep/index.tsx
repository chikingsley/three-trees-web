"use client"

import React from "react"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import type { EnrollmentFormData } from "@/lib/form-types";
import StepHeader from "@/components/StepHeader"

// TODO: Consider adding a list of states for a dropdown, e.g., stateNames from form-types or a local const
const stateAbbreviations = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const ContactInfoStep: React.FC = () => {
  const { control } = useFormContext<EnrollmentFormData>();

  return (
    <>
      <StepHeader
        title="Your Contact Information"
        subtitle="Please provide your personal and contact details."
      />
      <div className="space-y-4 rounded-lg">
        {/* First Name / Last Name Row */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="personalInfo.firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">First Name <span className="">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name..." {...field} className="bg-white" />
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
                  <Input placeholder="Enter last name..." {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Email / Phone / Sex Row */}
        <div className="grid grid-cols-2 md:grid-cols-[auto_auto_auto] gap-4">
          <FormField
            control={control}
            name="personalInfo.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Email <span className="">*</span></FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email..." {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="personalInfo.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Phone <span className="">*</span></FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Enter your phone..." {...field} className="bg-white" />
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

        {/* City / State / Zip Row */}
        <div className="grid grid-cols-2 md:grid-cols-[1fr_auto_auto] gap-4">
          <FormField
            control={control}
            name="personalInfo.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">City <span className="">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Enter your city" {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="personalInfo.state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">State <span className="">*</span></FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select state..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {stateAbbreviations.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="personalInfo.zipcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Zip Code <span className="">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="5-digit zip" {...field} className="bg-white" maxLength={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="personalInfo.consentToContact"
          render={({ field }) => (
            <FormItem className="mt-6">
              <div className="rounded-md border p-4 shadow bg-white flex flex-row items-start space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="consent-checkbox"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel htmlFor="consent-checkbox" className="text-sm font-normal cursor-pointer">
                    By checking this box, you agree to be contacted by Three Trees via email or phone regarding your enrollment and our services.**
                  </FormLabel>
                </div>
              </div>
              <div className="pt-1">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
    </>
  )
}

export default ContactInfoStep; 