# Enrollment Form: Phased Data Submission Strategy

This document tracks the implementation of a phased enrollment form data submission strategy. The goal is to capture core contact information and consent earlier in the process, allowing for follow-up and better drop-off analysis.

## Overview

* [x] Initial frontend changes
  * [x] Split **PersonalInfoStep** into **ContactInfoStep** and **ProgramInfoStep**
  * [x] Add new fields and update schemas
  * [x] Update UI components structure
* [ ] Complete backend and frontend integration for phased submissions
* [x] Switch all IDs to UUID v4 format
* [ ] Implement security hardening measures

---

## Phase 1: Frontend Form Structure

* [x] Reorganize enrollment form steps
  * [x] Split single PersonalInfoStep into separate steps
  * [x] Create ContactInfoStep component
  * [x] Create ProgramInfoStep component
* [x] Update data model and validation schemas
* [x] Ensure all new UI components are responsive

---

## Phase 2: Backend - Adapting `/api/enroll` for Phased Submissions

* [x] Modify `/api/enroll/route.ts` to handle phased submissions
  * [x] Implement `submissionPhase` field in request body
  * [x] Handle different data payloads based on phase

### Client Record Handling

* [x] Initial Submission (ContactInfoStep data)
  * [x] Create/locate Client document using email
  * [x] Set `enrollmentProcessStatus` field (e.g., `contact_info_collected`)
  * [x] Return `clientId` in response

* [x] Subsequent Submissions (ProgramInfoStep, SchedulingStep, ConsentStep)
  * [x] Find existing Client document via identifier
  * [x] Update Client document with phase-specific data
  * [x] Update status field accordingly
  * [x] Return success response

* [ ] Final Submission (after PaymentStep)
  * [ ] Process payment with Square
    * [ ] On success:
      * [ ] Update Client record with payment details
      * [ ] Create Enrollment record
      * [ ] Create Payment record(s)
      * [ ] Send confirmation emails
    * [ ] On failure:
      * [ ] Update Client with failed payment status
      * [ ] Return error to frontend

* [x] Data Validation
  * [x] Implement Zod validation for final submission
  * [ ] Add phase-specific Zod schemas for each submission type

* [x] Client Model/Schema
  * [x] Add `enrollmentProcessStatus` field to track progress
  * [x] Configure timestamps and additional metadata

---

## Phase 3: Frontend - Implementing Phased API Calls

* [ ] Update `goToNextStep` function in enrollment form
  * [ ] After ContactInfoStep (case 0)
    * [ ] Remove TODO placeholders
    * [ ] Implement fetch request to `/api/enroll`
    * [ ] Send phase-specific data with `submissionPhase: 'contactInfo'`
    * [ ] Handle success/error responses appropriately
  
  * [ ] After ProgramInfoStep (case 1)
    * [ ] Remove TODO placeholders
    * [ ] Implement fetch request with program selection data
    * [ ] Include client identifier and `submissionPhase: 'programInfo'`
    * [ ] Handle responses
  
  * [ ] After SchedulingStep and ConsentStep
    * [ ] Implement similar API calls with appropriate data
  
  * [ ] Final API Call (after PaymentStep)
    * [ ] Adjust existing submission logic
    * [ ] Include client identifier and `submissionPhase: 'finalPayment'`

* [ ] State Management for client tracking
  * [ ] Store and manage `clientId` across form steps
  * [ ] Ensure consistent client identification in all API calls

---

## Phase 4: Testing and Refinement

* [ ] Thorough Testing
  * [ ] Test each step's individual submission
    * [ ] Data saved correctly after ContactInfoStep
    * [ ] Client record updated correctly after subsequent steps
    * [ ] Status field updates appropriately
  * [ ] Test full enrollment flow
    * [ ] Successful payment scenario
    * [ ] Failed payment scenario
  * [ ] Test drop-off scenarios
    * [ ] Partial completion and browser refresh/close
  * [ ] Test error handling
  * [ ] Verify data integrity across phases
  * [ ] Confirm validation works correctly before API calls

---

## Security & Quality Checklist

* [ ] Lock down collection access rules
  * [ ] Implement stricter access on `clients` collection

  ```ts
  access: {
    read: ({ req })   => !!req.user && req.user.role === 'admin',
    create: ()        => true, // public -> ok
    update: ({ req }) => !!req.user && req.user.role === 'admin',
    delete: ({ req }) => !!req.user && req.user.role === 'admin',
  }
  ```

  * [ ] Apply similar rules to other collections
    * [ ] payments
    * [ ] enrollments
    * [ ] programTypes
    * [ ] classSlots

* [x] Never return full client record in API responses
  * [x] Return only minimal required data

  ```ts
  return NextResponse.json({
    message: 'Contact info saved.',
    clientId: createdClient.id // ✅ safe
  }, { status: 201 })
  ```

* [ ] Store progress in opaque session token
  * [ ] After "contactInfo" phase, create client
  * [ ] Generate signed JWT with clientId
  * [ ] Verify token server-side for subsequent requests

* [ ] Hide payment IDs from frontend
  * [ ] Configure Square IDs as admin-only

  ```ts
  {
    name: 'squareCustomerId',
    admin: { readOnly: true, position: 'sidebar' },
    access: { read: ({ req }) => !!req.user && req.user.role === 'admin' }
  }
  ```

* [ ] Validate every incoming body
  * [ ] Create phase-specific Zod schemas

  ```ts
  const contactInfoSchema = z.object({
    personalInfo: z.object({
      firstName: z.string().min(1),
      email: z.string().email(),
      // ...
    }),
    submissionPhase: z.literal('contactInfo')
  })
  ```

* [ ] Add rate-limiting and logging
  * [ ] Implement rate-limiter on `/api/enroll`
  * [ ] Set up logging to detect abuse

* [ ] Configure environment and HTTPS settings
  * [x] Store sensitive data in env vars
  * [ ] Force HTTPS and secure cookies in production

---

## Immediate Next Actions

* [ ] Copy stricter access rules into all collections
* [ ] Implement JWT helper for secure client identification
* [ ] Create Zod schemas for each submission phase
* [ ] Add rate-limit middleware (10-20 POSTs per 10 min)

These four steps will significantly improve your application's security posture without slowing down feature development.
