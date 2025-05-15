import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { EnrollmentFormData } from '@/lib/form-types'
import { enrollmentFormSchema } from '@/lib/form-types'; // For backend Zod validation
import { ZodError } from 'zod'; // Import ZodError
import type { Client, Program } from '@/payload-types'
import jwt from 'jsonwebtoken'

// TODO: Move to environment variables
const ENROLLMENT_JWT_SECRET = process.env.ENROLLMENT_JWT_SECRET || 'your-fallback-enrollment-secret-key-for-dev'
const ENROLLMENT_JWT_EXPIRES_IN = '1h' // Token valid for 1 hour

// Define a type for the data used to update/create clients
// Removed selectedClassSlotId, added class relationship
type ClientUpdateData = Omit<Partial<Client>, 'selectedClassSlot'> & {
  class?: string | null; // ID of the Classes document
  signature?: string; // Added for typed signature
  enrollmentProcessStatus?: string;
};

export async function POST(request: NextRequest) {
  const resolvedConfig = await configPromise
  const payload = await getPayload({ config: resolvedConfig })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawRequestBody: any // Using any for now, will access specific parts

  try {
    rawRequestBody = await request.json()
  } catch (error) {
    console.error('Error parsing request body:', error)
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const submissionPhase = rawRequestBody.submissionPhase as string

  try {
    let clientRecordFromToken: Client | null = null // Renamed for clarity
    let clientIdFromToken: string | null = null

    if (submissionPhase !== 'contactInfo') { // JWT logic only applies after contactInfo
      const authHeader = request.headers.get('authorization')
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7, authHeader.length)
        try {
          const decoded = jwt.verify(token, ENROLLMENT_JWT_SECRET) as { clientId: string }
          clientIdFromToken = decoded.clientId
          if (clientIdFromToken) {
            clientRecordFromToken = await payload.findByID({ collection: 'clients', id: clientIdFromToken })
          }
        } catch (err) {
          console.warn('Invalid or expired enrollment JWT:', err)
          return NextResponse.json({ error: 'Unauthorized: Enrollment token invalid or expired.' }, { status: 401 })
        }
      } else {
        // No auth header for a phase that requires it
        return NextResponse.json({ error: 'Unauthorized: Enrollment token missing.' }, { status: 401 })
      }

      // If token was valid but client not found (e.g., deleted mid-process)
      if (!clientRecordFromToken && clientIdFromToken) {
        return NextResponse.json({ error: 'Client record not found for token.' }, { status: 404 })
      }
      // If no client could be identified for a phase requiring it
      if (!clientRecordFromToken) {
        return NextResponse.json({ error: 'Unauthorized: Client could not be identified for this step.' }, { status: 401 })
      }
    }

    if (submissionPhase === 'contactInfo') {
      const { personalInfo } = rawRequestBody
      if (!personalInfo) return NextResponse.json({ error: 'PersonalInfo is required for contactInfo phase.' }, { status: 400 })

      // County/countyOther removed from here
      const { firstName, lastName, email, phone, city, state, zipcode, sex, consentToContact } = personalInfo

      if (!email) return NextResponse.json({ error: 'Email is required for contactInfo phase.' }, { status: 400 })

      // --- County Lookup Logic REMOVED from here ---

      const existingClientQuery = await payload.find({ collection: 'clients', where: { email: { equals: email } }, limit: 1 })

      // Prepare data without county fields
      const dataForUpsert: ClientUpdateData = {
        email, firstName, lastName, phone: phone || undefined, city, state, zipcode,
        sex: sex as Client['sex'],
        // county and countyOther removed
        consentToContact: consentToContact ?? undefined,
        enrollmentProcessStatus: 'contact_info_collected',
      }

      let finalClientId: string
      if (existingClientQuery.docs.length > 0) {
        const clientToUpdate = existingClientQuery.docs[0]
        // Ensure we pass the correct type for update
        const updatedClient = await payload.update({
          collection: 'clients',
          id: clientToUpdate.id,
          data: dataForUpsert
        })
        finalClientId = updatedClient.id
      } else {
        // Ensure we pass the correct type for create
        const createdClient = await payload.create({
          collection: 'clients',
          data: dataForUpsert as Omit<Client, 'id' | 'createdAt' | 'updatedAt'>
        })
        finalClientId = createdClient.id
      }
      const enrollmentToken = jwt.sign({ clientId: finalClientId }, ENROLLMENT_JWT_SECRET, { expiresIn: ENROLLMENT_JWT_EXPIRES_IN })
      return NextResponse.json({
        message: existingClientQuery.docs.length > 0 ? 'Contact info updated.' : 'Contact info saved.',
        enrollmentToken: enrollmentToken
      }, { status: existingClientQuery.docs.length > 0 ? 200 : 201 })
    }

    // At this point, for phases other than contactInfo, clientRecordFromToken MUST be valid and populated.
    const targetClient = clientRecordFromToken!

    if (submissionPhase === 'programInfo') {
      const { personalInfo } = rawRequestBody // Assuming county info is nested under personalInfo here too
      if (!personalInfo) return NextResponse.json({ error: 'PersonalInfo is required for programInfo phase.' }, { status: 400 })

      const { county, countyOther, referralSource, referralSourceOther, selectedProgram, whyReferred } = personalInfo

      let countyIdToSave: string | null = null
      if (county && typeof county === 'string' && !countyOther) {
        try {
          const countyQuery = await payload.find({
            collection: 'counties',
            where: { name: { equals: county } },
            limit: 1, depth: 0,
          })
          if (countyQuery.docs.length > 0) {
            countyIdToSave = countyQuery.docs[0].id
          } else {
            payload.logger.warn(`County name "${county}" provided but not found. Nulling relationship.`)
          }
        } catch (lookupError) {
          payload.logger.error(`Error looking up county "${county}": ${lookupError}`)
        }
      }

      // --- New Referral Source Lookup Logic ---
      let referralSourceIdToSave: string | null = null
      if (referralSource && typeof referralSource === 'string' && !referralSourceOther && countyIdToSave) {
        // referralSource from FE is the name of the ReferralSourceType, e.g., "Department of Social Services (DSS)"
        try {
          const rsTypeQuery = await payload.find({
            collection: 'referral-source-types',
            where: { name: { equals: referralSource } }, // Find the type by its name
            limit: 1,
            depth: 0,
          });

          if (rsTypeQuery.docs.length > 0) {
            const rsTypeId = rsTypeQuery.docs[0].id;
            // Now find the actual ReferralSource linking this type and the county
            const actualRsQuery = await payload.find({
              collection: 'referral-sources',
              where: {
                county: { equals: countyIdToSave },
                sourceType: { equals: rsTypeId },
              },
              limit: 1,
              depth: 0,
            });
            if (actualRsQuery.docs.length > 0) {
              referralSourceIdToSave = actualRsQuery.docs[0].id;
            } else {
              payload.logger.warn(`ReferralSource not found for type "${referralSource}" in county ID "${countyIdToSave}". Nulling relationship.`);
            }
          } else {
            payload.logger.warn(`ReferralSourceType name "${referralSource}" not found. Nulling relationship.`);
          }
        } catch (lookupError) {
          payload.logger.error(`Error looking up referral source for type "${referralSource}" and county ID "${countyIdToSave}": ${lookupError}`);
        }
      } else if (referralSource && typeof referralSource === 'string' && !referralSourceOther && !countyIdToSave && !countyOther) {
        // Case: Referral Source Type name given, but no county info to link it.
        // This might occur if county is optional OR if countyOther is used.
        // For now, if countyIdToSave is null (and countyOther is not used), we can't form the specific link.
        payload.logger.warn(`Cannot link referral source type "${referralSource}" without a resolved county ID. referralSourceOther: '${referralSourceOther}', countyOther: '${countyOther}'`);
      }
      // --- End New Referral Source Lookup Logic ---

      // --- Program ID Lookup ---
      let programDocumentIdToSave: string | null = null;
      if (selectedProgram && typeof selectedProgram === 'string') {
        try {
          const programQuery = await payload.find({
            collection: 'programs',
            where: { programId: { equals: selectedProgram } }, // programId is the field like "am", "dv_male"
            limit: 1,
            depth: 0,
          });
          if (programQuery.docs.length > 0) {
            programDocumentIdToSave = programQuery.docs[0].id; // This is the UUID
          } else {
            payload.logger.warn(`Program with programId "${selectedProgram}" not found. Nulling relationship.`);
          }
        } catch (lookupError) {
          payload.logger.error(`Error looking up program with programId "${selectedProgram}": ${lookupError}`);
        }
      }
      // --- End Program ID Lookup ---

      const updateData: ClientUpdateData = {
        referralSource: referralSourceIdToSave, 
        referralSourceOther: referralSourceOther || undefined,
        selectedProgram: programDocumentIdToSave, // Use the resolved UUID
        whyReferred: whyReferred || undefined, 
        county: countyIdToSave,
        countyOther: countyOther || undefined,
        enrollmentProcessStatus: 'program_info_collected',
      }
      await payload.update({ collection: 'clients', id: targetClient.id, data: updateData })
      return NextResponse.json({ message: 'Program info saved.', phase: submissionPhase }, { status: 200 })

    } else if (submissionPhase === 'scheduling') {
      const { scheduling } = rawRequestBody
      // Expect selectedClassId now instead of selectedClassSlotId
      if (!scheduling || !scheduling.selectedClassId) return NextResponse.json({ error: 'Scheduling info with selectedClassId is required.' }, { status: 400 })

      const selectedClassId = scheduling.selectedClassId;

      try {
        // --- Fetch the selected Class document and related Program --- 
        const classDoc = await payload.findByID({
          collection: 'classes',
          id: selectedClassId,
          depth: 1, // Depth 1 to populate the 'program' field
        });

        if (!classDoc) {
          return NextResponse.json({ error: 'Selected class not found.' }, { status: 404 });
        }
        if (!classDoc.isActive) {
          return NextResponse.json({ error: 'Selected class is not active.' }, { status: 400 });
        }

        // Ensure the program field is populated and is an object
        if (typeof classDoc.program !== 'object' || classDoc.program === null || !('id' in classDoc.program)) {
          return NextResponse.json({ error: 'Could not retrieve program details for the selected class.' }, { status: 500 });
        }
        const programForClass = classDoc.program as Program; // Type assertion

        // TEMPORARY LOGGING FOR MISMATCH DIAGNOSIS - STARTS
        payload.logger.info(`[PROGRAM MISMATCH CHECK] targetClient.id: ${targetClient.id}`);
        payload.logger.info(`[PROGRAM MISMATCH CHECK] targetClient.selectedProgram (ID): ${targetClient.selectedProgram}`);
        payload.logger.info(`[PROGRAM MISMATCH CHECK] classDoc.id (Selected Class ID): ${classDoc.id}`);
        payload.logger.info(`[PROGRAM MISMATCH CHECK] programForClass.id (Program ID of Selected Class): ${programForClass.id}`);
        payload.logger.info(`[PROGRAM MISMATCH CHECK] programForClass.name (Program Name of Selected Class): ${programForClass.name}`); // Log name for easier identification
        // TEMPORARY LOGGING FOR MISMATCH DIAGNOSIS - ENDS

        // --- Consistency Check: Class Program vs Client\'s Selected Program ---
        let clientProgramId: string | undefined;
        if (typeof targetClient.selectedProgram === 'string') {
          clientProgramId = targetClient.selectedProgram;
        } else if (typeof targetClient.selectedProgram === 'object' && targetClient.selectedProgram !== null) {
          clientProgramId = targetClient.selectedProgram.id;
        }

        if (clientProgramId !== programForClass.id) {
          return NextResponse.json({
            error: 'Mismatch between selected program and the program of the chosen class time.'
          }, { status: 400 });
        }

        // --- Check Availability --- 
        // TEMPORARY LOGGING STARTS
        payload.logger.info(`[SCHEDULING CHECK] Class ID: ${selectedClassId}`);
        payload.logger.info(`[SCHEDULING CHECK] classDoc.numberOfParallelClasses: ${classDoc.numberOfParallelClasses}`);
        payload.logger.info(`[SCHEDULING CHECK] programForClass (raw from classDoc.program): ${JSON.stringify(programForClass)}`);
        payload.logger.info(`[SCHEDULING CHECK] programForClass.spotsPerClass (direct access): ${programForClass.spotsPerClass}`);
        // TEMPORARY LOGGING ENDS

        const spotsPerClass = programForClass.spotsPerClass ?? 0;
        const spotsTotal = (classDoc.numberOfParallelClasses ?? 0) * spotsPerClass;
        const enrolledClientIds = Array.isArray(classDoc.clients) ? classDoc.clients.map(c => typeof c === 'string' ? c : c.id) : []; // Ensure we get IDs
        const enrolledClientCount = enrolledClientIds.length;
        const spotsAvailable = Math.max(0, spotsTotal - enrolledClientCount);

        // TEMPORARY LOGGING STARTS
        payload.logger.info(`[SCHEDULING CHECK] Calculated spotsPerClass: ${spotsPerClass}`);
        payload.logger.info(`[SCHEDULING CHECK] Calculated spotsTotal: ${spotsTotal}`);
        payload.logger.info(`[SCHEDULING CHECK] Enrolled client count: ${enrolledClientCount}`);
        payload.logger.info(`[SCHEDULING CHECK] Calculated spotsAvailable: ${spotsAvailable}`);
        // TEMPORARY LOGGING ENDS

        if (spotsAvailable <= 0) {
          return NextResponse.json({ error: 'Selected class time is full.' }, { status: 409 }); // 409 Conflict
        }

        // --- Update Client and Class --- 
        // 1. Update Client: Set the 'class' relationship
        const clientUpdateData: ClientUpdateData = {
          class: selectedClassId,
          enrollmentProcessStatus: 'schedule_selected',
        }
        await payload.update({ collection: 'clients', id: targetClient.id, data: clientUpdateData });

        // 2. Update Class: Add client ID to the 'clients' array
        // Need to fetch current clients first to avoid overwriting
        const currentClientIds = enrolledClientIds;
        if (!currentClientIds.includes(targetClient.id)) { // Prevent duplicate additions
          const updatedClientIds = [...currentClientIds, targetClient.id];
          await payload.update({
            collection: 'classes',
            id: selectedClassId,
            data: { clients: updatedClientIds }
          });
        }

        return NextResponse.json({ message: 'Scheduling info saved and client assigned to class.', phase: submissionPhase }, { status: 200 });

      } catch (error) {
        payload.logger.error(`Error during scheduling phase for class ${selectedClassId}: ${error}`);
        const message = error instanceof Error ? error.message : 'Internal Server Error during scheduling phase.';
        return NextResponse.json({ error: message }, { status: 500 });
      }

    } else if (submissionPhase === 'consent') {
      const { documents } = rawRequestBody
      // Expect agreedToTerms and signature now
      if (!documents || typeof documents.agreedToTerms !== 'boolean' || typeof documents.signature !== 'string') { 
        return NextResponse.json({ error: 'Consent information (agreement and signature) is required.' }, { status: 400 });
      }
      const updateData: ClientUpdateData = {
        agreedToTerms: documents.agreedToTerms,
        signature: documents.signature, // Save the signature
        enrollmentProcessStatus: 'consent_agreed', // Update status
      }
      await payload.update({ collection: 'clients', id: targetClient.id, data: updateData })
      return NextResponse.json({ message: 'Consent info saved.', phase: submissionPhase }, { status: 200 })

    } else if (submissionPhase === 'final') {
      // Assuming enrollmentFormSchema in form-types.ts is updated to expect selectedClassId
      let validatedData: EnrollmentFormData;
      try {
        validatedData = enrollmentFormSchema.parse(rawRequestBody)
      } catch (error) {
        if (error instanceof ZodError) return NextResponse.json({ error: 'Final validation failed', details: error.errors }, { status: 400 })
        payload.logger.error(`Unexpected final validation error: ${error}`);
        return NextResponse.json({ error: 'An unexpected final validation error occurred' }, { status: 400 })
      }
      const { payment, personalInfo, scheduling, documents } = validatedData;

      // --- Final County Lookup --- 
      let finalCountyId: string | null = null
      if (personalInfo.county && typeof personalInfo.county === 'string' && !personalInfo.countyOther) {
        try {
          const countyQuery = await payload.find({
            collection: 'counties',
            where: { name: { equals: personalInfo.county } },
            limit: 1, depth: 0,
          })
          if (countyQuery.docs.length > 0) finalCountyId = countyQuery.docs[0].id
        } catch (lookupError) { payload.logger.error('Error looking up county during final save:', lookupError) }
      }

      // --- Final Referral Source Lookup --- 
      let finalReferralSourceId: string | null = null
      if (personalInfo.referralSource && typeof personalInfo.referralSource === 'string' && !personalInfo.referralSourceOther && finalCountyId) {
        try {
          const rsTypeQuery = await payload.find({
            collection: 'referral-source-types',
            where: { name: { equals: personalInfo.referralSource } },
            limit: 1, depth: 0,
          });
          if (rsTypeQuery.docs.length > 0) {
            const rsTypeId = rsTypeQuery.docs[0].id;
            const actualRsQuery = await payload.find({
              collection: 'referral-sources',
              where: { county: { equals: finalCountyId }, sourceType: { equals: rsTypeId } },
              limit: 1, depth: 0,
            });
            if (actualRsQuery.docs.length > 0) {
              finalReferralSourceId = actualRsQuery.docs[0].id;
            }
          }
        } catch (lookupError) {
          payload.logger.error(`Error looking up referral source during final save: ${lookupError}`);
        }
      }
      // --- End Final Referral Source Lookup ---

      // --- Final Program ID Lookup ---
      let finalProgramDocumentId: string | null = null;
      if (personalInfo.selectedProgram && typeof personalInfo.selectedProgram === 'string') {
        try {
          const programQuery = await payload.find({
            collection: 'programs',
            where: { programId: { equals: personalInfo.selectedProgram } },
            limit: 1,
            depth: 0,
          });
          if (programQuery.docs.length > 0) {
            finalProgramDocumentId = programQuery.docs[0].id;
          } else {
            payload.logger.warn(`Program with programId "${personalInfo.selectedProgram}" not found during final save. Nulling relationship.`);
          }
        } catch (lookupError) {
          payload.logger.error(`Error looking up program with programId "${personalInfo.selectedProgram}" during final save: ${lookupError}`);
        }
      }
      // --- End Final Program ID Lookup ---

      // Ensure finalClientData includes all fields, using resolved IDs and 'class' field
      const finalClientData: ClientUpdateData = {
        firstName: personalInfo.firstName, lastName: personalInfo.lastName, email: personalInfo.email,
        phone: personalInfo.phone || undefined, city: personalInfo.city, state: personalInfo.state, zipcode: personalInfo.zipcode,
        sex: personalInfo.sex as Client['sex'],
        county: finalCountyId,
        countyOther: personalInfo.countyOther || undefined,
        referralSource: finalReferralSourceId, 
        referralSourceOther: personalInfo.referralSourceOther || undefined,
        whyReferred: personalInfo.whyReferred || undefined, 
        selectedProgram: finalProgramDocumentId, 
        consentToContact: personalInfo.consentToContact ?? undefined, 
        class: scheduling.selectedClassId, 
        agreedToTerms: documents.agreedToTerms,
        signature: documents.signature,
        paymentOption: payment.paymentOption as Client['paymentOption'],
        agreeToRecurring: payment.agreeToRecurring ?? false,
        enrollmentProcessStatus: 'final_data_collected_pending_payment',
      }
      // TODO: Final check - Ensure the Client isn't already assigned to the class? 
      // The scheduling phase should handle this, but a final check might be prudent depending on flow.
      await payload.update({ collection: 'clients', id: targetClient.id, data: finalClientData })
      return NextResponse.json({ message: 'Enrollment data finalized. Ready for payment processing.' }, { status: 200 })
    } else {
      return NextResponse.json({ error: 'Invalid submission phase' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error processing enrollment in Payload:', error)
    if (typeof error === 'object' && error !== null && 'name' in error && error.name === 'APIError' && 'data' in error && typeof error.data === 'object' && error.data !== null && 'errors' in error.data) {
      const payloadError = error as { name: string; data: { errors: unknown[] }; status?: number }
      return NextResponse.json({ error: 'Payload API Error during phased submission', details: payloadError.data.errors }, { status: payloadError.status || 500 })
    }
    const message = error instanceof Error ? error.message : 'Internal Server Error during phased Payload operation'
    return NextResponse.json({ error: message }, { status: 500 })
  }
} 