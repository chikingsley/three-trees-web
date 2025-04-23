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
  MessageSquare,
  Leaf,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

// Define interface for step items
interface StepItem {
  id: string
  title: string
  initialIcon: React.ElementType
  completedIcon: React.ElementType
}

// Update the AnimatedStepper component to fix the centering and line positioning issues
const AnimatedStepper = ({ steps, currentStep }: { steps: StepItem[]; currentStep: number }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isActive = index === currentStep
          const isLastStep = index === steps.length - 1

          const InitialIcon = step.initialIcon
          const CompletedIcon = step.completedIcon

          return (
            <li key={step.id} className="flex items-center flex-1 relative">
              {/* Connecting Line - Positioned BEHIND the icon with absolute positioning */}
              {!isLastStep && (
                <div className="absolute top-6 left-1/2 right-0 h-[2px] bg-gray-200 w-full z-0">
                  <div
                    className="absolute inset-0 h-full bg-green-500 transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `scaleX(${isCompleted ? 1 : 0})`,
                      transformOrigin: "left",
                    }}
                  />
                </div>
              )}

              {/* Icon Container - Positioned ABOVE the line with z-index */}
              <div className="flex flex-col items-center w-full relative z-10">
                <div
                  className={`
                    flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-sm
                    transition-all duration-300 transform bg-white
                    ${
                      isActive
                        ? "border-primary bg-primary/10 scale-110"
                        : isCompleted
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 opacity-70 scale-90"
                    }
                  `}
                >
                  {isCompleted ? (
                    <CompletedIcon size={22} className="text-green-600" />
                  ) : (
                    <InitialIcon size={22} className={isActive ? "text-primary" : "text-muted-foreground"} />
                  )}
                </div>

                {/* Step Title */}
                <span
                  className={`
                  text-xs font-medium mt-2 text-center w-full
                  ${isActive ? "text-primary" : isCompleted ? "text-green-600" : "text-muted-foreground"}
                `}
                >
                  {step.title}
                </span>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

// Update the Welcome component to be more visually appealing
const Welcome = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="max-w-2xl mx-auto"
  >
    <div className="text-center mb-8">
      <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <MessageSquare size={36} className="text-primary" />
      </div>
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
        Welcome to Three Trees
      </h1>
      <p className="text-xl text-muted-foreground mb-2">
        Complete your enrollment in <span className="font-medium text-primary">5 minutes or less</span>
      </p>
      <p className="text-muted-foreground">We&apos;ll guide you through each step of the process</p>
    </div>

    <div className="space-y-4 text-left mb-8">
      <div className="flex items-start p-4 bg-white/60 rounded-lg transition-colors hover:bg-white/80 shadow-sm">
        <div className="bg-primary/10 p-2 rounded-full mr-4 shrink-0">
          <UserIcon size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-medium">Personal Information</h3>
          <p className="text-sm text-muted-foreground">Tell us about yourself and your referral source</p>
        </div>
      </div>
      <div className="flex items-start p-4 bg-white/60 rounded-lg transition-colors hover:bg-white/80 shadow-sm">
        <div className="bg-primary/10 p-2 rounded-full mr-4 shrink-0">
          <Calendar size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-medium">Schedule Your Sessions</h3>
          <p className="text-sm text-muted-foreground">Choose from available time slots that work for you</p>
        </div>
      </div>
      <div className="flex items-start p-4 bg-white/60 rounded-lg transition-colors hover:bg-white/80 shadow-sm">
        <div className="bg-primary/10 p-2 rounded-full mr-4 shrink-0">
          <FileText size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-medium">Review Documents</h3>
          <p className="text-sm text-muted-foreground">Review and sign necessary program agreements</p>
        </div>
      </div>
      <div className="flex items-start p-4 bg-white/60 rounded-lg transition-colors hover:bg-white/80 shadow-sm">
        <div className="bg-primary/10 p-2 rounded-full mr-4 shrink-0">
          <CircleDollarSign size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-medium">Complete Payment</h3>
          <p className="text-sm text-muted-foreground">Pay enrollment fee and select prepayment options</p>
        </div>
      </div>
    </div>
  </motion.div>
)

