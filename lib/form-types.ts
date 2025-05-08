import { z } from "zod";

// Unique County Names (extracted from user list)
export const countyNames = [
  "Abbeville", "Aiken", "York", "Charleston", "Chester", "Dorchester", 
  "Edgefield", "Fairfield", "Greenville", "Horry", "Lancaster", 
  "Lexington", "Orangeburg", "Richland", "Spartanburg", "Union"
] as const; // Use 'as const' for literal types if needed by Select

// Referral Sources
export const referralSources = [
  "Probation Pardon & Parole (PPP)",
  "Pretrial Intervention (PTI)",
  "Department of Social Services (DSS)",
] as const;

// Individual Step Schemas
export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  city: z.string().min(1, "City is required"),
  county: z.string({ required_error: "County is required" }).min(1, "County is required"),
  countyOther: z.string().optional(),
  referralSource: z.string({ required_error: "Referral source is required" }).min(1, "Referral source is required"),
  referralSourceOther: z.string().optional(),
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
  if (data.county !== 'Other' && data.countyOther) {
    // Optional: You might want to clear countyOther if county is changed from Other
    // data.countyOther = undefined; // This mutation is tricky in refine, better handled in component logic if needed
  }

  // If referralSource is 'Other', referralSourceOther must be provided
  if (data.referralSource === 'Other' && !data.referralSourceOther) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please specify the referral source",
      path: ['referralSourceOther'],
    });
  }
  if (data.referralSource !== 'Other' && data.referralSourceOther) {
    // Optional: Clear referralSourceOther if referralSource is changed from Other
    // data.referralSourceOther = undefined;
  }
});

export const programSelectionSchema = z.array(z.string()).min(1, "Please select at least one program");

export const schedulingSchema = z.object({
  selectedDay: z.string().min(1, "Day selection is required"),
  selectedTime: z.string().min(1, "Time selection is required"),
});

export const documentsSchema = z.object({
  agreedToTerms: z.boolean().refine(val => val === true, "You must agree to the program agreement"),
  signature: z.string().optional(), 
});

export const paymentSchema = z.object({
  paymentOption: z.string(),
  cardNumber: z.string().optional(), 
  expiry: z.string().optional(), 
  cvc: z.string().optional(), 
});

// Main Enrollment Form Schema
export const enrollmentFormSchema = z.object({
  personalInfo: personalInfoSchema,
  selectedPrograms: programSelectionSchema,
  scheduling: schedulingSchema,
  documents: documentsSchema,
  payment: paymentSchema,
});

// Infer TypeScript type from Zod schema
export type EnrollmentFormData = z.infer<typeof enrollmentFormSchema>; 