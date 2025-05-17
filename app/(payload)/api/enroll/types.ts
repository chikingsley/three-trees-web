import type { Client as PayloadGeneratedClient } from '@/payload-types';

// Re-export or create a local alias for the main Client type from Payload
export type Client = PayloadGeneratedClient;

// Define a type for the data used to update/create clients
export type ClientUpdateData = Omit<Partial<Client>, 'selectedClassSlot' | 'selectedClassSlotId'> & {
    class?: string | null; // ID of the Classes document
    signature?: string;
    enrollmentProcessStatus?: Client['enrollmentProcessStatus'];
    paymentStatus?: Client['paymentStatus'];
    squareCustomerId?: string | null;
    squareSubscriptionId?: string | null;
};

// Type for raw request body structure (can be expanded)
export interface EnrollmentRequestBody {
    submissionPhase: string;
    personalInfo?: any; // Define more strictly if possible
    scheduling?: { selectedClassId: string };
    documents?: { agreedToTerms: boolean; signature: string };
    paymentDetails?: { cardNonce: string; dueTodayAmount: number; paymentOption: string };
    [key: string]: any; // For other potential fields
}