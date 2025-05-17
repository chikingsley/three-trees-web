import { NextResponse } from 'next/server';
import type { Payload } from 'payload';
import jwt from 'jsonwebtoken';
import { ENROLLMENT_JWT_SECRET, ENROLLMENT_JWT_EXPIRES_IN } from '../config';
import type { ClientUpdateData, Client, EnrollmentRequestBody } from '../types';

export async function handleContactInfoPhase(payload: Payload, rawRequestBody: EnrollmentRequestBody) {
    const { personalInfo } = rawRequestBody;
    if (!personalInfo || !personalInfo.email) {
        return NextResponse.json({ error: 'Email (within personalInfo) is required for contactInfo phase.' }, { status: 400 });
    }

    const { firstName, lastName, email, phone, city, state, zipcode, sex, consentToContact } = personalInfo;

    const dataForUpsert: ClientUpdateData = {
        email, firstName, lastName, phone: phone || undefined, city, state, zipcode,
        sex: sex as Client['sex'], // Cast if 'sex' from FE matches Payload type
        consentToContact: consentToContact ?? undefined,
        enrollmentProcessStatus: 'contact_info_collected',
    };

    const existingClientQuery = await payload.find({ collection: 'clients', where: { email: { equals: email } }, limit: 1 });
    let finalClientId: string;
    let isUpdate = false;

    if (existingClientQuery.docs.length > 0) {
        const clientToUpdate = existingClientQuery.docs[0];
        const updatedClient = await payload.update({ collection: 'clients', id: clientToUpdate.id, data: dataForUpsert });
        finalClientId = updatedClient.id;
        isUpdate = true;
    } else {
        // Ensure type for create matches Payload's expectation (all required fields are present)
        const createData = dataForUpsert as Omit<Client, 'id' | 'createdAt' | 'updatedAt' | 'selectedProgram' | 'class' | 'county' | 'referralSource'>;
        const createdClient = await payload.create({ collection: 'clients', data: createData });
        finalClientId = createdClient.id;
    }

    const enrollmentToken = jwt.sign({ clientId: finalClientId }, ENROLLMENT_JWT_SECRET, { expiresIn: ENROLLMENT_JWT_EXPIRES_IN });
    return NextResponse.json({
        message: isUpdate ? 'Contact info updated.' : 'Contact info saved.',
        enrollmentToken: enrollmentToken
    }, { status: isUpdate ? 200 : 201 });
}