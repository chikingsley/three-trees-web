"use client"

import React from "react"
import { useFormContext, useWatch } from "react-hook-form"
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
import { countyNames } from "@/lib/form-types"; // Assuming stateNames will be added or handled
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
  const watchedCounty = useWatch({ control, name: "personalInfo.county" });

  return (
    <>
      <StepHeader 
        title="Your Contact Information"
        subtitle="Please provide your personal and contact details."
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
            name="personalInfo.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Email <span className="">*</span></FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email..." {...field} className="bg-white"/>
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
                  <Input type="tel" placeholder="Enter your phone..." {...field} className="bg-white"/>
                </FormControl>
                <FormMessage /> 
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                    <Input placeholder="5-digit zip" {...field} className="bg-white" maxLength={5}/>
                    </FormControl>
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
                    <FormLabel className="text-sm">Please specify county <span className="">*</span></FormLabel>
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

        <FormField
            control={control}
            name="personalInfo.consentToContact"
            render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow bg-white mt-6">
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                        By checking this box, you agree to be contacted by Three Trees via email or phone regarding your enrollment and our services. <span className="">*</span>
                        </FormLabel>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
      </div>
    </>
  )
}

export default ContactInfoStep; 