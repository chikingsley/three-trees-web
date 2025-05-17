import { NextResponse } from 'next/server';
import type { Payload } from 'payload';
import type { Client, ClientUpdateData, EnrollmentRequestBody } from '../types';

export async function handleConsentPhase(payload: Payload, rawRequestBody: EnrollmentRequestBody, client: Client) {
    const { documents } = rawRequestBody;
    if (!documents || typeof documents.agreedToTerms !== 'boolean' || typeof documents.signature !== 'string') {
        return NextResponse.json({ error: 'Consent information (agreement and signature) is required.' }, { status: 400 });
    }
    const updateData: ClientUpdateData = {
        agreedToTerms: documents.agreedToTerms,
        signature: documents.signature,
        enrollmentProcessStatus: 'consent_agreed',
    };
    await payload.update({ collection: 'clients', id: client.id, data: updateData });
    return NextResponse.json({ message: 'Consent info saved.' }, { status: 200 });
}