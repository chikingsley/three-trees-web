# Project Roadmap: Three Trees Platform

This document outlines the phased development plan for the Three Trees platform, encompassing frontend enhancements, backend development with Payload CMS and Square integration, client/referral portals, and more.

## Core Philosophy & Overarching Goals

* **Ease of Use:** Simple, intuitive interfaces for clients, referral sources, and admins.
* **Efficiency:** Streamline current manual processes (enrollment, payments, attendance, reporting, document generation).
* **Data Integrity & Security:** Robust backend and payment handling.
* **Scalability:** Build a system that can grow with the organization.
* **Professionalism:** A polished, reliable platform reflecting Three Trees' services.

---

## Phase 1: MVP Go-Live & Core Admin Functionality

**Goal:** Launch a functional online enrollment form with payment processing and establish the foundational backend for client and class management. Replace current manual enrollment and payment intake.

**Key Components & Features:**

1. **Frontend - Enrollment Form (Current Focus - Mostly Complete for UI/RHF):**
    * **Status:** UI and React Hook Form (RHF) + Zod validation setup largely complete.
    * **Mobile-First Design:** Ensured consistent, simplified styling for mobile (primary focus).
    * **Desktop View:** **TODO:** Review and adapt the enrollment form for a polished desktop experience. Consider how `max-w-md` behaves and if wider layouts are needed for desktop views while maintaining form usability.
    * **Digital Signature for Consent Form:**
        * **Current:** Placeholder text.
        * **TODO:** Research and implement a basic, legally acceptable method for digital signature capture on the consent form. This could range from a typed name affirming agreement to integrating a simple signature pad library if necessary. Clarify legal requirements for this specific context.
        * **Payload Integration:** How will this signed consent be stored and associated with the client in Payload?

2. **Backend - Initial Setup (Payload CMS & Core Logic):**
    * **Payload CMS as GUI for Backend:**
        * **Goal:** Use Payload to manage dynamic content (e.g., program details if not hardcoded, potentially parts of website content) and as an admin interface for core data.
        * **Collections Needed for MVP:**
            * `Clients`: Store all data from the enrollment form (personal info, selected program, scheduling choice, payment status, consent). This will be the central record.
                * Fields from `EnrollmentFormData` (personal info, selected program, selected class slot ID, payment option, consent to recurring).
                * Referral details: Referring person's name/agent name.
                * Internal status fields: Enrollment date, payment status (e.g., initial fee paid, subscription active/inactive), attendance records (to be expanded later).
            * `Programs`: (Could be static in `form-types.ts` for MVP if details are stable, or a Payload collection for dynamic updates).
                * Attributes: ID, Name (gender-specific for DV), Duration, Description, Weeks, Cost per Session, Enrollment Fee.
            * `ClassSlots`: (Could be static in `form-types.ts` for MVP if schedule is stable, or a Payload collection).
                * Attributes: ID, Program ID (linking to Programs), Day, Time, Spots Total. (Dynamic `spotsLeft` requires transactional updates, potentially more complex for initial MVP backend).
            * `Payments`: Record of payments made (one-time enrollment fees, first subscription payments). Link to Client. Store Square transaction IDs.
                * Consider fields: Amount, Date, Payment Method (e.g., "Square"), Transaction ID, Client ID, Type (Enrollment, Session Fee, etc.).
            * `Enrollments`: Link `Clients` to specific `ClassSlots` (many-to-many or through client if one class at a time).
        * **Question:** What existing data needs to be migrated into Payload CMS initially?

    * **API for Enrollment Form Submission:**
        * **Endpoint:** Create a NextJS API route (e.g., `/api/enroll`) to handle the submission of the RHF `EnrollmentFormData`.
        * **Logic:**
            1. Validate incoming data (can re-use Zod schemas on backend).
            2. Create/Update `Client` record in Payload.
            3. Handle payment processing via Square (see below).
            4. Store consent (e.g., timestamp, IP, agreed version).
            5. Store selected class slot.
            6. Send confirmation email to client (and internal notification?).
        * **Error Handling:** Robust error handling and responses to the frontend.

