import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { EnrollmentFormData } from '@/lib/form-types'
import { enrollmentFormSchema } from '@/lib/form-types'; // For backend Zod validation
import { ZodError } from 'zod'; // Import ZodError
import type { Client } from '@/payload-types'; // Import generated Client type

// Define a type for the data used to update/create clients, including the new status field
type ClientUpdateData = Partial<Client> & { enrollmentProcessStatus?: string };

export async function POST(request: NextRequest) {
  const resolvedConfig = await configPromise;
  const payload = await getPayload({ config: resolvedConfig });
  let rawRequestBody: any; // Using any for now, will access specific parts

  try {
    rawRequestBody = await request.json();
  } catch (error) {
    console.error('Error parsing request body:', error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const submissionPhase = rawRequestBody.submissionPhase as string;
  const receivedClientId = rawRequestBody.clientId as string | undefined;
  
  // Extract email carefully, as personalInfo might not always be present or complete
  const clientEmailFromRequest = typeof rawRequestBody.personalInfo?.email === 'string' 
    ? rawRequestBody.personalInfo.email 
    : undefined;

  try {
    let clientRecord: Client | null = null;

    // For phases other than initial contactInfo, try to find client by ID if provided
    if (receivedClientId && submissionPhase !== 'contactInfo') {
      try {
        clientRecord = await payload.findByID({
          collection: 'clients',
          id: receivedClientId,
        });
      } catch (error) { // findByID throws if not found or ID is malformed. Changed 'e' to 'error' and using it.
        console.warn(`Client lookup by ID ${receivedClientId} for phase ${submissionPhase} failed: ${error instanceof Error ? error.message : String(error)}. Will attempt email lookup if applicable.`);
        clientRecord = null;
      }
      if (!clientRecord) {
        // Optional: if ID lookup fails, you might decide to error out or fallback to email only if really needed.
        // For now, we log and let it proceed to potential email lookup logic within each phase if designed that way.
        console.warn(`Client with ID ${receivedClientId} not found for phase ${submissionPhase}.`);
      }
    }

    if (submissionPhase === 'contactInfo') {
      const { personalInfo } = rawRequestBody;
      if (!personalInfo) {
        return NextResponse.json({ error: 'PersonalInfo is required for contactInfo phase.' }, { status: 400 });
      }
      const { firstName, lastName, email, phone, city, state, zipcode, sex, county, countyOther, consentToContact } = personalInfo;

      if (!email) {
        return NextResponse.json({ error: 'Email is required for contactInfo phase.' }, { status: 400 });
      }

      const existingClientQuery = await payload.find({
        collection: 'clients',
        where: { email: { equals: email } },
        limit: 1,
      });

      const dataForUpsert: ClientUpdateData = {
        email,
        firstName,
        lastName,
        phone: phone || undefined,
        city,
        state,
        zipcode,
        sex: sex as Client['sex'],
        county: county as Client['county'],
        countyOther: countyOther || undefined,
        consentToContact: consentToContact ?? undefined,
        enrollmentProcessStatus: 'contact_info_collected',
      };

      if (existingClientQuery.docs.length > 0) {
        const clientToUpdate = existingClientQuery.docs[0];
        const updatedClient = await payload.update({
          collection: 'clients',
          id: clientToUpdate.id,
          data: dataForUpsert,
        });
        return NextResponse.json({ message: 'Contact info updated.', clientId: updatedClient.id, phase: submissionPhase }, { status: 200 });
      } else {
        const createdClient = await payload.create({
          collection: 'clients',
          data: dataForUpsert as Omit<Client, 'id' | 'createdAt' | 'updatedAt'> & { enrollmentProcessStatus?: string },
        });
        return NextResponse.json({ message: 'Contact info saved.', clientId: createdClient.id, phase: submissionPhase }, { status: 201 });
      }
    } else if (submissionPhase === 'programInfo') {
      if (!clientEmailFromRequest) return NextResponse.json({ error: 'Client email not provided for programInfo update.' }, { status: 400 });
      const { personalInfo } = rawRequestBody;
      if (!personalInfo) return NextResponse.json({ error: 'PersonalInfo is required for programInfo phase.' }, { status: 400 });

      const existingClientQuery = await payload.find({ collection: 'clients', where: { email: { equals: clientEmailFromRequest } }, limit: 1 });
      if (existingClientQuery.docs.length === 0) return NextResponse.json({ error: 'Client not found for programInfo update.' }, { status: 404 });
      
      const clientToUpdate = existingClientQuery.docs[0];
      const { referralSource, referralSourceOther, selectedProgram, whyReferred } = personalInfo;
      const updateData: ClientUpdateData = {
        referralSource: referralSource as Client['referralSource'],
        referralSourceOther: referralSourceOther || undefined,
        selectedProgram,
        whyReferred: whyReferred || undefined,
        enrollmentProcessStatus: 'program_info_collected',
      };
      const updatedClient = await payload.update({ collection: 'clients', id: clientToUpdate.id, data: updateData });
      return NextResponse.json({ message: 'Program info saved.', clientId: updatedClient.id, phase: submissionPhase }, { status: 200 });

    } else if (submissionPhase === 'scheduling') {
      if (!clientEmailFromRequest) return NextResponse.json({ error: 'Client email not provided for scheduling update.' }, { status: 400 });
      const { scheduling } = rawRequestBody;
      if (!scheduling || !scheduling.selectedClassSlotId) return NextResponse.json({ error: 'Scheduling info is required.' }, { status: 400 });
      
      const existingClientQuery = await payload.find({ collection: 'clients', where: { email: { equals: clientEmailFromRequest } }, limit: 1 });
      if (existingClientQuery.docs.length === 0) return NextResponse.json({ error: 'Client not found for scheduling update.' }, { status: 404 });

      const clientToUpdate = existingClientQuery.docs[0];
      const updateData: ClientUpdateData = {
        selectedClassSlotId: scheduling.selectedClassSlotId,
        enrollmentProcessStatus: 'schedule_selected',
      };
      const updatedClient = await payload.update({ collection: 'clients', id: clientToUpdate.id, data: updateData });
      return NextResponse.json({ message: 'Scheduling info saved.', clientId: updatedClient.id, phase: submissionPhase }, { status: 200 });

    } else if (submissionPhase === 'consent') {
      if (!clientEmailFromRequest) return NextResponse.json({ error: 'Client email not provided for consent update.' }, { status: 400 });
      const { documents } = rawRequestBody;
      if (!documents || typeof documents.agreedToTerms !== 'boolean') return NextResponse.json({ error: 'Consent information is required.' }, { status: 400 });
      
      const existingClientQuery = await payload.find({ collection: 'clients', where: { email: { equals: clientEmailFromRequest } }, limit: 1 });
      if (existingClientQuery.docs.length === 0) return NextResponse.json({ error: 'Client not found for consent update.' }, { status: 404 });
      
      const clientToUpdate = existingClientQuery.docs[0];
      const updateData: ClientUpdateData = {
        agreedToTerms: documents.agreedToTerms,
        enrollmentProcessStatus: 'consent_agreed',
      };
      const updatedClient = await payload.update({ collection: 'clients', id: clientToUpdate.id, data: updateData });
      return NextResponse.json({ message: 'Consent info saved.', clientId: updatedClient.id, phase: submissionPhase }, { status: 200 });

    } else if (submissionPhase === 'final') {
      if (!clientEmailFromRequest) return NextResponse.json({ error: 'Client email not provided for final update.' }, { status: 400 });
      
      // In the 'final' phase, we expect the full form data for validation
      try {
        enrollmentFormSchema.parse(rawRequestBody);
      } catch (error) {
        if (error instanceof ZodError) {
          console.error('Final backend validation failed:', error.errors);
          return NextResponse.json({ error: 'Final validation failed', details: error.errors }, { status: 400 });
        }
        console.error('Unknown final validation error:', error);
        return NextResponse.json({ error: 'An unexpected final validation error occurred' }, { status: 400 });
      }

      const existingClientQuery = await payload.find({ collection: 'clients', where: { email: { equals: clientEmailFromRequest } }, limit: 1 });
      if (existingClientQuery.docs.length === 0) return NextResponse.json({ error: 'Client not found for final update.' }, { status: 404 });

      const clientToUpdate = existingClientQuery.docs[0];
      const { payment, personalInfo, scheduling, documents } = rawRequestBody as EnrollmentFormData; // Cast to full type after validation

      // Consolidate all data for the final update.
      // Many fields would have been set in previous steps but re-apply them here to ensure consistency from the validated full requestBody.
      const finalClientData: ClientUpdateData = {
        // Personal Info
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        email: personalInfo.email, // email is key, ensure it's here
        phone: personalInfo.phone || undefined,
        city: personalInfo.city,
        state: personalInfo.state,
        zipcode: personalInfo.zipcode,
        sex: personalInfo.sex as Client['sex'],
        county: personalInfo.county as Client['county'],
        countyOther: personalInfo.countyOther || undefined,
        referralSource: personalInfo.referralSource as Client['referralSource'],
        referralSourceOther: personalInfo.referralSourceOther || undefined,
        whyReferred: personalInfo.whyReferred || undefined,
        selectedProgram: personalInfo.selectedProgram,
        consentToContact: personalInfo.consentToContact ?? undefined,
        // Scheduling
        selectedClassSlotId: scheduling.selectedClassSlotId,
        // Documents
        agreedToTerms: documents.agreedToTerms,
        // Payment
        paymentOption: payment.paymentOption as Client['paymentOption'],
        agreeToRecurring: payment.agreeToRecurring ?? false,
        enrollmentProcessStatus: 'final_data_collected_pending_payment',
      };
      
      const updatedClient = await payload.update({
        collection: 'clients',
        id: clientToUpdate.id,
        data: finalClientData,
      });

      console.log('Client data finalized in Payload, ready for payment processing:', updatedClient);

      // --- TODO: Further steps from original code ---
      // 1. Create Enrollment record (using updatedClient.id and scheduling.selectedClassSlotId)
      //    const enrollmentData = {
      //      client: updatedClient.id,
      //      classSlot: scheduling.selectedClassSlotId, 
      //      enrollmentDate: new Date(),
      //      status: 'active_pending_payment', // Or similar
      //    };
      //    const newEnrollment = await payload.create({ collection: 'enrollments', data: enrollmentData });
      //    console.log('Enrollment created:', newEnrollment);

      // 2. Handle payment processing (Square) - This is the next major step
      // 3. Create Payment record(s) in Payload
      // 4. Send confirmation emails

      return NextResponse.json({ 
        message: 'Enrollment data finalized. Ready for payment processing.', 
        clientId: updatedClient.id 
      }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid submission phase' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error processing enrollment in Payload:', error);
    // Basic check for Payload APIError structure
    if (typeof error === 'object' && error !== null && 'name' in error && error.name === 'APIError' && 'data' in error && typeof error.data === 'object' && error.data !== null && 'errors' in error.data) {
      const payloadError = error as { name: string; data: { errors: unknown[] }; status?: number };
      return NextResponse.json({ error: 'Payload API Error during phased submission', details: payloadError.data.errors }, { status: payloadError.status || 500 });
    }
    const message = error instanceof Error ? error.message : 'Internal Server Error during phased Payload operation';
    return NextResponse.json({ error: message }, { status: 500 });
  }
} 