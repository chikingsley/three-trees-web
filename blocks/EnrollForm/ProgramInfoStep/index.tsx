"use client"

import React, { useEffect, useState, useRef } from "react"
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
import { PROGRAM_DATA } from "@/lib/form-types";
import StepHeader from "@/components/StepHeader"
import { cn } from "@/lib/utils"

// Define types for API data
interface ApiCounty {
  id: string;
  name: string;
  // add other county fields if necessary
}

interface ApiReferralSourceType {
  id: string;
  name: string;
  // add other type fields if necessary
}

interface ApiReferralSource {
  id: string;
  name: string; // Name of the specific referral source agency/entity
  county: string | ApiCounty; // Can be ID or populated object
  sourceType: ApiReferralSourceType; // Assuming depth=1 populates this
  // add other source fields if necessary
}

const ProgramInfoStep: React.FC = () => {
  const { control, watch, setValue, clearErrors } = useFormContext<EnrollmentFormData>();
  const watchedReferralSource = watch("personalInfo.referralSource");
  const watchedCounty = watch("personalInfo.county");

  const [countiesList, setCountiesList] = useState<ApiCounty[]>([]);
  const [isLoadingCounties, setIsLoadingCounties] = useState(false);

  const [referralSourceTypesForCounty, setReferralSourceTypesForCounty] = useState<ApiReferralSourceType[]>([]);
  const [isLoadingReferralSourceTypes, setIsLoadingReferralSourceTypes] = useState(false);

  // Track previous values to prevent clearing on mount
  const previousCountyRef = useRef<string | undefined>(undefined);
  const previousReferralSourceRef = useRef<string | undefined>(undefined);

  // Fetch counties on mount
  useEffect(() => {
    const fetchCounties = async () => {
      setIsLoadingCounties(true);
      try {
        const response = await fetch('/api/counties?limit=200&sort=name'); // Sort by name for user convenience
        if (!response.ok) {
          throw new Error('Failed to fetch counties');
        }
        const data = await response.json();
        setCountiesList(data.docs || []);
      } catch (error) {
        console.error("Error fetching counties:", error);
        // Optionally, set an error state here to display to the user
      } finally {
        setIsLoadingCounties(false);
      }
    };
    fetchCounties();
  }, []);

  // Effect to fetch referral source types when county changes
  useEffect(() => {
    const fetchReferralSourceTypes = async () => {
      if (watchedCounty && watchedCounty !== 'Other') {
        setIsLoadingReferralSourceTypes(true);
        setReferralSourceTypesForCounty([]); // Clear previous types

        // Find the ID of the selected county
        const selectedCountyObj = countiesList.find(c => c.name === watchedCounty);
        if (!selectedCountyObj) {
          console.warn("Selected county object not found in countiesList");
          setIsLoadingReferralSourceTypes(false);
          return;
        }
        const selectedCountyId = selectedCountyObj.id;

        try {
          // Fetch referral sources for the selected county, with sourceType populated
          const response = await fetch(`/api/referral-sources?where[county][equals]=${selectedCountyId}&depth=1&limit=200`);
          if (!response.ok) {
            throw new Error('Failed to fetch referral sources for county');
          }
          const data: { docs: ApiReferralSource[] } = await response.json();
          
          const uniqueTypes: ApiReferralSourceType[] = [];
          const typeIdsSeen = new Set<string>();

          if (data.docs) {
            data.docs.forEach(source => {
              if (source.sourceType && source.sourceType.id && !typeIdsSeen.has(source.sourceType.id)) {
                uniqueTypes.push({ id: source.sourceType.id, name: source.sourceType.name });
                typeIdsSeen.add(source.sourceType.id);
              }
            });
          }
          // Sort types by name
          uniqueTypes.sort((a, b) => a.name.localeCompare(b.name));
          setReferralSourceTypesForCounty(uniqueTypes);

        } catch (error) {
          console.error("Error fetching referral source types:", error);
        } finally {
          setIsLoadingReferralSourceTypes(false);
        }
      } else {
        // If county is 'Other' or not selected, clear the types and reset form field
        setReferralSourceTypesForCounty([]);
      }
    };

    // Only reset dependent fields when county actually changes, not on initial mount
    const countyActuallyChanged = previousCountyRef.current !== undefined && 
                                  previousCountyRef.current !== watchedCounty;
    
    if (countyActuallyChanged) {
      setValue("personalInfo.referralSource", "", { shouldValidate: true });
      clearErrors("personalInfo.referralSource");
      if (watchedReferralSource === 'Other') { // If it was 'Other', clear the 'Other' text field too
          setValue("personalInfo.referralSourceOther", "", { shouldValidate: true });
          clearErrors("personalInfo.referralSourceOther");
      }
    }
    
    // Update the previous county ref
    previousCountyRef.current = watchedCounty;
    
    fetchReferralSourceTypes();

  }, [watchedCounty, countiesList, setValue, clearErrors, watchedReferralSource]); // Added watchedReferralSource dependency

  // Effect to clear countyOther if county is not 'Other'
  useEffect(() => {
    if (watchedCounty !== 'Other') {
      const countyOtherValue = watch("personalInfo.countyOther"); // Get current value before clearing
      if (countyOtherValue) { // Only clear if it has a value
        setValue("personalInfo.countyOther", "", { shouldValidate: true });
        clearErrors("personalInfo.countyOther");
      }
    }
  }, [watchedCounty, setValue, clearErrors, watch]);

  // Effect to clear referralSourceOther if referralSource is not 'Other'
  useEffect(() => {
    // Only clear if referralSource actually changed from 'Other' to something else
    const referralSourceChangedFromOther = previousReferralSourceRef.current === 'Other' && 
                                           watchedReferralSource !== 'Other';
    
    if (referralSourceChangedFromOther) {
      const referralSourceOtherValue = watch("personalInfo.referralSourceOther");
      if (referralSourceOtherValue) { // Only clear if it has a value
        setValue("personalInfo.referralSourceOther", "", { shouldValidate: true });
        clearErrors("personalInfo.referralSourceOther");
      }
    }
    
    // Update the previous referral source ref
    previousReferralSourceRef.current = watchedReferralSource;
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

        {/* Conditional layout based on whether County "Other" is selected */}
        {!isCountyOtherActive ? (
          // When County is NOT "Other": Show County and Referral Source Type on same line
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
            <FormField
              control={control}
              name="personalInfo.county"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">Referral County <span className="">*</span></FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                    disabled={isLoadingCounties}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white w-full">
                        <SelectValue placeholder={isLoadingCounties ? "Loading counties..." : "Select county..."} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingCounties ? (
                        <SelectItem value="loading" disabled>Loading...</SelectItem>
                      ) : (
                        <>
                          {countiesList.map((county) => (
                            <SelectItem key={county.id} value={county.name}>{county.name}</SelectItem>
                          ))}
                        </>
                      )}
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="personalInfo.referralSource"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">Referral Source Type <span className="">*</span></FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                    disabled={isLoadingCounties || isLoadingReferralSourceTypes || !watchedCounty}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white w-full">
                        <SelectValue placeholder={
                          isLoadingReferralSourceTypes ? "Loading types..." : 
                          isLoadingCounties ? "Loading counties..." :
                          !watchedCounty ? "Select county first" :
                          referralSourceTypesForCounty.length === 0 && watchedCounty === 'Other' ? "Select 'Other' or specify below" :
                          referralSourceTypesForCounty.length === 0 && watchedCounty !== 'Other' ? "No types found for this county" :
                          "Select referral source type..."
                        } />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingReferralSourceTypes ? (
                        <SelectItem value="loading_types" disabled>Loading types...</SelectItem>
                      ) : referralSourceTypesForCounty.length === 0 && watchedCounty && watchedCounty !== 'Other' ? (
                        <SelectItem value="no_types" disabled>No types found for this county</SelectItem>
                      ) : (
                        <>
                          {referralSourceTypesForCounty.map((type) => (
                            <SelectItem key={type.id} value={type.name}>{type.name}</SelectItem>
                          ))}
                        </>
                      )}
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ) : (
          // When County IS "Other": Keep original two-line layout
          <>
            {/* County Row */}
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
              <FormField
                control={control}
                name="personalInfo.county"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">Referral County <span className="">*</span></FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                      disabled={isLoadingCounties}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white w-full">
                          <SelectValue placeholder={isLoadingCounties ? "Loading counties..." : "Select county..."} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingCounties ? (
                          <SelectItem value="loading" disabled>Loading...</SelectItem>
                        ) : (
                          <>
                            {countiesList.map((county) => (
                              <SelectItem key={county.id} value={county.name}>{county.name}</SelectItem>
                            ))}
                          </>
                        )}
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
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">
                      Please specify county <span className="">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter county name..." 
                        {...field} 
                        className="bg-white"
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
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">Referral Source Type <span className="">*</span></FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                      disabled={isLoadingCounties || isLoadingReferralSourceTypes || !watchedCounty}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white w-full">
                          <SelectValue placeholder={
                            isLoadingReferralSourceTypes ? "Loading types..." : 
                            isLoadingCounties ? "Loading counties..." :
                            !watchedCounty ? "Select county first" :
                            referralSourceTypesForCounty.length === 0 && watchedCounty === 'Other' ? "Select 'Other' or specify below" :
                            referralSourceTypesForCounty.length === 0 && watchedCounty !== 'Other' ? "No types found for this county" :
                            "Select referral source type..."
                          } />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingReferralSourceTypes ? (
                          <SelectItem value="loading_types" disabled>Loading types...</SelectItem>
                        ) : referralSourceTypesForCounty.length === 0 && watchedCounty && watchedCounty !== 'Other' ? (
                          <SelectItem value="no_types" disabled>No types found for this county</SelectItem>
                        ) : (
                          <>
                            {referralSourceTypesForCounty.map((type) => (
                              <SelectItem key={type.id} value={type.name}>{type.name}</SelectItem>
                            ))}
                          </>
                        )}
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
                  <FormItem className={cn(
                    "transition-all duration-200",
                    !isReferralOtherActive && "hidden"
                  )}>
                    <FormLabel className="text-sm">
                      Please specify source type <span className="">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter source type..." 
                        {...field} 
                        className="bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        {/* Referral Source Other field - shown only when Referral Source is "Other" and County is not "Other" */}
        {!isCountyOtherActive && isReferralOtherActive && (
          <FormField
            control={control}
            name="personalInfo.referralSourceOther"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm">
                  Please specify source type <span className="">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter source type..." 
                    {...field} 
                    className="bg-white"
                  />
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
            <FormItem className="w-full">
              <FormLabel className="text-sm">Select Program <span className="">*</span></FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white w-full">
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
            <FormItem className="w-full">
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