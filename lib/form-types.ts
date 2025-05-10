import { z } from "zod";
export interface Program {
  id: string
  name: string
  duration: string
  description: string
  weeks: number
  costPerSession: number
  enrollmentFee: number
}

export const PROGRAM_DATA: Program[] = [
  {
    id: "dv_male", name: "Domestic Violence (Male Group)", duration: "26 weeks",
    description: "For male individuals addressing domestic violence issues",
    weeks: 26, costPerSession: 35, enrollmentFee: 50,
  },
  {
    id: "dv_female", name: "Domestic Violence (Female Group)", duration: "26 weeks",
    description: "For female individuals addressing domestic violence issues",
    weeks: 26, costPerSession: 35, enrollmentFee: 50,
  },
  {
    id: "sort", name: "Sex Offender Responsible Thinking", duration: "18 months",
    description: "Specialized program for sex offender rehabilitation",
    weeks: 78, costPerSession: 40, enrollmentFee: 90,
  },
  {
    id: "am", name: "Anger Management", duration: "12 weeks",
    description: "Learn to manage anger and emotional responses (Level 1)",
    weeks: 12, costPerSession: 35, enrollmentFee: 50,
  },
  {
    id: "sact", name: "Substance Abuse + Critical Thinking", duration: "12 weeks",
    description: "Address substance abuse issues with critical thinking skills (Level 1)",
    weeks: 12, costPerSession: 35, enrollmentFee: 50,
  },
  {
    id: "pp", name: "Positive Parenting", duration: "12 weeks",
    description: "Develop effective parenting skills and techniques (Level 1)",
    weeks: 12, costPerSession: 35, enrollmentFee: 50,
  },
];

export const countyNames = [
  "Abbeville", "Aiken", "York", "Charleston", "Chester", "Dorchester", 
  "Edgefield", "Fairfield", "Greenville", "Horry", "Lancaster", 
  "Lexington", "Orangeburg", "Richland", "Spartanburg", "Union"
] as const;

export const referralSources = [
  "Probation Pardon & Parole (PPP)",
  "Pretrial Intervention (PTI)",
  "Department of Social Services (DSS)",
] as const;

// Type definitions for Payment Step
// (Moved from PaymentStep/index.tsx)
export type PaymentOption = "pay_as_you_go" | "autopay_weekly" | "full_program";

export interface PaymentData {
  paymentOption: PaymentOption;
  agreeToRecurring?: boolean;
}

// Individual Step Schemas
export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string().min(1, "Phone is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipcode: z.string().regex(/^\d{5}$/, "Zip code must be 5 digits"),
  sex: z.enum(["Male", "Female"], { required_error: "Sex is required" }),
  county: z.string({ required_error: "County is required" }).min(1, "County is required"),
  countyOther: z.string().optional(),
  consentToContact: z.boolean().refine(val => val === true, { 
    message: "You must consent to be contacted to proceed." 
  }),
  referralSource: z.string({ required_error: "Referral source is required" }).min(1, "Referral source is required"),
  referralSourceOther: z.string().optional(),
  whyReferred: z.string().min(1, "Reason for referral is required"),
  selectedProgram: z.string().min(1, "Program selection is required"),
}).superRefine((data, ctx) => {
  // If county is 'Other', countyOther must be provided
  if (data.county === 'Other' && !data.countyOther) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please specify the county",
      path: ['countyOther'], // Path to the field to attach the error
    });
  }
  // If county is not 'Other', countyOther should ideally be empty/null (optional: add refinement to clear it)
  // No specific action needed here for superRefine, component can handle clearing if necessary

  // If referralSource is 'Other', referralSourceOther must be provided
  if (data.referralSource === 'Other' && !data.referralSourceOther) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please specify the referral source",
      path: ['referralSourceOther'],
    });
  }
  // No specific action for referralSource !== 'Other' in superRefine
});

export const schedulingSchema = z.object({
  selectedClassSlotId: z.string({required_error: "Please select a class time"}).min(1, "Please select a class time"),
});

export const documentsSchema = z.object({
  agreedToTerms: z.boolean().refine(val => val === true, "You must agree to the program agreement"),
  signature: z.string().optional(), 
});

// Update paymentSchema to use PaymentOption type if desired, or keep as string
export const paymentSchema = z.object({
  paymentOption: z.enum(["pay_as_you_go", "autopay_weekly", "full_program"], { 
    required_error: "Please select a payment option" 
  }),
  agreeToRecurring: z.boolean().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentOption === 'autopay_weekly' && !data.agreeToRecurring) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "You must agree to recurring weekly charges for the autopay option.",
      path: ['agreeToRecurring'],
    });
  }
  // If agreeToRecurring is true, paymentOption MUST be autopay_weekly.
  // This prevents submitting consent for non-recurring or pay_as_you_go options.
  if (data.agreeToRecurring === true && data.paymentOption !== 'autopay_weekly') {
    ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Recurring agreement is only valid if autopay weekly is selected.",
        path: ['agreeToRecurring'], // Or path: ['paymentOption']
    });
  }
});

// Main Enrollment Form Schema
export const enrollmentFormSchema = z.object({
  personalInfo: personalInfoSchema,
  scheduling: schedulingSchema,
  documents: documentsSchema,
  payment: paymentSchema,
});

// Infer TypeScript type from Zod schema
export type EnrollmentFormData = z.infer<typeof enrollmentFormSchema>;

// --- Class Schedule Data Structure & Example --- 
// Map Level 1 program IDs to a common ID for scheduling if they share times/spots
export const LEVEL_1_PROGRAM_IDS = ["am", "sact", "pp"];
export const L1_SCHEDULE_PROGRAM_ID = "l1";