// Update the PersonalInfoForm component to be more visually appealing
const PersonalInfoForm = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="max-w-2xl mx-auto"
  >
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
        Tell us about yourself
      </h2>
      <p className="text-muted-foreground">We&apos;ll use this information to set up your account</p>
    </div>

    <div className="space-y-5 bg-white/60 p-6 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name*</Label>
          <Input id="firstName" placeholder="Enter your first name" className="bg-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name*</Label>
          <Input id="lastName" placeholder="Enter your last name" className="bg-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="city">City*</Label>
          <Input id="city" placeholder="Your city" className="bg-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="county">County*</Label>
          <Input id="county" placeholder="Your county" className="bg-white" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="referralSource">Referral Source*</Label>
        <Select>
          <SelectTrigger id="referralSource" className="bg-white">
            <SelectValue placeholder="Select your referral source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="court">Court Mandated</SelectItem>
            <SelectItem value="probation">Probation Officer</SelectItem>
            <SelectItem value="attorney">Attorney</SelectItem>
            <SelectItem value="self">Self Referral</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="programType">Program Type*</Label>
        <Select>
          <SelectTrigger id="programType" className="bg-white">
            <SelectValue placeholder="Select program type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dv">Domestic Violence Intervention</SelectItem>
            <SelectItem value="sa">Substance Abuse Treatment</SelectItem>
            <SelectItem value="am">Anger Management</SelectItem>
            <SelectItem value="pc">Parenting Classes</SelectItem>
            <SelectItem value="dui">DUI Education Program</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </motion.div>
)

