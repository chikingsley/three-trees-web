import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Client } from '@/payload-types'
import {
  handleContactInfoPhase,
  handleProgramInfoPhase,
  handleSchedulingPhase,
  handleConsentPhase,
  handleFinalDataPhase,
  handleFinalPaymentPhase
} from './phases'
import { authenticateAndGetClient } from './helpers'

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
    // Handle contactInfo phase separately as it doesn't require authentication
    if (submissionPhase === 'contactInfo') {
      return handleContactInfoPhase(payload, rawRequestBody);
    }

    // All other phases require authentication
    let clientRecord: Client;
    try {
      clientRecord = await authenticateAndGetClient(request, payload);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return NextResponse.json({ error: message }, { status: 401 });
    }

    // Process the different submission phases
    if (submissionPhase === 'programInfo') {
      return handleProgramInfoPhase(payload, rawRequestBody, clientRecord);
    }

    if (submissionPhase === 'scheduling') {
      return handleSchedulingPhase(payload, rawRequestBody, clientRecord);
    }

    if (submissionPhase === 'consent') {
      return handleConsentPhase(payload, rawRequestBody, clientRecord);
    }

    if (submissionPhase === 'final') {
      return handleFinalDataPhase(payload, rawRequestBody, clientRecord);
    } 
    
    if (submissionPhase === 'finalPayment') {
      return handleFinalPaymentPhase(payload, rawRequestBody, clientRecord);
    }

    // If we get here, the submission phase is not recognized
    return NextResponse.json({ error: 'Invalid submission phase' }, { status: 400 })
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