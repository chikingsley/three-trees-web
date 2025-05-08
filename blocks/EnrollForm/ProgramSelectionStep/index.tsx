"use client"

import type React from "react"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

// Type definition for Program (previously in page.tsx)
export interface Program {
  id: string
  name: string
  duration: string
  description: string
  weeks: number
  costPerSession: number
  enrollmentFee: number
}

interface ProgramSelectionStepProps {
  selectedPrograms: string[]
  updateSelectedPrograms: (programs: string[]) => void
  programsData: Program[] // Prop for PROGRAM_DATA
}

const ProgramSelectionStep: React.FC<ProgramSelectionStepProps> = ({
  selectedPrograms,
  updateSelectedPrograms,
  programsData,
}) => {
  const toggleProgram = (programId: string) => {
    if (selectedPrograms.includes(programId)) {
      updateSelectedPrograms(selectedPrograms.filter((id) => id !== programId))
    } else {
      updateSelectedPrograms([...selectedPrograms, programId])
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-2 md:pt-2 px-0"
    >
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold mb-1 text-primary">Select Your Programs</h2>
        <p className="text-muted-foreground text-sm">
          Choose the programs you need to enroll in (you can select multiple)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {programsData.map((program) => (
          <div
            key={program.id}
            className={`
              border rounded-lg p-3 cursor-pointer transition-all
              ${selectedPrograms.includes(program.id) ? "bg-white border-green-500" : "hover:bg-gray-50 border-border"}
            `}
            onClick={() => toggleProgram(program.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-sm">{program.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{program.description}</p>
                <div className="flex items-center mt-1 text-xs">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="ml-1 font-medium">{program.duration}</span>
                </div>
              </div>
              <div className="ml-2 shrink-0">
                {selectedPrograms.includes(program.id) ? (
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 size={14} className="text-green-600" />
                  </div>
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-muted"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default ProgramSelectionStep; 