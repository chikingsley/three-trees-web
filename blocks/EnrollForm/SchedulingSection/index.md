"use client"

import React, { useEffect, useState, useMemo } from "react"
import { useFormContext, Controller } from "react-hook-form"
import StepHeader from "@/components/StepHeader"
import type { EnrollmentFormData } from "@/lib/form-types"
import { PROGRAM_DATA } from "@/lib/form-types"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

// Define the structure of the Class object we expect from the API
interface FetchedClass {
  id: string; // Actual UUID from Payload
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  time: string; // e.g., "17:00"
  genderSpecific?: "male" | "female" | null;
  numberOfParallelClasses: number;
  program: {
    id: string; // Program UUID
    name: string;
    programId: string; // e.g. "am", "dv_male"
    spotsPerClass: number;
  }; // Populated program data
  clients: string[] | { id: string }[]; // Array of client IDs or objects
  spotsAvailable?: number; // Calculated by backend hook
  spotsTotal?: number; // Calculated by backend hook
  isActive?: boolean;
}

// Helper to format HH:MM time to AM/PM for display
const formatTimeToAmPm = (timeStr: string): string => {
  if (!timeStr || !timeStr.includes(':')) return timeStr; // Return original if format is unexpected
  const [hours, minutes] = timeStr.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12; // Convert 0 or 12 to 12
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

const SchedulingSection: React.FC = () => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<EnrollmentFormData>()

  const selectedProgramIdString = watch("personalInfo.selectedProgram")
  const selectedClientSex = watch("personalInfo.sex")

  const [fetchedClasses, setFetchedClasses] = useState<FetchedClass[]>([])
  const [isLoadingClasses, setIsLoadingClasses] = useState(false)

  const selectedProgramDetails = PROGRAM_DATA.find(p => p.id === selectedProgramIdString)

  useEffect(() => {
    if (selectedProgramIdString) {
      setIsLoadingClasses(true)
      const params = new URLSearchParams()
      
      // Filter by the specific programId string from the Programs collection
      const programIdForApiFilter = selectedProgramIdString;

      params.append('where[program.programId][equals]', programIdForApiFilter)
      params.append('depth', '1') 
      params.append('limit', '100') 
      params.append('where[isActive][equals]', 'true')

      fetch(`/api/classes?${params.toString()}`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`Failed to fetch classes: ${res.statusText}`);
          }
          return res.json();
        })
        .then(data => {
          if (data.docs && Array.isArray(data.docs)) {
            const genderFiltered = data.docs.filter((classDoc: FetchedClass) => {
              if (classDoc.genderSpecific) {
                return classDoc.genderSpecific === selectedClientSex?.toLowerCase();
              }
              return true; 
            });
            setFetchedClasses(genderFiltered)
          } else {
            setFetchedClasses([]);
          }
        })
        .catch(error => {
          console.error("Error fetching classes:", error)
          setFetchedClasses([]) 
        })
        .finally(() => setIsLoadingClasses(false))
    } else {
      setFetchedClasses([])
    }
  }, [selectedProgramIdString, selectedClientSex])

  const slotsByDay = useMemo(() => {
    return fetchedClasses.reduce<Record<string, FetchedClass[]>>((acc, slot) => {
      (acc[slot.day] = acc[slot.day] || []).push(slot)
      return acc
    }, {})
  }, [fetchedClasses])

  const daysOrder: FetchedClass["day"][] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  return (
    <>
      <StepHeader 
        title={`Schedule Your ${selectedProgramDetails?.name || "Class"}`}
        subtitle="Choose an available time slot that works for you."
      />
      
      {isLoadingClasses && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2 text-muted-foreground">Loading available times...</p>
        </div>
      )}

      {!isLoadingClasses && selectedProgramIdString && fetchedClasses.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No available time slots match your selected program and criteria. Please check back later or contact us.
        </p>
      )}

      {!isLoadingClasses && !selectedProgramIdString && (
         <p className="text-sm text-muted-foreground text-center py-4">
          Please select a program in the previous step to see available class times.
        </p>
      )}

      {!isLoadingClasses && fetchedClasses.length > 0 && (
        <div className="space-y-4 rounded-lg">
          {daysOrder.map(day => (
            slotsByDay[day] && slotsByDay[day].length > 0 && (
              <div key={day} className="mb-3">
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground border-b pb-1">{day}</h3>
                <Controller
                  name="scheduling.selectedClassId"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {slotsByDay[day].map(classDoc => (
                        <button
                          key={classDoc.id} 
                          type="button"
                          onClick={() => {
                            if (field.value === classDoc.id) {
                              field.onChange(""); 
                            } else {
                              field.onChange(classDoc.id); 
                            }
                          }}
                          disabled={(classDoc.spotsAvailable !== undefined && classDoc.spotsAvailable <= 0)} 
                          className={cn(
                            "p-2 border rounded-md text-center cursor-pointer transition-all duration-150 ease-in-out",
                            "w-full min-h-[4rem] h-auto flex flex-col items-center justify-center text-xs",
                            field.value === classDoc.id 
                              ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                              : "bg-background hover:bg-muted/50 border-border",
                            (classDoc.spotsAvailable !== undefined && classDoc.spotsAvailable <= 0) && "opacity-50 cursor-not-allowed bg-muted line-through"
                          )}
                        >
                          <span className="font-medium">{formatTimeToAmPm(classDoc.time)}</span>
                          {classDoc.spotsAvailable !== undefined && (
                            <span className={cn("text-xxs", field.value === classDoc.id ? "text-primary-foreground/80" : "text-muted-foreground/80")}>
                              {classDoc.spotsAvailable > 0 ? `${classDoc.spotsAvailable} spots left` : "Full"}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                />
              </div>
            )
          ))}
          {errors.scheduling?.selectedClassId?.message && (
            <p className="text-xs text-red-500 pt-2 text-center">{errors.scheduling.selectedClassId.message as string}</p>
          )}
        </div>
      )}
    </>
  )
}

export default SchedulingSection 