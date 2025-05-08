"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  UserIcon,
  CheckCircle2,
  Calendar,
  CalendarCheck,
  FileText,
  FileCheck,
  CircleDollarSign,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  CreditCard,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import AnimatedStepper from "@/components/AnimatedStepper";


// Program data with durations from the provided list
type Program = {
  id: string
  name: string
  duration: string
  description: string
  weeks: number
  costPerSession: number
  enrollmentFee: number
}

type PaymentOption = 'per-session' | 'full-program'

const PROGRAM_DATA: Program[] = [
  {
    id: "dv",
    name: "Domestic Violence",
    duration: "26 weeks",
    description: "For individuals addressing domestic violence issues",
    weeks: 26,
    costPerSession: 35,
    enrollmentFee: 50,
  },
  {
    id: "sort",
    name: "Sex Offender Responsible Thinking",
    duration: "18 months",
    description: "Specialized program for sex offender rehabilitation",
    weeks: 78,
    costPerSession: 40,
    enrollmentFee: 90,
  },
  {
    id: "am",
    name: "Anger Management",
    duration: "12 weeks",
    description: "Learn to manage anger and emotional responses",
    weeks: 12,
    costPerSession: 35,
    enrollmentFee: 50,
  },
  {
    id: "sact",
    name: "Substance Abuse + Critical Thinking",
    duration: "12 weeks",
    description: "Address substance abuse issues with critical thinking skills",
    weeks: 12,
    costPerSession: 35,
    enrollmentFee: 50,
  },
  {
    id: "pp",
    name: "Positive Parenting",
    duration: "12 weeks",
    description: "Develop effective parenting skills and techniques",
    weeks: 12,
    costPerSession: 35,
    enrollmentFee: 50,
  },
]

// Define interface for step items
interface StepItem {
  id: string
  title: string
  initialIcon: React.ElementType
  completedIcon: React.ElementType
}

// Define interfaces for form data
interface PersonalInfo {
  firstName: string
  lastName: string
  city: string
  county: string
  referralSource: string
}

interface SchedulingInfo {
  selectedDay: string
  selectedTime: string
}

interface DocumentInfo {
  agreedToTerms: boolean
  signature: string
}

interface PaymentData {
  paymentOption: string
  cardNumber?: string
  expiry?: string
  cvc?: string
}

interface FormData {
  personalInfo: PersonalInfo
  scheduling: SchedulingInfo
  documents: DocumentInfo
  payment: PaymentData
  selectedPrograms: string[]
}


// Step Item Component for Welcome section
const StepItem = ({
  icon,
  iconLarge,
  title,
  description,
}: {
  icon: React.ReactNode
  iconLarge: React.ReactNode
  title: string
  description: string
}) => (
  <div className="flex items-start">
    <div className="bg-primary/10 p-1.5 md:p-2 rounded-full mr-3 md:mr-4 shrink-0 flex items-center justify-center">
      <div className="md:hidden">{icon}</div>
      <div className="hidden md:block">{iconLarge}</div>
    </div>
    <div>
      <h3 className="font-medium text-sm md:text-base">{title}</h3>
      <p className="text-xs md:text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
)

