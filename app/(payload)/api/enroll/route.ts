import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { EnrollmentFormData } from '@/lib/form-types'
import { enrollmentFormSchema } from '@/lib/form-types'; // For backend Zod validation
import { ZodError } from 'zod'; // Import ZodError
import type { Client } from '@/payload-types'; // Import generated Client type

export async function POST(request: NextRequest) {
  const resolvedConfig = await configPromise; // Await if configPromise is truly a Promise
  const payload = await getPayload({ config: resolvedConfig })
  let requestBody: EnrollmentFormData;

  try {
    requestBody = await request.json();
  } catch (error) {
    console.error('Error parsing request body:', error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // --- 1. Backend Zod Validation --- 
  try {
    enrollmentFormSchema.parse(requestBody);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Backend validation failed:', error.errors);
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('Unknown validation error:', error);
    return NextResponse.json({ error: 'An unexpected validation error occurred' }, { status: 400 });
  }

  const { personalInfo, scheduling, documents, payment } = requestBody;

  try {
    // --- 2. Create Client using Payload Local API --- 
    const newClientPayloadData: Partial<Client> = {
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
      email: personalInfo.email || undefined, // Ensure undefined if empty string, matching optional schema
      phone: personalInfo.phone || undefined, // Ensure undefined if empty string
      city: personalInfo.city,
      sex: personalInfo.sex as Client['sex'], // Assert type from Client collection
      county: personalInfo.county as Client['county'], // Assert type from Client collection
      countyOther: personalInfo.countyOther,
      referralSource: personalInfo.referralSource as Client['referralSource'], // Assert type
      referralSourceOther: personalInfo.referralSourceOther,
      whyReferred: personalInfo.whyReferred,
      selectedProgram: personalInfo.selectedProgram,
      selectedClassSlotId: scheduling.selectedClassSlotId,
      agreedToTerms: documents.agreedToTerms,
      paymentOption: payment.paymentOption as Client['paymentOption'], // Assert type
      agreeToRecurring: payment.agreeToRecurring,
    };

    console.log('Data to be sent to Payload for client creation:', newClientPayloadData);

    const createdClient = await payload.create({
      collection: 'clients',
      data: newClientPayloadData as Omit<Client, 'id' | 'createdAt' | 'updatedAt'>, // More precise cast
    });

    console.log('Client created in Payload:', createdClient);

    // --- TODO: Further steps --- (Placeholders)
    // 1. Create Enrollment record
    //    const enrollmentData = {
    //      client: createdClient.id,
    //      classSlot: scheduling.selectedClassSlotId, // This needs to be a valid ID from ClassSlots collection
    //      enrollmentDate: new Date(),
    //      status: 'active',
    //    };
    //    const newEnrollment = await payload.create({
    //      collection: 'enrollments',
    //      data: enrollmentData,
    //    });
    //    console.log('Enrollment created:', newEnrollment);

    // 2. Handle payment processing (Square)
    // 3. Create Payment record
    // 4. Send confirmation emails

    return NextResponse.json({ 
      message: 'Enrollment successful! Client created.', 
      clientId: createdClient.id 
    }, { status: 201 });

  } catch (error) {
    console.error('Error processing enrollment in Payload:', error);
    if (typeof error === 'object' && error !== null && 'name' in error && error.name === 'APIError' && 'data' in error && typeof error.data === 'object' && error.data !== null && 'errors' in error.data) {
      // This is a basic check for Payload APIError structure
      const payloadError = error as { name: string; data: { errors: unknown[] }; status?: number };
      return NextResponse.json({ error: 'Payload API Error', details: payloadError.data.errors }, { status: payloadError.status || 500 });
    }
    const message = error instanceof Error ? error.message : 'Internal Server Error during Payload operation';
    return NextResponse.json({ error: message }, { status: 500 });
  }
} 