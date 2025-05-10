# Enrollment Form: Phased Data Submission Strategy

This document outlines the phased data submission strategy for the enrollment form. The goal is to capture core contact information and consent earlier in the process, allowing for follow-up and better drop-off analysis.

The initial frontend changes (splitting **PersonalInfoStep** into **ContactInfoStep** and **ProgramInfoStep**, adding new fields, and updating schemas) are complete. Your next tasks will focus on implementing the API calls from the frontend and adapting the backend to handle these phased submissions.

---

## Phase 2: Backend – Adapting `/api/enroll` for Phased Submissions

**Modify `/api/enroll/route.ts` (or your equivalent API handler):**

- **Distinguish Submission Phases:**
  - The API needs to know which "phase" of data it's receiving. You could achieve this by:
    - Having the frontend send a `submissionPhase` (e.g., `contactInfo`, `programInfo`, `schedule`, `consent`, `finalPayment`) in the request body.
    - Or, inferring the phase based on the presence of certain key fields (e.g., if `firstName` is present but `selectedClassSlotId` is not, it's likely an early phase). A dedicated `submissionPhase` field is often cleaner.

### Client Record Handling

- **Initial Submission** (e.g., ContactInfoStep data):
  - If no existing partial record is identified (see below), create a new Client document in MongoDB.
  - Populate it with the data received (`first name`, `last name`, `email`, `phone`, `city`, `state`, `zip`, `sex`, `county`, `consentToContact`).
  - Set an initial `status` field on the Client document (e.g., `partial_signup_contact_info_collected`).

  **Decision Point:** How will subsequent API calls identify this client?
  - **Option A** (Recommended for simplicity if email is unique and captured first): Use the email address as the primary lookup key for subsequent updates. Ensure your database schema enforces email uniqueness if relying on this.
  - **Option B** (More robust for future): Generate a temporary `clientId` (e.g., a UUID) on this first save, store it in the Client document, and return it to the frontend. The frontend would then include this `clientId` in subsequent requests.
  - Return a success response. If using Option B, return the `clientId`.

- **Subsequent Submissions** (e.g., ProgramInfoStep, SchedulingStep, ConsentStep data):
  - The request should include an identifier (either the email or the temporary `clientId` from Option B above).
  - Find the existing Client document using this identifier.
  - If not found, return an appropriate error (this shouldn't happen in a normal flow but handle it).
  - Update the Client document with the new data received for that phase.
  - Update the `status` field accordingly (e.g., `partial_signup_program_info_collected`, `partial_signup_schedule_selected`, `partial_signup_consent_agreed`).
  - Return a success response.

- **Final Submission** (after PaymentStep):
  - This part of the logic will be similar to the original plan but will now update the existing Client record found via its identifier.
  - Process payment with Square.
    - If payment is successful:
      - Update Client record: set final `paymentStatus` (e.g., `active_paid_full`, `active_autopay`), store Square customer/subscription IDs.
      - Create the Enrollment record.
      - Create Payment record(s).
      - Trigger confirmation emails.
    - If payment fails:
      - Update Client record with `paymentStatus: payment_failed`.
      - Return success/failure to the frontend.

- **Data Validation:**
  - Ensure backend validation is performed for each piece of data received, relevant to the current submission phase.

- **Update Client Model/Schema:**
  - Ensure the Client model includes the new `status` field (string) and any fields needed for temporary IDs if you choose that route.
  - Consider adding `createdAt` and `updatedAt` timestamps if not already present.

---

## Phase 3: Frontend – Implementing Phased API Calls

**Update `app/(frontend)/enroll-now/page.tsx`:**

- **Implement API Calls in `goToNextStep`:**
  - **After ContactInfoStep** (currently case 0 for `currentStep`):
    - Remove the `// TODO: API Call for ContactInfoStep` placeholder.
    - Make a fetch request to `/api/enroll`.
    - **Payload:** Send personalInfo data relevant to this step (`firstName`, `lastName`, `email`, `phone`, `city`, `state`, `zip`, `sex`, `county`, `consentToContact`). Include your chosen `submissionPhase` indicator.
    - **Handle Response:**
      - On success: Proceed to the next UI step. If the API returns a `clientId`, store it in a state variable (e.g., `draftClientId`) or add it to `EnrollmentFormData` to be sent with subsequent requests.
      - On error: Display an error message to the user and do not proceed to the next UI step.
  - **After ProgramInfoStep** (currently case 1 for `currentStep`):
    - Remove the `// TODO: API Call for ProgramInfoStep`.
    - Make a fetch request to `/api/enroll`.
    - **Payload:** Send personalInfo data relevant to this step (`referralSource`, `otherReferralSource`, `selectedProgram`, `whyReferred`). Include the email (or `draftClientId`) to identify the client record. Include the `submissionPhase` indicator.
    - **Handle Response:** Similar to above (success → next step, error → display message).
  - **After SchedulingStep and ConsentStep:**
    - Implement similar API calls, sending `selectedClassSlotId` and `agreedToTerms` respectively, along with the client identifier and `submissionPhase`.
  - **Final API Call (After PaymentStep):**
    - The existing logic for the final submission (inside `onSubmit` after payment processing) will need to be adjusted to send the client identifier (email or `draftClientId`) and the appropriate `submissionPhase` (e.g., `finalPayment`). The backend will then update the final pieces of the Client record and create related records.

- **State Management for `draftClientId` (if used):**
  - If the backend returns a `clientId`, ensure this is managed (e.g., in component state or React Context) and included in subsequent API calls to update the correct record. If relying on email, ensure the email from the form data is consistently used.

---

## Phase 4: Testing and Refinement

- **Thorough Testing:**
  - Test each step's individual submission:
    - Verify data is saved correctly in the database after ContactInfoStep.
    - Verify the Client record is updated correctly after ProgramInfoStep, SchedulingStep, and ConsentStep.
    - Check that the `status` field in the Client document updates correctly at each phase.
  - Test the full enrollment flow, including successful payment and failed payment scenarios.
  - Test drop-off scenarios: complete one step, then refresh or close the browser. Can you identify this partial entry in the database?
  - Test error handling: What happens if an API call fails? Is the user notified appropriately?
  - Data Integrity: Double-check that all data is being correctly associated with the right client throughout the phased process.
  - Validation Triggers: Re-confirm that `methods.trigger()` in `goToNextStep` is correctly validating only the fields relevant to the current UI step before attempting its API call.

### Key Considerations

- **Idempotency (for updates):** Consider if your update operations need to be idempotent, though for simple form updates, it's usually less critical than for financial transactions.
- **Error Handling & User Feedback:** Provide clear feedback to the user if an intermediate save fails.
- **Security:** Continue to follow best practices for API security.