// Welcome component
const Welcome = () => (
  <div className="pt-6 md:pt-6 px-6 md:px-8 flex flex-col flex-1 items-center justify-center">
    {/* Header Section */}
    <div className="text-center mb-8 md:mb-10 mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-5 text-primary">Welcome to Three Trees</h1>
      <p className="text-lg md:text-xl text-muted-foreground">
        Complete your enrollment in
      </p>
      <p className="text-lg md:text-xl text-muted-foreground mb-3">
        <span className="font-medium text-primary">less than 2 minutes</span>
      </p>
      <p className="text-sm md:text-base text-muted-foreground">
        We&apos;ll guide you through each step of the process
      </p>
    </div>

    {/* Steps Section */}
    <div className="space-y-4 text-left mb-2 max-w-md mx-auto w-full">
      <StepItem
        icon={<UserIcon size={18} className="text-primary" />}
        iconLarge={<UserIcon size={20} className="text-primary" />}
        title="Personal Information"
        description="Tell us about yourself and your referral source"
      />

      <StepItem
        icon={<FileText size={18} className="text-primary" />}
        iconLarge={<FileText size={20} className="text-primary" />}
        title="Program Selection"
        description="Choose the programs you need to enroll in"
      />

      <StepItem
        icon={<CircleDollarSign size={18} className="text-primary" />}
        iconLarge={<CircleDollarSign size={20} className="text-primary" />}
        title="Complete Payment"
        description="Pay enrollment fee and select prepayment options"
      />

      <StepItem
        icon={<Calendar size={18} className="text-primary" />}
        iconLarge={<Calendar size={20} className="text-primary" />}
        title="Schedule Your Sessions"
        description="Choose from available time slots that work for you"
      />

      <StepItem
        icon={<FileText size={18} className="text-primary" />}
        iconLarge={<FileText size={20} className="text-primary" />}
        title="Review Documents"
        description="Review and sign necessary program agreements"
      />
    </div>
  </div>
)

