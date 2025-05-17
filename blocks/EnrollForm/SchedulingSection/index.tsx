"use client"

import React, { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import type { EnrollmentFormData } from '@/lib/form-types'; // RHF data structure
import type { Program, Class, ProgramGroup } from '@/payload-types'; // Payload types for API data
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface SchedulingSectionProps {
  selectedProgramFullDetails: Program | null;
  clientSex: string | undefined;
}

export default function SchedulingSection({
  selectedProgramFullDetails,
  clientSex,
}: SchedulingSectionProps) {
  const { control, setValue, formState: { errors }, trigger } = useFormContext<EnrollmentFormData>();
  const [availableClasses, setAvailableClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      if (!selectedProgramFullDetails || !clientSex) {
        setAvailableClasses([]);
        return;
      }

      let programGroupId: string | undefined;
      const pg = selectedProgramFullDetails.programGroup;
      if (pg) {
        if (typeof pg === 'string') {
          programGroupId = pg;
        } else if (typeof pg === 'object' && (pg as ProgramGroup).id) {
          programGroupId = (pg as ProgramGroup).id;
        }
      }

      if (!programGroupId) {
        // Use a state setter for errors if you intend to display them
        // For now, console.log and clear classes
        console.error(`Program group information is missing for the selected program '${selectedProgramFullDetails.name}'. Cannot fetch classes.`);
        setAvailableClasses([]);
        return;
      }

      setIsLoading(true);
      // setError(null); // Clear previous errors if using setError state

      // const genderFilters = ['all_genders'];
      // const lowerClientSex = clientSex.toLowerCase();
      // if (lowerClientSex === 'male' || lowerClientSex === 'female') {
      //   genderFilters.push(lowerClientSex);
      // }

      // const genderQueryParam = `where[genderAffinity][in]=${genderFilters.join(',')}`;
      const programGroupQueryParam = `where[programGroup][equals]=${programGroupId}`;

      try {
        const apiUrl = `/api/classes?${programGroupQueryParam}&limit=100&depth=1&sort=time&where[isActive][equals]=true`; // Assuming sort by time is useful
        console.log("Fetching classes from:", apiUrl);
        const response = await fetch(apiUrl);

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error fetching classes:", errorData);
          // setError(errorData.message || errorData.errors?.[0]?.message || 'Failed to fetch classes');
          throw new Error(errorData.message || errorData.errors?.[0]?.message || 'Failed to fetch classes');
        }
        const data = await response.json();
        const fetchedClasses = data.docs || [];
        setAvailableClasses(fetchedClasses);

        // if (fetchedClasses.length === 0 && setError) {
        //     setError(null); 
        // }

      } catch (err) {
        console.error(err);
        // if (setError) {
        //   const errorMessage = err instanceof Error ? err.message : String(err);
        //   setError(`Failed to load class schedules: ${errorMessage}`);
        // }
        setAvailableClasses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
  }, [selectedProgramFullDetails, clientSex]); // Removed setError from dependencies

  const handleClassSelection = (classId: string) => {
    setValue('scheduling.selectedClassId', classId, { shouldValidate: true });
    trigger('scheduling.selectedClassId');
  };

  if (isLoading) {
    return (
      <div className="space-y-4 pt-4">
        <p className="text-center text-muted-foreground">Loading available schedules...</p>
        {[1, 2, 3].map(i => (
          <Card key={i} className="bg-muted/30">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-1" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  const localError = errors.scheduling?.selectedClassId?.message; // Using RHF error for display

  if (availableClasses.length === 0 && !isLoading && selectedProgramFullDetails) {
    return (
      <Alert className="mt-4">
         <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Classes Available</AlertTitle>
        <AlertDescription>
          No classes are currently available that match the selected program (<strong>{selectedProgramFullDetails.name}</strong>) and your specified criteria. Please check back later or contact us for assistance.
        </AlertDescription>
      </Alert>
    );
  }
  
  if (!selectedProgramFullDetails) {
     return (
      <Alert variant="default" className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Program Information Missing</AlertTitle>
        <AlertDescription>
          Waiting for program selection from the previous step.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="mt-2 border-0 shadow-none md:border md:shadow-sm">
      <CardHeader className="px-0 md:px-6">
        <CardTitle>Select a Class Schedule</CardTitle>
        {selectedProgramFullDetails && (
          <CardDescription>
            Choose a class time that works for you for the program: <strong>{selectedProgramFullDetails.name}</strong>.
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="px-0 md:px-6">
                <Controller
          name="scheduling.selectedClassId"
                  control={control}
          rules={{ required: "Please select a class schedule." }}
                  render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                handleClassSelection(value);
              }}
              className="space-y-3"
            >
              {availableClasses.map((classDoc: Class) => {
                const spotsAvailable = classDoc.spotsAvailable ?? 0;
                const isFull = spotsAvailable <= 0;
                const isSelected = field.value === classDoc.id;

                // Prepare display text, using fallbacks if virtual fields are not populated yet
                // or if some fields used by classBlockIdentifier are missing temporarily during data load.
                let displayIdentifier = `Class on ${classDoc.day || 'N/A'} at ${classDoc.time || 'N/A'}`;
                if (classDoc.classBlockIdentifier) {
                    displayIdentifier = classDoc.classBlockIdentifier;
                } else if (classDoc.programGroup && typeof classDoc.programGroup === 'object' && (classDoc.programGroup as ProgramGroup).name) {
                    displayIdentifier = `${(classDoc.programGroup as ProgramGroup).name} - ${classDoc.day || ''} ${classDoc.time || ''} (x${classDoc.numberOfParallelClasses || 1})`;
                }


                return (
                  <Label
                    key={classDoc.id}
                    htmlFor={`class-${classDoc.id}`}
                          className={cn(
                      "flex flex-col items-start space-y-1.5 rounded-md border p-3 transition-all duration-150 ease-in-out",
                      "hover:shadow-md",
                      isFull ? "cursor-not-allowed bg-muted/50 opacity-70" : "cursor-pointer hover:border-primary/70",
                      isSelected ? "border-primary ring-2 ring-primary ring-offset-1 ring-offset-background" : "border-border",
                    )}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value={classDoc.id}
                          id={`class-${classDoc.id}`}
                          disabled={isFull}
                          checked={isSelected}
                        />
                        <span className="font-semibold text-md">
                          {displayIdentifier}
                        </span>
                      </div>
                      <Badge variant={isFull ? "destructive" : (spotsAvailable < 5 ? "secondary" : "default")}>
                        {isFull ? 'Full' : `${spotsAvailable} spot${spotsAvailable === 1 ? '' : 's'} available`}
                      </Badge>
                    </div>
                    <div className="pl-8 text-sm text-muted-foreground space-y-0.5">
                      <p><strong>Day:</strong> {classDoc.day || 'N/A'}</p>
                      <p><strong>Time:</strong> {classDoc.time || 'N/A'}</p>
                      {classDoc.genderSpecific && <p><strong>Gender Specific:</strong> <span className="capitalize">{classDoc.genderSpecific}</span></p>}
                      {/* 
                        If you add fields like 'startDate', 'durationMinutes', 'meetingType', 'locationDescription', 'notes' 
                        to your 'Classes' collection in Payload, and regenerate types, you can uncomment these:
                      */}
                      {/* {classDoc.startDate && <p><strong>Starts:</strong> {new Date(classDoc.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>} */}
                      {/* {classDoc.durationMinutes && <p><strong>Duration:</strong> {classDoc.durationMinutes} minutes</p>} */}
                      {/* {classDoc.meetingType && <p><strong>Type:</strong> <span className="capitalize">{classDoc.meetingType.replace(/_/g, ' ')}</span></p>} */}
                      {/* {classDoc.locationDescription && <p><strong>Location:</strong> {classDoc.locationDescription}</p>} */}
                      {/* {classDoc.notes && <p className="italic text-xs pt-1">Note: {classDoc.notes}</p>} */}
              </div>
                  </Label>
                );
              })}
            </RadioGroup>
          )}
        />
        {localError && ( // Use localError derived from RHF
          <p className="mt-2 text-sm text-destructive">
            {localError}
        </p>
      )}
      </CardContent>
    </Card>
  );
}