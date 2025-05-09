"use client"

import React from "react"
import { useFormContext, Controller } from "react-hook-form"
import StepHeader from "@/components/StepHeader"
import type { EnrollmentFormData, ClassSlot } from "@/lib/form-types"
import {
  CLASS_SCHEDULE_DATA,
  LEVEL_1_PROGRAM_IDS,
  L1_SCHEDULE_PROGRAM_ID,
  PROGRAM_DATA
} from "@/lib/form-types"
import { cn } from "@/lib/utils"

const SchedulingSection: React.FC = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<EnrollmentFormData>()

  const selectedProgramId = watch("personalInfo.selectedProgram")

  const selectedProgramDetails = PROGRAM_DATA.find(p => p.id === selectedProgramId)

  const availableSlots = React.useMemo(() => {
    if (!selectedProgramId) return []

    let targetProgramIdForScheduling = selectedProgramId
    if (LEVEL_1_PROGRAM_IDS.includes(selectedProgramId)) {
      targetProgramIdForScheduling = L1_SCHEDULE_PROGRAM_ID
    }

    return CLASS_SCHEDULE_DATA.filter(slot => {
      if (slot.programId !== targetProgramIdForScheduling) return false
      if (slot.genderSpecific) {
        if (selectedProgramId === "dv_male" && slot.genderSpecific !== "male") return false
        if (selectedProgramId === "dv_female" && slot.genderSpecific !== "female") return false
      }
      return true
    })
  }, [selectedProgramId])

  const slotsByDay = React.useMemo(() => {
    return availableSlots.reduce<Record<string, ClassSlot[]>>((acc, slot) => {
      (acc[slot.day] = acc[slot.day] || []).push(slot)
      return acc
    }, {})
  }, [availableSlots])

  const daysOrder: ClassSlot["day"][] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  return (
    <>
      <StepHeader 
        title={`Schedule Your ${selectedProgramDetails?.name || "Class"}`}
        subtitle="Choose an available time slot that works for you."
      />
      
      {selectedProgramId ? (
        <div className="space-y-4 rounded-lg">
          {daysOrder.map(day => (
            slotsByDay[day] && slotsByDay[day].length > 0 && (
              <div key={day} className="mb-3">
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground border-b pb-1">{day}</h3>
                <Controller
                  name="scheduling.selectedClassSlotId"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-3 gap-2">
                      {slotsByDay[day].map(slot => (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => {
                            if (field.value === slot.id) {
                              field.onChange("");
                            } else {
                              field.onChange(slot.id);
                            }
                          }}
                          className={cn(
                            "p-2 border rounded-md text-center cursor-pointer transition-all duration-150 ease-in-out",
                            "w-full h-14 flex flex-col items-center justify-center text-xs",
                            field.value === slot.id 
                              ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                              : "bg-background hover:bg-muted/50 border-border"
                          )}
                        >
                          <span className="font-medium">{slot.time.replace(" - ", "\n")}</span>
                        </button>
                      ))}
                    </div>
                  )}
                />
              </div>
            )
          ))}
          {availableSlots.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No available time slots for the selected program. Please check back later or contact us.
            </p>
          )}
          {errors.scheduling?.selectedClassSlotId?.message && (
            <p className="text-xs text-red-500 pt-2 text-center">{errors.scheduling.selectedClassSlotId.message as string}</p>
          )}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-4">
          Please select a program in the previous step to see available class times.
        </p>
      )}
    </>
  )
}

export default SchedulingSection 