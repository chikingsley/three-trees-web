# Square API Integration Plan for Enrollment Payment

This document outlines the Square Node.js SDK methods to be used for processing payments in the enrollment flow.

**SDK Initialization:**

- Imports: `import { SquareClient, SquareEnvironment, SquareError } from 'square';`
- Client: `new SquareClient({ accessToken: process.env.SQUARE_ACCESS_TOKEN, environment: SquareEnvironment.Sandbox // or .Production });`
- Error Handling: Use `instanceof SquareError`.

---

## Phase: 'finalPayment' (Triggered after card nonce is obtained from frontend)

### Overall Flow for Each Client

1. Create/Retrieve Square Customer.
2. Create Card on File for the Customer using the nonce.
3. Process payment based on `paymentOption`:
    a. If one-time payment (Enrollment Fee or Full Program): Create a Payment.
    b.  If recurring (Autopay Weekly):
        i.  Charge Enrollment Fee (if applicable) as a one-time Payment.
        ii. Create a Subscription using the card on file.

---

### Detailed Method Breakdown

1. Create/Retrieve Square Customer

   - **Method:** `squareClient.customers.create({ ... })`
   - **Documentation:** `square-customers.md`
   - **Purpose:** Create a new customer profile in Square.
   - **Key Parameters (to send from our data):
      - `idempotencyKey` (string, UUID)
      - `givenName` (string, from `clientRecordFromToken.firstName`)
      - `familyName` (string, from `clientRecordFromToken.lastName`)
      - `emailAddress` (string, from `clientRecordFromToken.email`)
      - `phoneNumber` (string, optional, from `clientRecordFromToken.phone`)
      - `referenceId` (string, our Payload `clientRecordFromToken.id` to link them)
      - `note` (string, optional, e.g., "Three Trees Enrollment Client")
   - **Expected Response Data (from `Square.CreateCustomerResponse`):
      - `result.customer.id` (string, the Square Customer ID - **Store this on our Client record as `squareCustomerId`**)
      - `result.customer.version` (BigInt, if needed for optimistic concurrency on customer updates later)
   - **Consideration:** Before creating, we might want to search if a customer with `referenceId` (our client ID) or matching email already exists to prevent duplicates. This would involve `squareClient.customers.searchCustomers({ query: { filter: { ... } } })`.

2. Create Card on File (using Card Nonce)

   - **Method:** `squareClient.cards.create({ ... })`
   - **Documentation:** `square-card.md`
   - **Purpose:** Securely save the card details (obtained via `cardNonce` from frontend) to the Square Customer.
   - **Key Parameters:
      - `idempotencyKey` (string, UUID)
      - `sourceId` (string, the `cardNonce` received from the frontend)
      - `card`: {
          - `customerId` (string, the `squareCustomerId` obtained from step 1)
          - `cardholderName` (string, e.g., `clientRecordFromToken.firstName + " " + clientRecordFromToken.lastName`)
          - `billingAddress` (object, optional, can map from client address if available)
        }
   - **Expected Response Data (from `Square.CreateCardResponse`):
      - `result.card.id` (string, the ID of the card on file - **Needed for creating subscriptions**)

3. Process One-Time Payment (Enrollment Fee or Full Program Prepayment)

   - **Method:** `squareClient.payments.create({ ... })`
   - **Documentation:** `square-payments.md`
   - **Purpose:** Charge a specific amount immediately.
   - **Key Parameters:
      - `sourceId` (string, the `cardNonce` OR the `card.id` from step 2 if doing card on file first for all scenarios)
         - *Decision Point: If we create card on file (Step 2) for ALL payment options first, then this `sourceId` becomes the card-on-file ID. If we only do Step 2 for subscriptions, then for one-time payments, `sourceId` is the `cardNonce`.*
      - `idempotencyKey` (string, UUID)
      - `amountMoney`: { `amount`: BigInt (amount in cents), `currency`: "USD" }
      - `locationId` (string, from `process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID`)
      - `customerId` (string, optional, the `squareCustomerId` from step 1)
   - **Expected Response Data (from `Square.CreatePaymentResponse`):
      - `result.payment.id` (string, the Square Payment ID - **Store in our Payload `Payments` collection**)
      - `result.payment.status` (string, should be `COMPLETED` or `APPROVED`)

4. Create Subscription (for Autopay Weekly)

   - **Method:** `squareClient.subscriptions.create({ ... })`
   - **Documentation:** `square-subscriptions.md`
   - **Purpose:** Set up a recurring payment.
   - **Key Parameters:
      - `idempotencyKey` (string, UUID)
      - `locationId` (string, from `process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID`)
      - `planVariationId` (string, **ID of the pre-defined weekly plan from Square Dashboard - needs to be in env var**)
      - `customerId` (string, the `squareCustomerId` from step 1)
      - `cardId` (string, the ID of the card on file from step 2)
      - `startDate` (string, optional, YYYY-MM-DD, if not today)
   - **Expected Response Data (from `Square.CreateSubscriptionResponse`):
      - `result.subscription.id` (string, the Square Subscription ID - **Store on our Client record as `squareSubscriptionId`**)
      - `result.subscription.status`

---

### Future Subscription Management Methods

- Pause Subscription
  - **Method:** `squareClient.subscriptions.pause({ ... })`
  - **Key Parameters:** `subscriptionId`

- Resume Subscription
  - **Method:** `squareClient.subscriptions.resume({ ... })`
  - **Key Parameters:** `subscriptionId`

- Cancel Subscription
  - **Method:** `squareClient.subscriptions.cancel({ ... })`
  - **Key Parameters:** `subscriptionId`

---

### TODO before implementing in `route.ts`

- [ ] Ensure `SQUARE_ACCESS_TOKEN`, `SQUARE_ENVIRONMENT`, and `NEXT_PUBLIC_SQUARE_LOCATION_ID` are correctly set in `.env`.
- [ ] Create a weekly subscription plan in the Square Dashboard and get its `planVariationId`. Store this as `SQUARE_AUTOPAY_WEEKLY_PLAN_ID` in `.env`.
- [ ] Add `active_paid_enrollment_fee` as an option to the `paymentStatus` field in `collections/Clients.ts` and regenerate Payload types.
- [ ] Create a `Payments` collection in Payload to log transactions.
  - Fields: `client` (relationship to Clients), `squarePaymentId` (text, unique), `amount` (number), `currency` (text, e.g., "USD"), `status` (text, from Square), `paymentDate` (date), `type` (select: 'enrollment_fee', 'session_fee', 'full_program').
