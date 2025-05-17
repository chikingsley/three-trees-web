import jwt from 'jsonwebtoken';
import { ENROLLMENT_JWT_SECRET } from './config';
import type { NextRequest } from 'next/server';
import type { Payload } from 'payload';
import type { Program, Payment as PayloadPayment } from '@/payload-types';
import type { Client } from './types';

export async function findCountyByName(payload: Payload, countyName: string): Promise<string | null> {
    if (!countyName) return null;
    try {
        const countyQuery = await payload.find({
            collection: 'counties',
            where: { name: { equals: countyName } },
            limit: 1, depth: 0,
        });
        if (countyQuery.docs.length > 0) return countyQuery.docs[0].id;
        payload.logger.warn(`County name "${countyName}" provided but not found. Nulling relationship.`);
        return null;
    } catch (error) {
        payload.logger.error(`Error looking up county "${countyName}": ${error}`);
        return null;
    }
}

export async function findReferralSource(payload: Payload, referralSourceTypeName: string, countyId: string | null): Promise<string | null> {
    if (!referralSourceTypeName || !countyId) return null;
    try {
        const rsTypeQuery = await payload.find({
            collection: 'referral-source-types',
            where: { name: { equals: referralSourceTypeName } },
            limit: 1, depth: 0,
        });

        if (rsTypeQuery.docs.length > 0) {
            const rsTypeId = rsTypeQuery.docs[0].id;
            const actualRsQuery = await payload.find({
                collection: 'referral-sources',
                where: { county: { equals: countyId }, sourceType: { equals: rsTypeId } },
                limit: 1, depth: 0,
            });
            if (actualRsQuery.docs.length > 0) return actualRsQuery.docs[0].id;
            payload.logger.warn(`ReferralSource not found for type "${referralSourceTypeName}" in county ID "${countyId}". Nulling relationship.`);
            return null;
        }
        payload.logger.warn(`ReferralSourceType name "${referralSourceTypeName}" not found. Nulling relationship.`);
        return null;
    } catch (error) {
        payload.logger.error(`Error looking up referral source for type "${referralSourceTypeName}" and county ID "${countyId}": ${error}`);
        return null;
    }
}

export async function findProgramByProgramId(payload: Payload, programIdentifier: string): Promise<Program | null> {
    if (!programIdentifier) return null;
    try {
        const programQuery = await payload.find({
            collection: 'programs',
            where: { programId: { equals: programIdentifier } },
            limit: 1, depth: 1, // Depth 1 to get programGroup details
        });
        if (programQuery.docs.length > 0) return programQuery.docs[0] as Program;
        payload.logger.warn(`Program with programId "${programIdentifier}" not found. Nulling relationship.`);
        return null;
    } catch (error) {
        payload.logger.error(`Error looking up program with programId "${programIdentifier}": ${error}`);
        return null;
    }
}

export async function authenticateAndGetClient(request: NextRequest, payload: Payload): Promise<Client> {
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        try {
            const decoded = jwt.verify(token, ENROLLMENT_JWT_SECRET) as { clientId: string };
            if (decoded.clientId) {
                const clientDoc = await payload.findByID({ collection: 'clients', id: decoded.clientId, depth: 1 }); // depth: 1 is crucial
                if (clientDoc) return clientDoc as Client;
                throw new Error('Client record not found for token.');
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            payload.logger.warn(`Invalid or expired enrollment JWT: ${message}`);
            throw new Error(`Unauthorized: Enrollment token invalid or expired. Details: ${message}`);
        }
    }
    throw new Error('Unauthorized: Enrollment token missing.');
}

export async function createPaymentRecord(
    payload: Payload,
    client: Client,
    squarePaymentResult: {
        id?: string; // ID from Square can be undefined if payment failed to create properly
        customerId?: string | null;
        status?: string | null;
        createdAt?: string | null;
        // Add any other properties you might access from squarePaymentResult
    },
    paymentDetails: { amount: number; type: PayloadPayment['type']; notes: string }
): Promise<void> {
    // Critical check: If the Square payment ID is missing, we cannot reliably create our internal record.
    if (!squarePaymentResult.id) {
        payload.logger.error(
            `Critical error in createPaymentRecord for client ${client.id}: ` +
            `Square payment object is missing an ID. This usually indicates a severe payment creation failure on Square's side ` +
            `despite other checks. Payment details from Square: ${JSON.stringify(squarePaymentResult)}, ` +
            `Our payment meta: Amount: ${paymentDetails.amount}, Type: ${paymentDetails.type}. Payload payment record NOT created.`
        );
        return; // Do not proceed if ID is missing
    }

    try {
        const programId = (typeof client.selectedProgram === 'object' && client.selectedProgram !== null)
            ? client.selectedProgram.id
            : client.selectedProgram;

        await payload.create({
            collection: 'payments',
            data: {
                client: client.id,
                program: programId || undefined,
                squarePaymentId: squarePaymentResult.id, // Now TypeScript knows .id is a string due to the check above
                squareCustomerId: client.squareCustomerId || squarePaymentResult.customerId || undefined,
                amount: paymentDetails.amount,
                currency: 'USD',
                status: squarePaymentResult.status || 'UNKNOWN',
                paymentDate: squarePaymentResult.createdAt ? new Date(squarePaymentResult.createdAt).toISOString() : new Date().toISOString(),
                type: paymentDetails.type,
                paymentMethod: 'Square Online',
                notes: paymentDetails.notes,
            }
        });
        payload.logger.info(`Payment record created for client ${client.id}, Square payment ${squarePaymentResult.id}, Type: ${paymentDetails.type}`);
    } catch (error) {
        // The squarePaymentResult.id is guaranteed to be a string here by the initial check
        payload.logger.error(`Failed to create payment record for client ${client.id}, Square payment ${squarePaymentResult.id}: ${error}`);
    }
}