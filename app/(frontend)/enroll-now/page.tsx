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
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

// Define interface for step items
interface StepItem {
  id: string
  title: string
  initialIcon: React.ElementType
  completedIcon: React.ElementType
}

// Define interfaces for form data
interface PersonalInfoData {
  firstName: string;
  lastName: string;
  city: string;
  county: string;
  referralSource: string;
  programType: string;
}

interface SchedulingData {
  selectedDay: string;
  selectedTime: string;
}

interface DocumentsData {
  agreedToTerms: boolean;
  signature: string;
}

interface PaymentData {
  paymentOption: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

interface FormData {
  personalInfo: PersonalInfoData;
  scheduling: SchedulingData;
  documents: DocumentsData;
  payment: PaymentData;
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

// Step Item Component for Welcome section
const StepItem = ({ icon, iconLarge, title, description }: { icon: React.ReactNode, iconLarge: React.ReactNode, title: string, description: string }) => (
  <div className="flex items-start">
    {/* Adjusted padding/margin with responsiveness */}
    <div className="bg-primary/10 p-1.5 md:p-2 rounded-full mr-3 md:mr-4 shrink-0 flex items-center justify-center">
      <div className="md:hidden">{icon}</div>
      <div className="hidden md:block">{iconLarge}</div>
    </div>
    <div>
      {/* Responsive text sizes */}
      <h3 className="font-medium text-sm md:text-base">{title}</h3>
      <p className="text-xs md:text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

// Update the Welcome component using StepItem and responsive styles but without Card
const Welcome = () => (
  <div className="pt-6 md:pt-10 px-6 md:px-8 flex flex-col flex-1 items-center justify-center">
    {/* Header Section - Added responsive styles */}
    <div className="text-center mb-8 md:mb-10 max-w-md mx-auto">
      {/* Removed message square icon */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-5 text-primary">
        Welcome to Three Trees
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-3">
        Complete your enrollment in <span className="font-medium text-primary">5 minutes or less</span>
      </p>
      <p className="text-sm md:text-base text-muted-foreground">We&apos;ll guide you through each step of the process</p>
    </div>

    {/* Steps Section - Using StepItem */}
    <div className="space-y-4 text-left mb-8 max-w-md mx-auto w-full">
      <StepItem 
        icon={<UserIcon size={18} className="text-primary" />}
        iconLarge={<UserIcon size={20} className="text-primary" />}
        title="Personal Information"
        description="Tell us about yourself and your referral source"
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
      
      <StepItem 
        icon={<CircleDollarSign size={18} className="text-primary" />}
        iconLarge={<CircleDollarSign size={20} className="text-primary" />}
        title="Complete Payment"
        description="Pay enrollment fee and select prepayment options"
      />
    </div>
    {/* Removed Get Started button - handled by main page navigation */}
  </div>
)

// Update the PersonalInfoForm component to use and update form data
const PersonalInfoForm = ({ formData, updateFormData }: { 
  formData: PersonalInfoData; 
  updateFormData: (data: Partial<PersonalInfoData>) => void 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="pt-3 md:pt-4 px-0"
  >
    <div className="mb-4 text-center">
      <h2 className="text-2xl font-bold mb-1 text-primary">
        Tell us about yourself
      </h2>
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
        <Select 
          value={formData.referralSource}
          onValueChange={(value) => updateFormData({ referralSource: value })}
        >
          <SelectTrigger id="referralSource">
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
        <Select
          value={formData.programType}
          onValueChange={(value) => updateFormData({ programType: value })}
        >
          <SelectTrigger id="programType">
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

// Update the SchedulingStep component to use and update form data
const SchedulingStep = ({ formData, updateFormData }: {
  formData: SchedulingData;
  updateFormData: (data: Partial<SchedulingData>) => void
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-3 md:pt-4 px-0"
    >
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold mb-1 text-primary">
          When would you like to attend?
        </h2>
        <p className="text-muted-foreground text-sm">Choose a day and time that works best for your schedule</p>
      </div>

      <div className="p-2 rounded-lg space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-3">Choose a day of the week:</h3>
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
          <h3 className="text-lg font-medium mb-3">Available time slots:</h3>
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

// Update the DocumentsStep component to use and update form data
const DocumentsStep = ({ formData, updateFormData }: {
  formData: DocumentsData;
  updateFormData: (data: Partial<DocumentsData>) => void
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="pt-3 md:pt-4 px-0"
  >
    <div className="mb-4 text-center">
      <h2 className="text-2xl font-bold mb-1 text-primary">
        Review Program Agreement
      </h2>
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

// Update the PaymentStep component to use and update form data
const PaymentStep = ({ formData, updateFormData }: {
  formData: PaymentData;
  updateFormData: (data: Partial<PaymentData>) => void
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-3 md:pt-4 px-0"
    >
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold mb-1 text-primary">
          Complete Your Payment
        </h2>
        <p className="text-muted-foreground text-sm">Choose a payment option and enter your details</p>
      </div>

      <div className="p-2 rounded-lg space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-3">Enrollment Fee</h3>
          <div className="p-4 rounded-lg border border-border">
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

          <RadioGroup 
            value={formData.paymentOption} 
            onValueChange={(value) => updateFormData({ paymentOption: value })}
          >
            <div className="space-y-3">
              <div
                className={`rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition-colors border ${
                  formData.paymentOption === "per-session" ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => updateFormData({ paymentOption: "per-session" })}
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
                  formData.paymentOption === "four-sessions" ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => updateFormData({ paymentOption: "four-sessions" })}
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
                className={`rounded-lg p-3 hover:bg-muted/70 cursor-pointer transition-colors border ${
                  formData.paymentOption === "full-program" ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => updateFormData({ paymentOption: "full-program" })}
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
          <div className="p-4 border border-border rounded-lg space-y-4">
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
                <Input 
                  id="card-number" 
                  placeholder="1234 5678 9012 3456" 
                  value={formData.cardNumber}
                  onChange={(e) => updateFormData({ cardNumber: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input 
                    id="expiry" 
                    placeholder="MM/YY" 
                    value={formData.expiry}
                    onChange={(e) => updateFormData({ expiry: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input 
                    id="cvc" 
                    placeholder="123" 
                    value={formData.cvc}
                    onChange={(e) => updateFormData({ cvc: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Update the SuccessPage component to use form data
const SuccessPage = ({ formData }: { formData: FormData }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="pt-3 md:pt-4 px-0 text-center"
  >
    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <CheckCircle2 size={40} className="text-green-600" />
    </div>
    <h2 className="text-3xl font-bold mb-3 text-primary">
      Enrollment Complete!
    </h2>
    <p className="text-xl text-muted-foreground mb-6">
      Thank you for completing your enrollment{formData.personalInfo.firstName ? `, ${formData.personalInfo.firstName}` : ''}. We&apos;ve sent a confirmation email with all the details.
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
          <span>Attend your first session {formData.scheduling.selectedDay ? `on ${formData.scheduling.selectedDay}` : ''} {formData.scheduling.selectedTime ? `at ${formData.scheduling.selectedTime.split(' - ')[0]}` : ''}</span>
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

// Update main render: remove WizardShell and implement state management and history
export default function EnrollmentForm() {
  // Form data state to persist between steps
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      city: "",
      county: "",
      referralSource: "",
      programType: ""
    },
    scheduling: {
      selectedDay: "",
      selectedTime: ""
    },
    documents: {
      agreedToTerms: false,
      signature: ""
    },
    payment: {
      paymentOption: "full-program",
      cardNumber: "",
      expiry: "",
      cvc: ""
    }
  });

  // Update form data handlers
  const updatePersonalInfo = (data: Partial<typeof formData.personalInfo>) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...data
      }
    }));
  };

  const updateScheduling = (data: Partial<typeof formData.scheduling>) => {
    setFormData(prev => ({
      ...prev,
      scheduling: {
        ...prev.scheduling,
        ...data
      }
    }));
  };

  const updateDocuments = (data: Partial<typeof formData.documents>) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        ...data
      }
    }));
  };

  const updatePayment = (data: Partial<typeof formData.payment>) => {
    setFormData(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        ...data
      }
    }));
  };

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

  // Array of components for each step with props for form data
  const stepComponents = [
    <Welcome key="welcome" />,
    <PersonalInfoForm 
      key="personal" 
      formData={formData.personalInfo} 
      updateFormData={updatePersonalInfo} 
    />,
    <SchedulingStep 
      key="scheduling" 
      formData={formData.scheduling} 
      updateFormData={updateScheduling} 
    />,
    <DocumentsStep 
      key="documents" 
      formData={formData.documents} 
      updateFormData={updateDocuments} 
    />,
    <PaymentStep 
      key="payment" 
      formData={formData.payment} 
      updateFormData={updatePayment} 
    />,
    <SuccessPage key="success" formData={formData} />,
  ]

  // Handle browser history navigation
  useEffect(() => {
    // Add current step to history state when it changes
    window.history.pushState({ step: currentStep }, "", "");

    // Handle popstate (browser back/forward buttons)
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && typeof event.state.step === 'number') {
        setCurrentStep(event.state.step);
      } else if (currentStep > 0) {
        // If no state but we're not at the first step, go back
        setCurrentStep(prev => prev - 1);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentStep]);

  const goToNextStep = () => {
    const nextStep = Math.min(currentStep + 1, stepComponents.length - 1);
    setCurrentStep(nextStep);
    // Add to history
    window.history.pushState({ step: nextStep }, "", "");
  }

  const goToPreviousStep = () => {
    const prevStep = Math.max(currentStep - 1, 0);
    setCurrentStep(prevStep);
    // Add to history
    window.history.pushState({ step: prevStep }, "", "");
  }

  // Scroll to top when changing steps
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }
  }, [currentStep]);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === stepComponents.length - 1;
  const isSuccessStep = currentStep === stepComponents.length - 1;

  // Calculate which step to highlight in the stepper (welcome and success are not in the stepper)
  const stepperIndex = currentStep === 0 ? 0 : currentStep >= stepComponents.length - 1 ? 3 : currentStep - 1;

  return (
    <div className="flex flex-col min-h-screen bg-muted">
      <main className="flex-1 pt-4 sm:pt-8 pb-4 sm:pb-6 flex flex-col" ref={contentRef}>
        {/* Full-width stepper without card wrapper */}
        {currentStep > 0 && currentStep < stepComponents.length - 1 && (
          <div className="mb-6 sm:mb-8 container mx-auto px-4">
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
          <div className="flex flex-wrap items-center justify-center gap-x-1 sm:gap-x-2 gap-y-1">
            {[ 
              { title: "Privacy Policy", href: "/privacy" },
              { title: "Terms of Service", href: "/terms" },
              { title: "Accessibility", href: "/accessibility" },
            ].map(({ title, href }, index) => (
              <div key={title} className="flex items-center">
                {index > 0 && (
                  <span className="mx-1 sm:mx-2 text-muted-foreground flex items-center justify-center w-1">•</span>
                )}
                <Link href={href} className="hover:text-primary transition-colors">
                  {title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
