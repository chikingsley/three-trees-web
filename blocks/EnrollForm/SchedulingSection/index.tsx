"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

// Type definition for SchedulingInfo (previously in page.tsx)
export interface SchedulingInfo {
  selectedDay: string
  selectedTime: string
}

interface SchedulingSectionProps {
  formData: SchedulingInfo
  updateFormData: (data: Partial<SchedulingInfo>) => void
}

const SchedulingSection: React.FC<SchedulingSectionProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-8 md:pt-8 px-0"
    >
      <div className="mb-2 text-center">
        <h2 className="text-2xl font-bold text-primary">When would you like to attend?</h2>
        <p className="text-muted-foreground text-sm">Choose a day and time that works best for your schedule</p>
      </div>

      <div className="p-2 rounded-lg space-y-4">
        <div>
          <h3 className="text-base font-medium mb-2">Choose a day of the week:</h3>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
              <Button
                key={day}
                variant={formData.selectedDay === day ? "default" : "outline"}
                className="h-auto py-2 text-sm"
                onClick={() => updateFormData({ selectedDay: day })}
              >
                {day.substring(0, 3)}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-base font-medium mb-2">Available time slots:</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              "9:00 AM - 10:30 AM",
              "11:00 AM - 12:30 PM",
              "1:00 PM - 2:30 PM",
              "3:00 PM - 4:30 PM",
              "5:00 PM - 6:30 PM",
              "7:00 PM - 8:30 PM",
            ].map((slot) => (
              <div
                key={slot}
                className={`
                  border rounded-lg p-2 cursor-pointer transition-colors text-center
                  ${formData.selectedTime === slot ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}
                `}
                onClick={() => updateFormData({ selectedTime: slot })}
              >
                <div className="font-medium text-sm">{slot}</div>
                <div className="text-xs text-muted-foreground mt-1">8 spots left</div> {/* This might need to be dynamic in a real app */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SchedulingSection; 