// Update the SchedulingStep component to be more visually appealing
const SchedulingStep = () => {
  const [selectedDay, setSelectedDay] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          When would you like to attend?
        </h2>
        <p className="text-muted-foreground">Choose a day and time that works best for your schedule</p>
      </div>

      <div className="bg-white/60 p-6 rounded-lg shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Choose a day of the week:</h3>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? "default" : "outline"}
                className="h-auto py-2 text-sm"
                onClick={() => setSelectedDay(day)}
              >
                {day.substring(0, 3)}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Available time slots:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  border rounded-lg p-3 cursor-pointer transition-colors bg-white
                  ${selectedTime === slot ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}
                `}
                onClick={() => setSelectedTime(slot)}
              >
                <div className="flex items-center">
                  <Calendar size={18} className="text-primary mr-2" />
                  <span>{selectedDay || "Any day"}</span>
                </div>
                <div className="font-medium mt-1">{slot}</div>
                <div className="text-xs text-muted-foreground mt-1">8 spots available</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Update the DocumentsStep component to be more visually appealing
const DocumentsStep = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="max-w-2xl mx-auto"
  >
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
        Review Program Agreement
      </h2>
      <p className="text-muted-foreground">Please read and sign the following document</p>
    </div>

    <div className="bg-white/60 p-6 rounded-lg shadow-sm space-y-5">
      <div className="h-56 overflow-y-auto p-4 bg-white rounded-lg border border-border mb-2">
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

      <div className="flex items-center p-3 bg-white rounded-lg">
        <Checkbox id="agree" />
        <Label htmlFor="agree" className="ml-2 text-muted-foreground">
          I have read and agree to the Program Agreement
        </Label>
      </div>

      <div className="p-4 bg-white rounded-lg">
        <Label className="block text-lg font-medium mb-3">Electronic Signature</Label>
        <div className="border border-border rounded-md h-24 bg-white flex items-center justify-center">
          <span className="text-muted-foreground">Sign here</span>
        </div>
        <Button variant="ghost" className="mt-2 p-0 h-auto text-primary">
          Clear signature
        </Button>
      </div>
    </div>
  </motion.div>
)

// Update the PaymentStep component to make all prepayment options selectable
const PaymentStep = () => {
  const [paymentOption, setPaymentOption] = useState("full-program")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Complete Your Payment
        </h2>
        <p className="text-muted-foreground">Choose a payment option and enter your details</p>
      </div>

      <div className="bg-white/60 p-6 rounded-lg shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Enrollment Fee</h3>
          <div className="p-4 bg-white rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Program Enrollment Fee</div>
                <div className="text-sm text-muted-foreground">One-time registration fee</div>
              </div>
              <div className="font-bold text-lg">$75.00</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Prepayment Options</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Save by prepaying for multiple sessions. Select an option below:
          </p>

          <RadioGroup value={paymentOption} onValueChange={setPaymentOption}>
            <div className="space-y-3">
              <div
                className={`rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition-colors border ${
                  paymentOption === "per-session" ? "border-primary bg-primary/5" : "border-border"
                } bg-white`}
                onClick={() => setPaymentOption("per-session")}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-start">
                    <RadioGroupItem value="per-session" id="per-session" className="mt-1" />
                    <div className="ml-3">
                      <Label htmlFor="per-session" className="font-medium">
                        Pay per session
                      </Label>
                      <p className="text-sm text-muted-foreground">$35 per session, paid weekly</p>
                    </div>
                  </div>
                  <div className="font-medium">$35/session</div>
                </div>
              </div>

              <div
                className={`rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition-colors border ${
                  paymentOption === "four-sessions" ? "border-primary bg-primary/5" : "border-border"
                } bg-white`}
                onClick={() => setPaymentOption("four-sessions")}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-start">
                    <RadioGroupItem value="four-sessions" id="four-sessions" className="mt-1" />
                    <div className="ml-3">
                      <Label htmlFor="four-sessions" className="font-medium">
                        4 Sessions (10% discount)
                      </Label>
                      <p className="text-sm text-muted-foreground">Prepay for 4 sessions</p>
                    </div>
                  </div>
                  <div className="font-medium">$126.00</div>
                </div>
              </div>

              <div
                className={`rounded-lg p-3 hover:bg-muted/70 cursor-pointer transition-colors border-2 ${
                  paymentOption === "full-program" ? "border-primary bg-primary/5" : "border-border bg-white"
                }`}
                onClick={() => setPaymentOption("full-program")}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-start">
                    <RadioGroupItem value="full-program" id="full-program" className="mt-1" />
                    <div className="ml-3">
                      <Label htmlFor="full-program" className="font-medium">
                        Full Program (20% discount)
                      </Label>
                      <p className="text-sm text-muted-foreground">Prepay for all 12 sessions</p>
                      <p className="text-xs text-primary mt-1 font-medium">BEST VALUE</p>
                    </div>
                  </div>
                  <div className="font-medium">$336.00</div>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Payment Method</h3>
          <div className="p-4 bg-white rounded-lg space-y-4">
            <RadioGroup defaultValue="credit-card" className="flex mb-4">
              <div className="border rounded-md px-4 py-2 flex items-center mr-2 bg-primary/5 border-primary">
                <RadioGroupItem value="credit-card" id="credit-card" className="mr-2" />
                <Label htmlFor="credit-card">Credit Card</Label>
              </div>
              <div className="border rounded-md px-4 py-2 flex items-center">
                <RadioGroupItem value="paypal" id="paypal" className="mr-2" />
                <Label htmlFor="paypal">PayPal</Label>
              </div>
            </RadioGroup>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="1234 5678 9012 3456" className="bg-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" className="bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" className="bg-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Update the SuccessPage component to be more visually appealing
const SuccessPage = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="max-w-2xl mx-auto text-center"
  >
    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <CheckCircle2 size={40} className="text-green-600" />
    </div>
    <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
      Enrollment Complete!
    </h2>
    <p className="text-xl text-muted-foreground mb-6">
      Thank you for completing your enrollment. We&apos;ve sent a confirmation email with all the details.
    </p>
    <div className="max-w-md mx-auto bg-white/60 rounded-lg p-5 text-left mb-6 shadow-sm">
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
          <span>Attend your first session at the scheduled time</span>
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

// Update the main EnrollmentForm component to fix spacing and layout issues
export default function EnrollmentForm() {
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
    {
      id: "payment",
      title: "Payment",
      initialIcon: CircleDollarSign,
      completedIcon: ShieldCheck,
    },
  ]

  // Array of components for each step
  const stepComponents = [
    <Welcome key="welcome" />,
    <PersonalInfoForm key="personal" />,
    <SchedulingStep key="scheduling" />,
    <DocumentsStep key="documents" />,
    <PaymentStep key="payment" />,
    <SuccessPage key="success" />,
  ]

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, stepComponents.length - 1))
  }

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
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
  const stepperIndex = currentStep === 0 ? 0 : currentStep >= stepComponents.length - 1 ? 3 : currentStep - 1

  // Calculate progress percentage
  const progressPercentage = (currentStep / (stepComponents.length - 1)) * 100

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header with logo */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 h-14 flex items-center">
          <div className="flex items-center">
            <Leaf className="h-6 w-6 text-emerald-600 mr-2" />
            <span className="font-bold text-lg">Three Trees</span>
          </div>

          {!isFirstStep && !isSuccessStep && (
            <div className="ml-auto flex items-center">
              <span className="text-xs text-muted-foreground mr-2">
                {currentStep}/{stepComponents.length - 2}
              </span>
              <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground ml-2">~5 min</span>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 pt-14 flex flex-col" ref={contentRef}>
        <div className="container mx-auto px-4 py-6 flex-1 flex flex-col max-w-4xl">
          {/* Show stepper only after welcome screen and before success screen */}
          {currentStep > 0 && currentStep < stepComponents.length - 1 && (
            <div className="mb-6">
              <AnimatedStepper steps={enrollmentSteps} currentStep={stepperIndex} />
            </div>
          )}

          {/* Step Content Area */}
          <div className="flex-1 flex items-start justify-center py-4">
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

          {/* Navigation Buttons */}
          {!isSuccessStep && (
            <div className="max-w-2xl mx-auto mt-auto pt-4 pb-2">
              <div className="flex items-center">
                {!isFirstStep && (
                  <Button onClick={goToPreviousStep} variant="ghost" className="mr-2">
                    <ArrowLeft size={16} className="mr-2" /> Back
                  </Button>
                )}

                <Button onClick={goToNextStep} className="ml-0" size={isFirstStep ? "lg" : "default"}>
                  {isFirstStep ? "Start Enrollment" : "Continue"}
                  {!isLastStep && <ArrowRight size={16} className="ml-2" />}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-sm border-t py-3">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Three Trees. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
