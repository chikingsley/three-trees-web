// app/api/enrollment/phases/finalPayment.ts
import { NextResponse } from 'next/server';
import type { Payload } from 'payload';
import { v4 as uuidV4 } from 'uuid';
import { SquareError } from 'square';
import { squareClient, SQUARE_LOCATION_ID, SQUARE_AUTOPAY_WEEKLY_PLAN_ID } from '../config';
import { createPaymentRecord } from '../helpers';
import type { Client, Program, Payment as PayloadPaymentType } from '@/payload-types';

// Define the request body structure specific to this phase
interface FinalPaymentRequestBody {
    submissionPhase: 'finalPayment';
    paymentDetails: {
        cardNonce: string;
        dueTodayAmount: number;
        paymentOption: string;
    };
}

// Helper to log Square API errors from the response.errors array
function logSquareResponseErrors(payload: Payload, context: string, errors: unknown[] | undefined, clientId?: string) {
    if (errors && errors.length > 0) {
        payload.logger.error(`Client ${clientId || 'N/A'}: Square API call (${context}) failed with errors: ${JSON.stringify(errors)}`);
    }
}

export async function handleFinalPaymentPhase(payload: Payload, rawRequestBody: FinalPaymentRequestBody, client: Client) {
    if (!squareClient) {
        payload.logger.error('Square SDK not initialized. Cannot process payment.');
        return NextResponse.json({ error: 'Payment processing unavailable.' }, { status: 503 });
    }
    if (!SQUARE_LOCATION_ID) {
        payload.logger.error('SQUARE_LOCATION_ID is not configured.');
        return NextResponse.json({ error: 'Payment processing configuration error (location ID missing).' }, { status: 500 });
    }

    const { paymentDetails } = rawRequestBody;
    if (!paymentDetails || !paymentDetails.cardNonce || typeof paymentDetails.dueTodayAmount !== 'number' || !paymentDetails.paymentOption) {
        return NextResponse.json({ error: 'Missing required payment details (nonce, amount, option).' }, { status: 400 });
    }

    const { cardNonce, dueTodayAmount, paymentOption } = paymentDetails;
    const clientProgram = client.selectedProgram as Program | undefined;

    try {
        if (paymentOption === 'full_program' || paymentOption === 'pay_as_you_go') {
            const amountToCharge = BigInt(Math.round(dueTodayAmount * 100));
            payload.logger.info(`Client ${client.id}: Attempting one-time payment for ${paymentOption}, amount: ${amountToCharge}`);

            const paymentResponse = await squareClient.payments.create({
                sourceId: cardNonce,
                idempotencyKey: uuidV4(),
                amountMoney: { amount: amountToCharge, currency: 'USD' },
                locationId: SQUARE_LOCATION_ID,
            });

            // Corrected: Access payment and errors directly from the response
            const createdPayment = paymentResponse.payment;
            const paymentErrors = paymentResponse.errors;

            if (createdPayment && createdPayment.status === 'COMPLETED' && (!paymentErrors || paymentErrors.length === 0)) {
                payload.logger.info(`Client ${client.id}: One-time payment successful: ${createdPayment.id}`);
                let newPaymentStatus: Client['paymentStatus'] = 'payment_issue';
                let paymentRecordType: PayloadPaymentType['type'] = 'enrollment_fee';

                if (paymentOption === 'full_program') {
                    newPaymentStatus = 'active_paid_full';
                    paymentRecordType = 'program_fee_pif';
                } else if (paymentOption === 'pay_as_you_go') {
                    newPaymentStatus = 'active_paid_enrollment_fee';
                    paymentRecordType = 'enrollment_fee';
                }

                await payload.update({
                    collection: 'clients', 
                    id: client.id, 
                    data: {
                        paymentStatus: newPaymentStatus,
                        enrollmentProcessStatus: 'enrollment_complete' as Client['enrollmentProcessStatus']
                    }
                });
                
                await createPaymentRecord(payload, client, createdPayment, {
                    amount: dueTodayAmount, 
                    type: paymentRecordType, 
                    notes: `One-time payment for: ${paymentOption}`
                });
                
                return NextResponse.json({ message: 'Payment successful and enrollment complete!', paymentId: createdPayment.id }, { status: 200 });
            } else {
                logSquareResponseErrors(payload, "one-time payment", paymentErrors, client.id);
                await payload.update({ 
                    collection: 'clients', 
                    id: client.id, 
                    data: { 
                        paymentStatus: 'payment_issue' as Client['paymentStatus'] 
                    } 
                });
                return NextResponse.json({ error: 'Payment failed.', details: paymentErrors }, { status: 500 });
            }
        } else if (paymentOption === 'autopay_weekly') {
            payload.logger.info(`Client ${client.id}: Processing autopay_weekly.`);
            if (!SQUARE_AUTOPAY_WEEKLY_PLAN_ID) {
                payload.logger.error('SQUARE_AUTOPAY_WEEKLY_PLAN_ID is not configured.');
                return NextResponse.json({ error: 'Autopay configuration error (plan ID missing).' }, { status: 500 });
            }
            if (!clientProgram) {
                payload.logger.error(`Client ${client.id}: Cannot process autopay, clientProgram not found or not populated.`);
                return NextResponse.json({ error: 'Selected program details missing for autopay setup.' }, { status: 400 });
            }

            // 1. Charge enrollment fee if applicable
            if (clientProgram.enrollmentFee && clientProgram.enrollmentFee > 0) {
                const enrollFeeCents = BigInt(Math.round(clientProgram.enrollmentFee * 100));
                payload.logger.info(`Client ${client.id}: Charging enrollment fee: ${enrollFeeCents}`);

                const feePaymentResponse = await squareClient.payments.create({
                    sourceId: cardNonce, idempotencyKey: uuidV4(),
                    amountMoney: { amount: enrollFeeCents, currency: 'USD' },
                    locationId: SQUARE_LOCATION_ID,
                });

                // Corrected: Access payment and errors directly
                const feePayment = feePaymentResponse.payment;
                const feePaymentErrors = feePaymentResponse.errors;

                if (!feePayment || feePayment.status !== 'COMPLETED' || (feePaymentErrors && feePaymentErrors.length > 0)) {
                    logSquareResponseErrors(payload, "enrollment fee payment", feePaymentErrors, client.id);
                    await payload.update({ 
                        collection: 'clients', 
                        id: client.id, 
                        data: { 
                            paymentStatus: 'payment_issue' as Client['paymentStatus'] 
                        } 
                    });
                    return NextResponse.json({ error: 'Enrollment fee payment failed.', details: feePaymentErrors }, { status: 500 });
                }
                payload.logger.info(`Client ${client.id}: Enrollment fee payment successful: ${feePayment.id}`);
                await createPaymentRecord(payload, client, feePayment, {
                    amount: clientProgram.enrollmentFee, 
                    type: 'enrollment_fee' as PayloadPaymentType['type'], 
                    notes: 'Enrollment fee for autopay setup.'
                });
            }

            // 2. Create/Update Square Customer
            let currentSquareCustomerId = client.squareCustomerId;
            if (!currentSquareCustomerId) {
                payload.logger.info(`Client ${client.id}: No Square Customer ID found, creating one...`);

                const customerResponse = await squareClient.customers.create({
                    idempotencyKey: uuidV4(),
                    givenName: client.firstName || undefined, 
                    familyName: client.lastName || undefined,
                    emailAddress: client.email || undefined, 
                    phoneNumber: client.phone || undefined,
                    referenceId: client.id,
                });

                // Corrected: Access customer and errors directly
                const createdCustomer = customerResponse.customer;
                const customerErrors = customerResponse.errors;

                if (createdCustomer?.id && (!customerErrors || customerErrors.length === 0)) {
                    currentSquareCustomerId = createdCustomer.id;
                    await payload.update({ 
                        collection: 'clients', 
                        id: client.id, 
                        data: { 
                            squareCustomerId: currentSquareCustomerId 
                        } 
                    });
                    payload.logger.info(`Client ${client.id}: Square Customer created: ${currentSquareCustomerId}`);
                } else {
                    logSquareResponseErrors(payload, "create Square customer", customerErrors, client.id);
                    return NextResponse.json({ error: 'Failed to set up customer for autopay.', details: customerErrors }, { status: 500 });
                }
            }

            // 3. Create Card on File
            payload.logger.info(`Client ${client.id}: Creating card on file for customer: ${currentSquareCustomerId}`);

            const cardResponse = await squareClient.cards.create({
                idempotencyKey: uuidV4(), 
                sourceId: cardNonce,
                card: {
                    customerId: currentSquareCustomerId!,
                    cardholderName: `${client.firstName || ''} ${client.lastName || ''}`.trim() || undefined,
                }
            });

            // Corrected: Access card and errors directly
            const createdCard = cardResponse.card;
            const cardErrors = cardResponse.errors;

            if (!createdCard?.id || (cardErrors && cardErrors.length > 0)) {
                logSquareResponseErrors(payload, "create card on file", cardErrors, client.id);
                return NextResponse.json({ error: 'Failed to save card for autopay.', details: cardErrors }, { status: 500 });
            }
            const cardOnFileId = createdCard.id;
            payload.logger.info(`Client ${client.id}: Card on file created: ${cardOnFileId}`);

            // 4. Create Subscription
            payload.logger.info(`Client ${client.id}: Creating subscription with plan: ${SQUARE_AUTOPAY_WEEKLY_PLAN_ID}`);

            const subscriptionResponse = await squareClient.subscriptions.create({
                idempotencyKey: uuidV4(), 
                locationId: SQUARE_LOCATION_ID!,
                planVariationId: SQUARE_AUTOPAY_WEEKLY_PLAN_ID,
                customerId: currentSquareCustomerId!, 
                cardId: cardOnFileId,
            });

            // Corrected: Access subscription and errors directly
            const createdSubscription = subscriptionResponse.subscription;
            const subscriptionErrors = subscriptionResponse.errors;

            if (createdSubscription?.id && (!subscriptionErrors || subscriptionErrors.length === 0)) {
                const subscriptionId = createdSubscription.id;
                payload.logger.info(`Client ${client.id}: Subscription created: ${subscriptionId}`);
                await payload.update({
                    collection: 'clients', 
                    id: client.id, 
                    data: {
                        squareSubscriptionId: subscriptionId,
                        paymentStatus: 'active_autopay' as Client['paymentStatus'],
                        enrollmentProcessStatus: 'enrollment_complete' as Client['enrollmentProcessStatus']
                    }
                });
                return NextResponse.json({ message: 'Autopay subscription set up successfully!', subscriptionId }, { status: 200 });
            } else {
                logSquareResponseErrors(payload, "create subscription", subscriptionErrors, client.id);
                return NextResponse.json({ error: 'Failed to set up autopay subscription.', details: subscriptionErrors }, { status: 500 });
            }
        } else {
            return NextResponse.json({ error: 'Invalid payment option for final payment.' }, { status: 400 });
        }
    } catch (error) {
        payload.logger.error(`Client ${client.id}: Error during Square payment processing (Payment Option: ${paymentOption}).`, error);
        if (error instanceof SquareError) { // This catches errors thrown by the SDK client itself (e.g., network issues, auth problems)
            return NextResponse.json({
                error: 'Square API Error (SDK Exception)',
                statusCode: error.statusCode, 
                message: error.message,
                details: error.errors
            }, { status: error.statusCode || 500 });
        }
        const message = error instanceof Error ? error.message : 'Payment processing failed unexpectedly.';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}