import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { EnrollmentFormData } from '@/lib/form-types'
import { enrollmentFormSchema } from '@/lib/form-types'; // For backend Zod validation
import { ZodError } from 'zod'; // Import ZodError
import type { Client } from '@/payload-types'
import jwt from 'jsonwebtoken'

// TODO: Move to environment variables
const ENROLLMENT_JWT_SECRET = process.env.ENROLLMENT_JWT_SECRET || 'your-fallback-enrollment-secret-key-for-dev'
const ENROLLMENT_JWT_EXPIRES_IN = '1h' // Token valid for 1 hour

// Define a type for the data used to update/create clients, including the new status field
type ClientUpdateData = Partial<Client> & { enrollmentProcessStatus?: string }

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
        return NextResponse.json({ error: 'Client record not found for token.'}, { status: 404 })
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
      
      // Destructure county fields here
      const { county, countyOther, referralSource, referralSourceOther, selectedProgram, whyReferred } = personalInfo

      // --- County Lookup Logic MOVED here ---
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
                  console.warn(`County name "${county}" provided but not found in the database. Saving null for relationship.`)
              }
          } catch (lookupError) {
              console.error(`Error looking up county "${county}":`, lookupError)
          }
      }
      // --- End County Lookup ---

      const updateData: ClientUpdateData = {
        referralSource: referralSource as Client['referralSource'], 
        referralSourceOther: referralSourceOther || undefined,
        selectedProgram,
        whyReferred: whyReferred || undefined, 
        // Add county fields to update data
        // @ts-expect-error - Bypassing incorrect generated type for county relationship ID
        county: countyIdToSave,
        countyOther: countyOther || undefined,
        // Update status
        enrollmentProcessStatus: 'program_info_collected',
      }
      await payload.update({ collection: 'clients', id: targetClient.id, data: updateData })
      return NextResponse.json({ message: 'Program info saved.', phase: submissionPhase }, { status: 200 })

    } else if (submissionPhase === 'scheduling') {
      const { scheduling } = rawRequestBody
      if (!scheduling || !scheduling.selectedClassSlotId) return NextResponse.json({ error: 'Scheduling info is required.' }, { status: 400 })
      const updateData: ClientUpdateData = {
        selectedClassSlotId: scheduling.selectedClassSlotId, enrollmentProcessStatus: 'schedule_selected',
      }
      await payload.update({ collection: 'clients', id: targetClient.id, data: updateData })
      return NextResponse.json({ message: 'Scheduling info saved.', phase: submissionPhase }, { status: 200 })

    } else if (submissionPhase === 'consent') {
      const { documents } = rawRequestBody
      if (!documents || typeof documents.agreedToTerms !== 'boolean') return NextResponse.json({ error: 'Consent information is required.' }, { status: 400 })
      const updateData: ClientUpdateData = {
        agreedToTerms: documents.agreedToTerms, enrollmentProcessStatus: 'consent_agreed',
      }
      await payload.update({ collection: 'clients', id: targetClient.id, data: updateData })
      return NextResponse.json({ message: 'Consent info saved.', phase: submissionPhase }, { status: 200 })

    } else if (submissionPhase === 'final') {
      try {
        enrollmentFormSchema.parse(rawRequestBody) 
      } catch (error) {
        if (error instanceof ZodError) return NextResponse.json({ error: 'Final validation failed', details: error.errors }, { status: 400 })
        return NextResponse.json({ error: 'An unexpected final validation error occurred' }, { status: 400 })
      }
      const { payment, personalInfo, scheduling, documents } = rawRequestBody as EnrollmentFormData
      
      // --- County Lookup Logic (already present, sourced from personalInfo) ---
      let finalCountyId: string | null = null
      if (personalInfo.county && typeof personalInfo.county === 'string' && !personalInfo.countyOther) {
          try {
              const countyQuery = await payload.find({
                  collection: 'counties',
                  where: { name: { equals: personalInfo.county } },
                  limit: 1, depth: 0,
              })
              if (countyQuery.docs.length > 0) finalCountyId = countyQuery.docs[0].id
          } catch (lookupError) { console.error('Error looking up county during final save:', lookupError) }
      }
      // --- End County Lookup ---

      // Ensure finalClientData includes all fields, including county sourced from personalInfo
      const finalClientData: ClientUpdateData = {
        firstName: personalInfo.firstName, lastName: personalInfo.lastName, email: personalInfo.email,
        phone: personalInfo.phone || undefined, city: personalInfo.city, state: personalInfo.state, zipcode: personalInfo.zipcode,
        sex: personalInfo.sex as Client['sex'], 
        // @ts-expect-error - Bypassing incorrect generated type for county relationship ID
        county: finalCountyId, 
        countyOther: personalInfo.countyOther || undefined,
        referralSource: personalInfo.referralSource as Client['referralSource'], referralSourceOther: personalInfo.referralSourceOther || undefined,
        whyReferred: personalInfo.whyReferred || undefined, selectedProgram: personalInfo.selectedProgram,
        consentToContact: personalInfo.consentToContact ?? undefined, selectedClassSlotId: scheduling.selectedClassSlotId,
        agreedToTerms: documents.agreedToTerms, paymentOption: payment.paymentOption as Client['paymentOption'],
        agreeToRecurring: payment.agreeToRecurring ?? false, enrollmentProcessStatus: 'final_data_collected_pending_payment',
      }
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