3. **Payments - Square Integration (MVP):**
    * **Goal:** Securely process enrollment fees and initial payments for "Pay Per Session" (recurring setup).
    * **Frontend (Recap):**
        * Integrate Square Web Payments SDK into `PaymentStep.tsx` to replace the placeholder `div#card-container`.
        * On "Pay" button click: Tokenize card details with Square SDK to get a `cardNonce`.
        * Send `cardNonce` along with RHF form data to the backend `/api/enroll`.
        * Handle consent checkbox for recurring payments if "Pay Per Session" is chosen.
    * **Backend (`/api/enroll`):**
        * **Square NodeJS SDK:** Use `squaredev-next-online-payments-example` as a reference.
        * **One-Time Payments ("Prepay All Sessions")**:
            * Use the `cardNonce` to create a one-time charge using Square's Payments API.
        * **Recurring Payments ("Pay Per Session")**:
            1. Create a Square `Customer` profile for the client.
            2. Create a `Card on File` for that customer using the `cardNonce`.
            3. **Subscription Setup:**
                * **Question:** Will subscription plans (e.g., "Weekly DV Class") be pre-defined in the Square Dashboard, or created/managed via API?
                * Subscribe the Square Customer to the appropriate pre-defined weekly subscription plan using Square's Subscriptions API. The plan should match the selected program's weekly session cost.
                * The enrollment fee for "Pay Per Session" needs to be charged as a separate one-time payment or as an initial setup fee for the subscription if Square supports that for the first invoice.
        * **Store Transaction IDs:** Save Square transaction IDs/subscription IDs in Payload `Payments` / `Clients` collection.
        * **Security:** Store Square Access Token securely on the backend (environment variables).

4. **Phase 1 Completion - Client Portal (Manage Payments - Basic):**
    * **Goal:** Allow enrolled clients to log in and manage their payment methods for recurring subscriptions.
    * **Authentication:** Basic email/password or social login for clients (Payload can handle users).
    * **Functionality:**
        * View current subscription status (e.g., active, next billing date for per-session).
        * Update card on file (using Square SDK to re-tokenize a new card and update the Square Customer/Subscription).
        * View payment history (basic list of payments made, fetched from Payload `Payments` collection).
    * **Note:** This implies client records in Payload need to link to their Square Customer ID and Subscription ID(s).

5. **Phase 1 Completion - Admin - Basic Client & Class Management View (Payload CMS):**
    * **Goal:** Admins can view enrolled clients, their selected classes, and payment status within Payload CMS.
    * **Functionality (via Payload Admin UI):**
        * List all clients and their details.
        * See which class slot a client is enrolled in.
        * View payment records for each client.
        * Manually update client status if needed (e.g., mark as inactive).
        * View basic class rosters (list of clients per class slot).
        * **Question:** What are the key data points an admin needs to see at a glance for client and class load management in this phase?

---

## Phase 2: Full Site Buildout & Enhanced Admin Tools

**Goal:** Develop the full informational website, create a robust component library, implement SEO best practices, and enhance admin capabilities for document generation and more detailed class management.

**Key Components & Features:**

1. **Website Content Pages:**
    * Build out all pages outlined in the site structure (e.g., from `blocks/Footer/index.tsx` links: Services, About Us, Blog, Contact, Legal pages).
    * **Payload Integration:** Determine which content sections on these pages should be manageable via Payload CMS (e.g., program descriptions, blog posts, team member bios).

2. **Reusable Component Library:**
    * **Goal:** Develop a well-organized, scalable library of React components (in `/components`) to be used across the entire site (informational pages and application parts).
    * **Strategy:** Identify common UI patterns (heroes, cards, lists, CTAs, form elements beyond enrollment) and build generic, stylable components.
    * Prioritize mobile-first, ensure desktop beauty and responsiveness.
    * **Question:** Are there existing design mockups or a style guide to adhere to for these components?

3. **SEO Implementation:**
    * Implement SEO best practices: semantic HTML, meta tags (title, description), Open Graph tags, structured data (Schema.org) where appropriate (e.g., for courses, organization).
    * Ensure content is crawlable. Sitemap generation.
    * Consider NextJS features for SEO (getServerSideProps/getStaticProps for metadata, dynamic routing).

4. **Backend - Document Generation (Admin Triggered):**
    * **Goal:** Enable admins to generate templated documents for clients from within Payload or a dedicated admin interface.
    * **Documents:**
        * Completion Certificate
        * Progress Update (Weekly - consider how data for this is collected/inputted)
        * Termination Considered Letter
        * Termination Letter
        * Failure to Start Letter
        * (Potentially) Reminder of Payment
    * **Templating Engine:** Choose a library/method for generating these (e.g., using a library that converts HTML/Markdown to PDF, or server-side document templating).
    * **Payload Integration:** Store generated documents (or links to them) associated with the client record in Payload.
    * **Data Points:** Identify all data points needed for each template (client name, program name, dates, attendance specifics, etc.).

