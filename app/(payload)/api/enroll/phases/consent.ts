import { NextResponse } from 'next/server';
import type { Payload } from 'payload';
import type { Client } from '@/payload-types';

// Define the request body structure specific to this phase
interface ConsentRequestBody {
    submissionPhase: 'consent';
    documents: {
        agreedToTerms: boolean;
        signature: string;
    };
}

export async function handleConsentPhase(payload: Payload, rawRequestBody: ConsentRequestBody, client: Client) {
    const { documents } = rawRequestBody;
    if (!documents || typeof documents.agreedToTerms !== 'boolean' || typeof documents.signature !== 'string') {
        return NextResponse.json({ error: 'Consent information (agreement and signature) is required.' }, { status: 400 });
    }
    
    const updateData = {
        agreedToTerms: documents.agreedToTerms,
        signature: documents.signature,
        enrollmentProcessStatus: 'consent_agreed' as Client['enrollmentProcessStatus'],
    };
    
    await payload.update({ 
        collection: 'clients', 
        id: client.id, 
        data: updateData 
    });
    
    return NextResponse.json({ message: 'Consent info saved.' }, { status: 200 });
}