// Personal Info Form component
const PersonalInfoForm = ({
  formData,
  updateFormData,
}: {
  formData: PersonalInfo
  updateFormData: (data: Partial<PersonalInfo>) => void
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="pt-2 md:pt-2 px-0"
  >
    <div className="mb-4 text-center">
      <h2 className="text-2xl font-bold mb-1 text-primary">Tell us about yourself</h2>
      <p className="text-muted-foreground text-sm">We&apos;ll use this information to set up your account</p>
    </div>

    <div className="space-y-4 p-2 rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name*</Label>
          <Input
            id="firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name*</Label>
          <Input
            id="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City*</Label>
          <Input
            id="city"
            placeholder="Your city"
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="county">County*</Label>
          <Input
            id="county"
            placeholder="Your county"
            value={formData.county}
            onChange={(e) => updateFormData({ county: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="referralSource">Referral Source*</Label>
        <div className="w-full">
          <Select value={formData.referralSource} onValueChange={(value) => updateFormData({ referralSource: value })}>
            <SelectTrigger id="referralSource" className="w-full min-w-0 text-sm md:text-base px-3 py-2 md:py-2.5">
              <SelectValue placeholder="Select your referral source" />
            </SelectTrigger>
            <SelectContent className="w-full min-w-0">
              <SelectItem value="court">Court Mandated</SelectItem>
              <SelectItem value="probation">Probation Officer</SelectItem>
              <SelectItem value="attorney">Attorney</SelectItem>
              <SelectItem value="self">Self Referral</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  </motion.div>
)

// Program Selection component
const ProgramSelection = ({
  selectedPrograms,
  updateSelectedPrograms,
}: {
  selectedPrograms: string[]
  updateSelectedPrograms: (programs: string[]) => void
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
        {PROGRAM_DATA.map((program) => (
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

// Payment Step component
const PaymentStep = ({ formData, updateFormData }: { formData: FormData; updateFormData: (data: Partial<FormData>) => void }) => {
  // Calculate total enrollment fees
  const totalEnrollmentFees = formData.selectedPrograms.reduce((acc, programId) => {
    const program = PROGRAM_DATA.find((p) => p.id === programId)
    return acc + (program ? program.enrollmentFee : 0)
  }, 0)

  // Calculate costs for each program
  const calculateTotalCost = (program: Program, method: PaymentOption) => {
    const sessionCost = program.weeks * program.costPerSession
    if (method === "full-program") {
      return sessionCost * 0.95 // 5% discount
    }
    return sessionCost
  }

  // Calculate original total (before discount)
  const calculateOriginalTotal = () => {
    return formData.selectedPrograms.reduce((acc, programId) => {
      const program = PROGRAM_DATA.find((p) => p.id === programId)
      return acc + (program ? program.weeks * program.costPerSession : 0)
    }, 0)
  }

  // Calculate total due today
  const calculateDueToday = (method: PaymentOption) => {
    if (method === "full-program") {
      return (
        totalEnrollmentFees +
        formData.selectedPrograms.reduce((acc, programId) => {
          const program = PROGRAM_DATA.find((p) => p.id === programId)
          return acc + (program ? calculateTotalCost(program, method) : 0)
        }, 0)
      )
    }

    // For per-session, it's only enrollment fees
    return totalEnrollmentFees
  }

  const originalTotal = calculateOriginalTotal()
  const discountedTotal = originalTotal * 0.95

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-8 md:pt-8 px-0"
    >
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold mb-1 text-primary">Complete Your Payment</h2>
        <p className="text-muted-foreground text-sm">Choose a payment option to complete your enrollment</p>
      </div>

      <div className="space-y-6">
        <div className="border rounded-lg overflow-hidden">
          {/* Program Cards - Compact Version */}
          <div className="p-0">
            <table className="w-full">
              <thead className="bg-white rounded-t-lg">
                <tr>
                  <th className="text-left py-2 px-3 text-sm font-medium">Program</th>
                  <th className="text-center py-2 px-3 text-sm font-medium">Duration</th>
                  <th className="text-right py-2 px-3 text-sm font-medium">Per Session</th>
                </tr>
              </thead>
              <tbody className="divide-y p-4">
                {formData.selectedPrograms.map((programId) => {
                  const program = PROGRAM_DATA.find((p) => p.id === programId)
                  if (!program) return null

                  return (
                    <tr key={program.id}>
                      <td className="py-3 px-4">
                        <div className="font-medium">{program.name}</div>
                        <div className="text-xs text-muted-foreground mt-1 pl-1">
                          Enrollment fee: ${program.enrollmentFee.toFixed(2)}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">{program.duration}</td>
                      <td className="py-3 px-3 text-right">${program.costPerSession.toFixed(2)}</td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot className="bg-muted/10">
                <tr>
                  <td colSpan={2} className="py-3 px-3 text-right text-sm">
                    Total Enrollment Fees (due today):
                  </td>
                  <td className="py-3 px-3 text-right font-medium">${totalEnrollmentFees.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Payment Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            className={`relative p-5 rounded-lg border transition-colors ${
              formData.payment.paymentOption === "per-session"
                ? "bg-white border-green-500"
                : "bg-muted/10 border-border"
            }`}
            onClick={() =>
              updateFormData({
                payment: { ...formData.payment, paymentOption: "per-session" },
              })
            }
          >
            <div className="text-center">
              <Calendar className="w-8 h-8 mx-auto mb-3 text-primary" />
              <div className="font-medium mb-1">Pay Per Session</div>
              <div className="text-sm text-muted-foreground mb-2">
                Pay enrollment fee(s) now, remaining sessions as you attend
              </div>
              <div
                className={`text-base font-semibold ${formData.payment.paymentOption === "per-session" ? "text-green-600" : "text-primary"}`}
              >
                Due today: ${calculateDueToday(formData.payment.paymentOption as PaymentOption).toFixed(2)}
              </div>
            </div>
            {formData.payment.paymentOption === "per-session" && (
              <div className="absolute top-3 right-3">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
              </div>
            )}
          </button>

          <button
            className={`relative p-5 rounded-lg border transition-colors ${
              formData.payment.paymentOption === "full-program"
                ? "bg-white border-green-500"
                : "bg-muted/10 border-border"
            }`}
            onClick={() =>
              updateFormData({
                payment: { ...formData.payment, paymentOption: "full-program" },
              })
            }
          >
            <div className="text-center">
              <CircleDollarSign className="w-8 h-8 mx-auto mb-3 text-primary" />
              <div className="font-medium mb-1">
                Prepay All Sessions <span className="text-green-600">(Save 5%)</span>
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                <span className="line-through">${originalTotal.toFixed(2)}</span>{" "}
                <span>${discountedTotal.toFixed(2)}</span> + ${totalEnrollmentFees.toFixed(2)} enrollment fee(s)
              </div>
              <div
                className={`text-base font-semibold ${formData.payment.paymentOption === "full-program" ? "text-green-600" : "text-primary"}`}
              >
                Due today: ${calculateDueToday(formData.payment.paymentOption as PaymentOption).toFixed(2)}
              </div>
            </div>
            {formData.payment.paymentOption === "full-program" && (
              <div className="absolute top-3 right-3">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
              </div>
            )}
          </button>
        </div>

        {/* Payment Form */}
        <div className="border rounded-lg overflow-hidden">
          <div className="p-4 bg-muted/30 border-b">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Payment Method</h3>
              <div className="text-sm">
                <span className="text-muted-foreground">Total due today:</span>{" "}
                <span className="font-bold ml-1 text-primary">
                  ${calculateDueToday(formData.payment.paymentOption as PaymentOption).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="space-y-4">
              {/* Clean Card Input */}
              <div className="space-y-4">
                <div className="flex items-center mb-3">
                  <CreditCard size={20} className="text-muted-foreground mr-2" />
                  <span className="font-medium">Card Information</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-3 border rounded-md text-sm"
                      value={formData.payment.cardNumber || ""}
                      onChange={(e) =>
                        updateFormData({
                          payment: { ...formData.payment, cardNumber: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">Expiration Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full p-3 border rounded-md text-sm"
                        value={formData.payment.expiry || ""}
                        onChange={(e) =>
                          updateFormData({
                            payment: { ...formData.payment, expiry: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full p-3 border rounded-md text-sm"
                        value={formData.payment.cvc || ""}
                        onChange={(e) =>
                          updateFormData({
                            payment: { ...formData.payment, cvc: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-primary/90 transition-colors mt-4 flex items-center justify-center">
                Pay ${calculateDueToday(formData.payment.paymentOption as PaymentOption).toFixed(2)} Now
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Scheduling Step component
const SchedulingStep = ({
  formData,
  updateFormData,
}: {
  formData: SchedulingInfo
  updateFormData: (data: Partial<SchedulingInfo>) => void
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
                <div className="text-xs text-muted-foreground mt-1">8 spots left</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Documents Step component
const DocumentsStep = ({
  formData,
  updateFormData,
}: {
  formData: DocumentInfo
  updateFormData: (data: Partial<DocumentInfo>) => void
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="pt-8 md:pt-8 px-0"
  >
    <div className="mb-4 text-center">
      <h2 className="text-2xl font-bold mb-1 text-primary">Review Program Agreement</h2>
      <p className="text-muted-foreground text-sm">Please read and sign the following document</p>
    </div>

    <div className="p-2 rounded-lg space-y-4">
      <div className="h-56 overflow-y-auto p-4 rounded-lg border border-border mb-2">
        <p className="text-sm text-muted-foreground mb-3">
          This PROGRAM AGREEMENT (&quot;Agreement&quot;) is made and entered into as of the date of signature below, by
          and between the Participant and the Program Provider.
        </p>
        <p className="text-sm text-muted-foreground mb-3">
          <strong>1. PROGRAM PARTICIPATION.</strong> Participant agrees to attend all scheduled sessions on time and
          participate fully in all program activities. Participant understands that missing sessions may result in
          program failure and possible court notification.
        </p>
        <p className="text-sm text-muted-foreground mb-3">
          <strong>2. CONFIDENTIALITY.</strong> Participant information will be kept confidential except as required by
          law or court order. Group discussions are confidential and participants agree not to disclose information
          about other participants outside of sessions.
        </p>
        <p className="text-sm text-muted-foreground mb-3">
          <strong>3. PROGRAM RULES.</strong> Participant agrees to abide by all program rules, including but not limited
          to: maintaining sobriety during sessions, treating staff and other participants with respect, completing all
          assignments, and adhering to payment schedules.
        </p>
      </div>

      <div className="flex items-center p-3 rounded-lg">
        <Checkbox
          id="agree"
          checked={formData.agreedToTerms}
          onCheckedChange={(checked) => updateFormData({ agreedToTerms: checked === true })}
        />
        <Label htmlFor="agree" className="ml-2 text-muted-foreground">
          I have read and agree to the Program Agreement
        </Label>
      </div>

      <div className="p-4 rounded-lg">
        <Label className="block text-lg font-medium mb-3">Electronic Signature</Label>
        <div className="border border-border rounded-md h-24 flex items-center justify-center">
          <span className="text-muted-foreground">Sign here</span>
        </div>
        <Button
          variant="ghost"
          className="mt-2 p-0 h-auto text-primary"
          onClick={() => updateFormData({ signature: "" })}
        >
          Clear signature
        </Button>
      </div>
    </div>
  </motion.div>
)

// Success Page component
const SuccessPage = ({ formData }: { formData: FormData }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="pt-8 md:pt-8 px-0 text-center"
  >
    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <CheckCircle2 size={40} className="text-green-600" />
    </div>
    <h2 className="text-3xl font-bold mb-3 text-primary">Enrollment Complete!</h2>
    <p className="text-xl text-muted-foreground mb-6">
      Thank you for completing your enrollment
      {formData.personalInfo.firstName ? `, ${formData.personalInfo.firstName}` : ""}. We&apos;ve sent a confirmation
      email with all the details.
    </p>
    <div className="max-w-md mx-auto border border-border rounded-lg p-5 text-left mb-6 shadow-sm">
      <h3 className="font-medium text-lg mb-4">Your Next Steps:</h3>
      <ul className="space-y-3">
        <li className="flex items-center">
          <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center mr-3 shrink-0">
            <span className="text-green-600 text-sm font-bold">1</span>
          </div>
          <span>Check your email for program details and materials</span>
        </li>
        <li className="flex items-center">
          <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center mr-3 shrink-0">
            <span className="text-green-600 text-sm font-bold">2</span>
          </div>
          <span>
            Attend your first session {formData.scheduling.selectedDay ? `on ${formData.scheduling.selectedDay}` : ""}{" "}
            {formData.scheduling.selectedTime ? `at ${formData.scheduling.selectedTime.split(" - ")[0]}` : ""}
          </span>
        </li>
        <li className="flex items-center">
          <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center mr-3 shrink-0">
            <span className="text-green-600 text-sm font-bold">3</span>
          </div>
          <span>Complete any pre-session assignments if provided</span>
        </li>
      </ul>
    </div>
    <Button className="bg-primary text-primary-foreground px-6 py-2 text-base h-auto">Go to Your Dashboard</Button>
  </motion.div>
)

// Main enrollment form component
export default function EnrollmentForm() {
  // Form data state
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      city: "",
      county: "",
      referralSource: "",
    },
    scheduling: {
      selectedDay: "",
      selectedTime: "",
    },
    documents: {
      agreedToTerms: false,
      signature: "",
    },
    payment: {
      paymentOption: "full-program",
      cardNumber: "",
      expiry: "",
      cvc: "",
    },
    selectedPrograms: [],
  })

  // Update form data handlers
  const updatePersonalInfo = (data: Partial<typeof formData.personalInfo>) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...data,
      },
    }))
  }

  const updateScheduling = (data: Partial<typeof formData.scheduling>) => {
    setFormData((prev) => ({
      ...prev,
      scheduling: {
        ...prev.scheduling,
        ...data,
      },
    }))
  }

  const updateDocuments = (data: Partial<typeof formData.documents>) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        ...data,
      },
    }))
  }

  const updateSelectedPrograms = (programs: string[]) => {
    setFormData((prev) => ({
      ...prev,
      selectedPrograms: programs,
    }))
  }

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }))
  }

  const [currentStep, setCurrentStep] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  const enrollmentSteps = [
    {
      id: "personal-info",
      title: "Personal Info",
      initialIcon: UserIcon,
      completedIcon: CheckCircle2,
    },
    {
      id: "program-selection",
      title: "Programs",
      initialIcon: FileText,
      completedIcon: FileCheck,
    },
    {
      id: "payment",
      title: "Payment",
      initialIcon: CircleDollarSign,
      completedIcon: ShieldCheck,
    },
    {
      id: "scheduling",
      title: "Scheduling",
      initialIcon: Calendar,
      completedIcon: CalendarCheck,
    },
    {
      id: "documents",
      title: "Documents",
      initialIcon: FileText,
      completedIcon: FileCheck,
    },
  ]

  // Array of components for each step with props for form data
  const stepComponents = [
    <Welcome key="welcome" />,
    <PersonalInfoForm key="personal" formData={formData.personalInfo} updateFormData={updatePersonalInfo} />,
    <ProgramSelection
      key="programs"
      selectedPrograms={formData.selectedPrograms}
      updateSelectedPrograms={updateSelectedPrograms}
    />,
    <PaymentStep key="payment" formData={formData} updateFormData={updateFormData} />,
    <SchedulingStep key="scheduling" formData={formData.scheduling} updateFormData={updateScheduling} />,
    <DocumentsStep key="documents" formData={formData.documents} updateFormData={updateDocuments} />,
    <SuccessPage key="success" formData={formData} />,
  ]

  // Handle browser history navigation
  useEffect(() => {
    // Add current step to history state when it changes
    window.history.pushState({ step: currentStep }, "", "")

    // Handle popstate (browser back/forward buttons)
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && typeof event.state.step === "number") {
        setCurrentStep(event.state.step)
      } else if (currentStep > 0) {
        // If no state but we're not at the first step, go back
        setCurrentStep((prev) => prev - 1)
      }
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [currentStep])

  const goToNextStep = () => {
    const nextStep = Math.min(currentStep + 1, stepComponents.length - 1)
    setCurrentStep(nextStep)
    // Add to history
    window.history.pushState({ step: nextStep }, "", "")
  }

  const goToPreviousStep = () => {
    const prevStep = Math.max(currentStep - 1, 0)
    setCurrentStep(prevStep)
    // Add to history
    window.history.pushState({ step: prevStep }, "", "")
  }

  // Scroll to top when changing steps
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0)
    }
  }, [currentStep])

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === stepComponents.length - 1
  const isSuccessStep = currentStep === stepComponents.length - 1

  // Calculate which step to highlight in the stepper (welcome and success are not in the stepper)
  const stepperIndex = currentStep === 0 ? 0 : currentStep >= stepComponents.length - 1 ? 4 : currentStep - 1

  return (
    <div className="flex flex-col min-h-screen bg-muted">
      <main className="flex-1 pt-8 sm:pt-8 pb-4 sm:pb-6 flex flex-col" ref={contentRef}>
        {/* Full-width stepper without card wrapper */}
        {currentStep > 0 && currentStep < stepComponents.length - 1 && (
          <div className="mb-2 sm:mb-4 container mx-auto px-4">
            <AnimatedStepper steps={enrollmentSteps} currentStep={stepperIndex} />
          </div>
        )}

        {/* Content area - removed card wrapper */}
        <div className="flex-1 flex justify-center py-2 sm:py-4 container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl mx-auto"
            >
              {stepComponents[currentStep]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        {!isSuccessStep && (
          <div className="container mx-auto px-4 max-w-2xl mt-auto pt-4 sm:pt-6 pb-2">
            <div className={isFirstStep ? "flex justify-center" : "flex items-center justify-between"}>
              {!isFirstStep ? (
                <Button onClick={goToPreviousStep} variant="outline" className="mr-2">
                  <ArrowLeft size={16} className="mr-2" /> Back
                </Button>
              ) : (
                <div></div>
              )}

              <Button
                onClick={goToNextStep}
                size={isFirstStep ? "lg" : "default"}
                className={isFirstStep ? "px-8 py-2 h-auto text-base" : "w-auto"}
              >
                {isFirstStep ? "Start Enrollment" : "Continue"}
                {!isLastStep && <ArrowRight size={16} className="ml-2" />}
              </Button>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-background border-t py-3 sm:py-4">
        <div className="container mx-auto px-4 text-xs sm:text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-y-2">
          <span>© {new Date().getFullYear()} Three Trees. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}
