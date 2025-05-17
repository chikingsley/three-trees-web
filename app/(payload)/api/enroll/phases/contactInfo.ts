import { NextResponse } from 'next/server';
import type { Payload } from 'payload';
import jwt from 'jsonwebtoken';
import { ENROLLMENT_JWT_SECRET, ENROLLMENT_JWT_EXPIRES_IN } from '../config';
import type { Client } from '@/payload-types';

// Define the request body structure specific to this phase
interface ContactInfoRequestBody {
    submissionPhase: 'contactInfo';
    personalInfo: {
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
        city: string;
        state: string;
        zipcode: string;
        sex: Client['sex'];
        consentToContact?: boolean;
    };
}

export async function handleContactInfoPhase(payload: Payload, rawRequestBody: ContactInfoRequestBody) {
    const { personalInfo } = rawRequestBody;
    if (!personalInfo || !personalInfo.email) {
        return NextResponse.json({ error: 'Email (within personalInfo) is required for contactInfo phase.' }, { status: 400 });
    }

    const { firstName, lastName, email, phone, city, state, zipcode, sex, consentToContact } = personalInfo;

    // Define the data for update/create directly with the correct enrollmentProcessStatus type
    const dataForUpsert = {
        email, 
        firstName, 
        lastName, 
        phone: phone || undefined, 
        city, 
        state, 
        zipcode,
        sex,
        consentToContact: consentToContact ?? undefined,
        enrollmentProcessStatus: 'contact_info_collected' as Client['enrollmentProcessStatus'],
    };

    const existingClientQuery = await payload.find({ collection: 'clients', where: { email: { equals: email } }, limit: 1 });
    let finalClientId: string;
    let isUpdate = false;

    if (existingClientQuery.docs.length > 0) {
        const clientToUpdate = existingClientQuery.docs[0];
        const updatedClient = await payload.update({ 
            collection: 'clients', 
            id: clientToUpdate.id, 
            data: dataForUpsert 
        });
        finalClientId = updatedClient.id;
        isUpdate = true;
    } else {
        const createdClient = await payload.create({ 
            collection: 'clients', 
            data: dataForUpsert 
        });
        finalClientId = createdClient.id;
    }

    const enrollmentToken = jwt.sign({ clientId: finalClientId }, ENROLLMENT_JWT_SECRET, { expiresIn: ENROLLMENT_JWT_EXPIRES_IN });
    return NextResponse.json({
        message: isUpdate ? 'Contact info updated.' : 'Contact info saved.',
        enrollmentToken: enrollmentToken
    }, { status: isUpdate ? 200 : 201 });
}