export interface ClassSlot {
  id: string; 
  programId: string; 
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  time: string; 
  genderSpecific?: "male" | "female"; 
  spotsTotal: number;
}

export const CLASS_SCHEDULE_DATA: ClassSlot[] = [
  // Monday
  { id: "dv-f-mon-5pm-1", programId: "dv_female", day: "Monday", time: "5:00 PM", genderSpecific: "female", spotsTotal: 10 },
  { id: "dv-f-mon-5pm-2", programId: "dv_female", day: "Monday", time: "5:00 PM", genderSpecific: "female", spotsTotal: 10 },
  { id: "sort-mon-530pm-1", programId: "sort", day: "Monday", time: "5:30 PM", spotsTotal: 8 },
  { id: "sort-mon-6pm-1", programId: "sort", day: "Monday", time: "6:00 PM", spotsTotal: 8 },
  { id: "dv-m-mon-7pm-1", programId: "dv_male", day: "Monday", time: "7:00 PM", genderSpecific: "male", spotsTotal: 10 },
  { id: "dv-m-mon-7pm-2", programId: "dv_male", day: "Monday", time: "7:00 PM", genderSpecific: "male", spotsTotal: 10 },
  { id: "dv-m-mon-7pm-3", programId: "dv_male", day: "Monday", time: "7:00 PM", genderSpecific: "male", spotsTotal: 10 },
  { id: "dv-m-mon-7pm-4", programId: "dv_male", day: "Monday", time: "7:00 PM", genderSpecific: "male", spotsTotal: 10 },

  // Tuesday
  { id: "dv-m-tue-7pm-1", programId: "dv_male", day: "Tuesday", time: "7:00 PM", genderSpecific: "male", spotsTotal: 10 },
  { id: "dv-m-tue-7pm-2", programId: "dv_male", day: "Tuesday", time: "7:00 PM", genderSpecific: "male", spotsTotal: 10 },
  { id: "dv-m-tue-7pm-3", programId: "dv_male", day: "Tuesday", time: "7:00 PM", genderSpecific: "male", spotsTotal: 10 },

  // Wednesday
  { id: "sort-wed-10am-1", programId: "sort", day: "Wednesday", time: "10:00 AM", spotsTotal: 8 },
  { id: "sort-wed-6pm-1", programId: "sort", day: "Wednesday", time: "6:00 PM", spotsTotal: 8 },
  { id: "dv-m-wed-6pm-1", programId: "dv_male", day: "Wednesday", time: "6:00 PM", genderSpecific: "male", spotsTotal: 10 },
  { id: "dv-m-wed-6pm-2", programId: "dv_male", day: "Wednesday", time: "6:00 PM", genderSpecific: "male", spotsTotal: 10 },
  { id: "dv-f-wed-630pm-1", programId: "dv_female", day: "Wednesday", time: "6:30 PM", genderSpecific: "female", spotsTotal: 10 },
  { id: "dv-f-wed-630pm-2", programId: "dv_female", day: "Wednesday", time: "6:30 PM", genderSpecific: "female", spotsTotal: 10 },

  // Thursday
  { id: "sort-thu-6pm-1", programId: "sort", day: "Thursday", time: "6:00 PM", spotsTotal: 8 },
  { id: "l1-thu-630pm-1", programId: L1_SCHEDULE_PROGRAM_ID, day: "Thursday", time: "6:30 PM", spotsTotal: 12 },
  { id: "l1-thu-630pm-2", programId: L1_SCHEDULE_PROGRAM_ID, day: "Thursday", time: "6:30 PM", spotsTotal: 12 },
  { id: "dv-m-thu-7pm-1", programId: "dv_male", day: "Thursday", time: "7:00 PM", genderSpecific: "male", spotsTotal: 10 },
  { id: "dv-m-thu-7pm-2", programId: "dv_male", day: "Thursday", time: "7:00 PM", genderSpecific: "male", spotsTotal: 10 },

  // Saturday
  { id: "dv-m-sat-8am-1", programId: "dv_male", day: "Saturday", time: "8:00 AM", genderSpecific: "male", spotsTotal: 10 },
  { id: "dv-m-sat-8am-2", programId: "dv_male", day: "Saturday", time: "8:00 AM", genderSpecific: "male", spotsTotal: 10 },
  { id: "l1-sat-10am-1", programId: L1_SCHEDULE_PROGRAM_ID, day: "Saturday", time: "10:00 AM", spotsTotal: 12 },
  { id: "l1-sat-10am-2", programId: L1_SCHEDULE_PROGRAM_ID, day: "Saturday", time: "10:00 AM", spotsTotal: 12 },
  { id: "l1-sat-10am-3", programId: L1_SCHEDULE_PROGRAM_ID, day: "Saturday", time: "10:00 AM", spotsTotal: 12 },
  { id: "l1-sat-10am-4", programId: L1_SCHEDULE_PROGRAM_ID, day: "Saturday", time: "10:00 AM", spotsTotal: 12 },
  { id: "dv-m-sat-1130am-1", programId: "dv_male", day: "Saturday", time: "11:30 AM", genderSpecific: "male", spotsTotal: 10 },
  { id: "dv-m-sat-1130am-2", programId: "dv_male", day: "Saturday", time: "11:30 AM", genderSpecific: "male", spotsTotal: 10 },
  { id: "dv-m-sat-1130am-3", programId: "dv_male", day: "Saturday", time: "11:30 AM", genderSpecific: "male", spotsTotal: 10 },
  { id: "dv-m-sat-1130am-4", programId: "dv_male", day: "Saturday", time: "11:30 AM", genderSpecific: "male", spotsTotal: 10 },
];
// --- End Class Schedule Data --- 