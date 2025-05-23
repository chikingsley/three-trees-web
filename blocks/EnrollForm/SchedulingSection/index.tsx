"use client"

import React, { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import type { EnrollmentFormData } from '@/lib/form-types';
import type { Program, Class, ProgramGroup } from '@/payload-types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AlertCircle, Clock, Users, CheckCircle2 } from 'lucide-react';
import StepHeader from '@/components/StepHeader';
import { motion } from 'framer-motion';

interface SchedulingSectionProps {
  selectedProgramFullDetails: Program | null;
  clientSex: string | undefined;
}

export default function SchedulingSection({
  selectedProgramFullDetails,
  clientSex,
}: SchedulingSectionProps) {
  const { control, setValue, formState: { errors }, trigger, watch } = useFormContext<EnrollmentFormData>();
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
        console.error(`Program group information is missing for the selected program '${selectedProgramFullDetails.name}'. Cannot fetch classes.`);
        setAvailableClasses([]);
        return;
      }

      setIsLoading(true);
      const programGroupQueryParam = `where[programGroup][equals]=${programGroupId}`;

      try {
        const apiUrl = `/api/classes?${programGroupQueryParam}&limit=100&depth=1&sort=time&where[isActive][equals]=true`;
        console.log("Fetching classes from:", apiUrl);
        const response = await fetch(apiUrl);

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error fetching classes:", errorData);
          throw new Error(errorData.message || errorData.errors?.[0]?.message || 'Failed to fetch classes');
        }
        const data = await response.json();
        const fetchedClasses = data.docs || [];
        setAvailableClasses(fetchedClasses);

      } catch (err) {
        console.error(err);
        setAvailableClasses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
  }, [selectedProgramFullDetails, clientSex]);

  const handleClassSelection = (classId: string) => {
    setValue('scheduling.selectedClassId', classId, { shouldValidate: true });
    trigger('scheduling.selectedClassId');
  };

  // Find the selected class details for subtitle
  const selectedClass = availableClasses.find(c => c.id === watch('scheduling.selectedClassId'));
  const selectedClassSubtitle = selectedClass 
    ? `${selectedClass.day} at ${selectedClass.time}` 
    : 'Choose a time that works for you';

  // Group classes by day
  const classesByDay = availableClasses.reduce((acc, classDoc) => {
    const day = classDoc.day || 'Unknown';
    if (!acc[day]) acc[day] = [];
    acc[day].push(classDoc);
    return acc;
  }, {} as Record<string, Class[]>);

  // Order days of the week
  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const orderedDays = dayOrder.filter(day => classesByDay[day]);

  if (isLoading) {
    return (
      <motion.div className="px-0">
        <StepHeader
          title="Select Your Class Schedule"
          subtitle={selectedProgramFullDetails ? `${selectedProgramFullDetails.name} - Choose a time that works for you` : 'Choose a time that works for you'}
        />
        <div className="space-y-4">
          <p className="text-center text-muted-foreground">Loading available schedules...</p>
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      </motion.div>
    );
  }
  
  const localError = errors.scheduling?.selectedClassId?.message;

  if (availableClasses.length === 0 && !isLoading && selectedProgramFullDetails) {
    return (
      <motion.div className="px-0">
        <StepHeader
          title="Select Your Class Schedule"
          subtitle={`${selectedProgramFullDetails.name} - No classes available`}
        />
        <Alert className="max-w-md mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Classes Available</AlertTitle>
          <AlertDescription>
            No classes are currently available for <strong>{selectedProgramFullDetails.name}</strong>. Please check back later or contact us for assistance.
          </AlertDescription>
        </Alert>
      </motion.div>
    );
  }
  
  if (!selectedProgramFullDetails) {
    return (
      <motion.div className="px-0">
        <StepHeader title="Select Your Class Schedule" />
        <Alert variant="default" className="max-w-md mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Program Information Missing</AlertTitle>
          <AlertDescription>
            Please select a program in the previous step to view available class schedules.
          </AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  return (
    <motion.div className="px-0">
      <StepHeader
        title="Select Your Class Schedule"
        subtitle={selectedProgramFullDetails ? `${selectedProgramFullDetails.name} - ${selectedClassSubtitle}` : selectedClassSubtitle}
      />

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
            className="space-y-2"
          >
            {orderedDays.map((day) => (
              <div key={day} className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground px-1">{day}</h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {classesByDay[day].map((classDoc: Class) => {
                    const spotsAvailable = classDoc.spotsAvailable ?? 0;
                    const spotsTotal = classDoc.spotsTotal ?? 0;
                    const isFull = spotsAvailable <= 0;
                    const isSelected = field.value === classDoc.id;
                    const fillPercentage = spotsTotal > 0 ? ((spotsTotal - spotsAvailable) / spotsTotal) * 100 : 100;

                    return (
                      <Label
                        key={classDoc.id}
                        htmlFor={`class-${classDoc.id}`}
                        className={cn(
                          "relative cursor-pointer",
                          isFull && "cursor-not-allowed opacity-60"
                        )}
                      >
                        <div
                          className={cn(
                            "relative overflow-hidden rounded-lg border bg-white p-4 transition-all duration-200",
                            !isFull && "hover:shadow-md hover:border-primary/50",
                            isSelected && !isFull && "border-primary ring-2 ring-primary shadow-sm",
                            !isSelected && !isFull && "border-gray-200",
                            isFull && "bg-muted/50 border-muted"
                          )}
                        >
                          <RadioGroupItem
                            value={classDoc.id}
                            id={`class-${classDoc.id}`}
                            disabled={isFull}
                            className="sr-only"
                          />
                          
                          {/* Time Display */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="font-semibold text-base">{classDoc.time || 'N/A'}</span>
                            </div>
                            {isSelected && !isFull && (
                              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                              </div>
                            )}
                          </div>

                          {/* Spots Available */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm gap-2">
                              <span className="text-muted-foreground flex-shrink-0">Available</span>
                              <Badge 
                                variant={isFull ? "destructive" : spotsAvailable <= 3 ? "secondary" : "default"}
                                className="text-xs"
                              >
                                {isFull ? 'Full' : `${spotsAvailable} / ${spotsTotal}`}
                              </Badge>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={cn(
                                  "h-full transition-all duration-300",
                                  isFull ? "bg-destructive" : 
                                  fillPercentage >= 75 ? "bg-yellow-500" : 
                                  "bg-primary"
                                )}
                                style={{ width: `${fillPercentage}%` }}
                              />
                            </div>
                          </div>

                          {/* Gender Specific Badge */}
                          {classDoc.genderSpecific && (
                            <div className="mt-3 flex items-center gap-1.5">
                              <Users className="h-3.5 w-3.5 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground capitalize">
                                {classDoc.genderSpecific} only
                              </span>
                            </div>
                          )}
                        </div>
                      </Label>
                    );
                  })}
                </div>
              </div>
            ))}
          </RadioGroup>
        )}
      />
      
      {localError && (
        <p className="mt-4 text-sm text-destructive text-center">
          {localError}
        </p>
      )}
    </motion.div>
  );
}