5. **Enhanced Class Management (Admin - Payload/Custom UI):**
    * **Attendance Tracking:**
        * Mechanism for admins/facilitators to mark attendance for each class session.
        * Store attendance records per client per session (e.g., present, absent excused, absent unexcused).
        * This data is crucial for progress reports, completion, and termination logic.
    * **Client Progress View:** Detailed view for admins showing classes completed, remaining, absences (excused/unexcused, consecutive), payment history.
    * **Class Roster Enhancements:** Clear view of spots filled vs. total spots for each class slot.
    * Ability to manually move clients between class slots (with appropriate checks/notifications).
    * **Question:** How is attendance currently tracked? How should it be inputted in the new system for Phase 2?

---

## Phase 3: Portal Expansion & Facilitator Tools

**Goal:** Enhance client portal functionality, introduce a portal for referral sources, and provide tools for facilitators.

**Key Components & Features:**

1. **Client Portal Enhancements:**
    * **View Class Schedule:** Show their specific enrolled class day/time.
    * **View Attendance Record:** Display their attendance history.
    * **View Progress:** Number of classes completed/remaining.
    * (Potentially) Access to class materials if applicable.
    * **Note:** Rescheduling by client is deferred for now.

2. **Referral Source Portal (MVP):**
    * **Authentication:** Secure login for referral agents (e.g., probation officers, DSS caseworkers).
    * **Functionality:**
        * Submit new client referrals directly through the portal (form capturing client name, referred program, their contact if available, reason for referral, referring agent details).
            * This would create a `Client` record in Payload, possibly with a "pending enrollment" status.
        * View status of their referred clients (e.g., Enrolled, Attending, Completed, Terminated, Failed to Start).
        * Access to simplified progress updates for their clients (read-only, respecting privacy).
    * **Payload Setup:** `Clients` collection needs a field to link to the referring agent/organization.

3. **Facilitator Portal/Dash (MVP):**
    * **Authentication:** Secure login for facilitators.
    * **Functionality:**
        * View their assigned class schedules and rosters.
        * (Potentially) Input attendance for their classes (alternative to admin input).
        * View hours worked/classes taught for a period.
        * Submit/validate hours for payroll (if moving away from manual invoicing).
    * **Payload Setup:** `Facilitators` collection, linking facilitators to `ClassSlots` they teach.

---

## Phase 4: Advanced Features & Platform Maturity

**Goal:** Integrate live video classes and further automate processes.

**Key Components & Features:**

1. **Live Video Class Integration:**
    * **Platform Choice:** Google Meet API or Daily.co (or other video SDKs).
    * **Client Portal:** Clients access live class sessions directly through their portal.
        * Link to join the video call.
        * Authentication to ensure only enrolled clients can join their specific class.
    * **Automatic Attendance (Partial):** Leverage API events (join/leave) to help with attendance tracking. Manual verification by facilitator might still be needed.
    * **Facilitator Tools:** Start/manage sessions.

2. **Automated Notifications & Reminders:**
    * Email/SMS reminders for upcoming classes.
    * Automated alerts for missed payments (if integrated with Square webhooks for subscription failures).
    * Notifications to referral sources for key client milestones (e.g., completion, termination).

3. **Advanced Reporting & Analytics (Admin):**
    * Dashboards for enrollment trends, class fill rates, payment success rates, completion rates by program, etc.

---

## Cross-Cutting Concerns & Decisions

* **Database Choice for Backend (if not solely Payload for all data):** You mentioned Supabase. Is the intention to use Payload CMS primarily as a Headless CMS and admin UI, with Supabase (PostgreSQL) as the primary relational database for transactional data like enrollments, payments, attendance? Or is Payload's own database (MongoDB typically) intended to store all this?
* **Clarification Needed:** How will Payload and Supabase (if used) interact? This decision impacts backend architecture significantly.
* **Email Service:** For sending confirmation emails, password resets, notifications. (e.g., SendGrid, Resend, AWS SES).
* **Error Monitoring & Logging:** Sentry, LogRocket, etc., for both frontend and backend.
* **Deployment Strategy:** Vercel for NextJS frontend. Where will Payload CMS be hosted? How will the database be managed/hosted?
* **User Roles & Permissions (Payload):** Define clear roles (Admin, Client, Referral Agent, Facilitator) and their permissions within Payload and any custom backend logic.

---

This roadmap is a living document. We can adjust priorities and details as we progress. The immediate next steps after this planning would be to solidify the tech choices for the backend (Payload, database, Square API interaction model) and start building out the MVP backend API for enrollment and payments.

What are your initial thoughts on this breakdown? Are there immediate questions or clarifications on Phase 1 that would help us define the very next coding steps more precisely (especially regarding Payload collections and the `/api/enroll` logic)?
