import { NextResponse } from 'next/server';
import type { Payload } from 'payload';
import { findCountyByName, findReferralSource, findProgramByProgramId } from '../helpers';
import type { Client, ClientUpdateData, EnrollmentRequestBody } from '../types';

export async function handleProgramInfoPhase(payload: Payload, rawRequestBody: EnrollmentRequestBody, client: Client) {
    const { personalInfo } = rawRequestBody;
    if (!personalInfo) {
        return NextResponse.json({ error: 'PersonalInfo is required for programInfo phase.' }, { status: 400 });
    }

    const { county, countyOther, referralSource, referralSourceOther, selectedProgram, whyReferred } = personalInfo;

    const countyIdToSave = county && !countyOther ? await findCountyByName(payload, county) : null;
    const referralSourceIdToSave = referralSource && !referralSourceOther && countyIdToSave
        ? await findReferralSource(payload, referralSource, countyIdToSave)
        : null;
    const programDoc = selectedProgram ? await findProgramByProgramId(payload, selectedProgram) : null;

    const updateData: ClientUpdateData = {
        referralSource: referralSourceIdToSave,
        referralSourceOther: referralSourceOther || undefined,
        selectedProgram: programDoc ? programDoc.id : null,
        whyReferred: whyReferred || undefined,
        county: countyIdToSave,
        countyOther: countyOther || undefined,
        enrollmentProcessStatus: 'program_info_collected',
    };
    await payload.update({ collection: 'clients', id: client.id, data: updateData });
    return NextResponse.json({ message: 'Program info saved.' }, { status: 200 });
}