import { NextResponse } from 'next/server';
import type { Payload } from 'payload';
import { ZodError } from 'zod';
import { enrollmentFormSchema, type EnrollmentFormData } from '@/lib/form-types'; // Assuming this is your Zod schema
import { findCountyByName, findReferralSource, findProgramByProgramId } from '../helpers';
import type { Client, ClientUpdateData, EnrollmentRequestBody } from '../types';

export async function handleFinalDataPhase(payload: Payload, rawRequestBody: EnrollmentRequestBody, client: Client) {
    let validatedData: EnrollmentFormData;
    try {
        // Pass the whole rawRequestBody for Zod validation, as EnrollmentFormData likely defines the full structure
        validatedData = enrollmentFormSchema.parse(rawRequestBody);
    } catch (error) {
        if (error instanceof ZodError) return NextResponse.json({ error: 'Final validation failed', details: error.errors }, { status: 400 });
        payload.logger.error(`Unexpected final validation error: ${error}`);
        return NextResponse.json({ error: 'An unexpected final validation error occurred' }, { status: 400 });
    }

    const { personalInfo, scheduling, documents, payment } = validatedData;

    const finalCountyId = personalInfo.county && !personalInfo.countyOther
        ? await findCountyByName(payload, personalInfo.county) : null;
    const finalReferralSourceId = personalInfo.referralSource && !personalInfo.referralSourceOther && finalCountyId
        ? await findReferralSource(payload, personalInfo.referralSource, finalCountyId) : null;
    const finalProgramDoc = personalInfo.selectedProgram
        ? await findProgramByProgramId(payload, personalInfo.selectedProgram) : null;

    const finalClientData: ClientUpdateData = {
        // Personal Info
        firstName: personalInfo.firstName, lastName: personalInfo.lastName, email: personalInfo.email,
        phone: personalInfo.phone || undefined, city: personalInfo.city, state: personalInfo.state, zipcode: personalInfo.zipcode,
        sex: personalInfo.sex as Client['sex'],
        county: finalCountyId, countyOther: personalInfo.countyOther || undefined,
        referralSource: finalReferralSourceId, referralSourceOther: personalInfo.referralSourceOther || undefined,
        whyReferred: personalInfo.whyReferred || undefined,
        selectedProgram: finalProgramDoc ? finalProgramDoc.id : null,
        consentToContact: personalInfo.consentToContact ?? undefined,
        // Scheduling
        class: scheduling.selectedClassId,
        // Documents
        agreedToTerms: documents.agreedToTerms, signature: documents.signature,
        // Payment Meta
        paymentOption: payment.paymentOption as Client['paymentOption'],
        agreeToRecurring: payment.agreeToRecurring ?? false,
        // Status
        enrollmentProcessStatus: 'final_data_collected_pending_payment',
    };
    await payload.update({ collection: 'clients', id: client.id, data: finalClientData });
    return NextResponse.json({ message: 'Enrollment data finalized. Ready for payment processing.' }, { status: 200 });
}