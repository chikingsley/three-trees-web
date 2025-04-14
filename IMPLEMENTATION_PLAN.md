# Phased Implementation Plan: Three Trees CFC Platform

This document outlines a phased approach for building the Three Trees Center for Change public website, client portal, and internal CRM system.

**Core Goals:**

*   Establish a professional online presence with clear service offerings.
*   Implement location-based SEO strategy (`Our Presence`).
*   Provide a seamless enrollment process for Court Mandated classes (Form -> Payment -> Scheduling).
*   Develop a client portal for users to manage their engagement (schedule, payments, class access).
*   Integrate live video for online class delivery with auto-attendance.
*   Build an internal CRM for managing clients, classes, facilitators, and payments.
*   Utilize a modern, scalable tech stack with a focus on future HIPAA compliance.

**Technology Stack:**

*   **Frontend (Public Website & Client Portal):** Next.js (App Router) + **Mantine** (UI Component Library)
*   **Backend & Database:** **Convex** (Real-time Database, Backend Functions, Auth - Google Login focus)
*   **CMS:** **Sanity** (Content for Blog, Locations, Media, Team, potentially Services/Industries pages)
*   **Admin UI (Internal CRM):** Next.js (or Vite/React) + **ShadCN/UI** / Mantine (Leverage template but ensure consistency)
*   **Scheduling (Initial Enrollment):** Calendly (or similar embeddable scheduler)
*   **Payments:** Stripe
*   **Video Integration:** **Daily.co** (Selected for API-first approach, control, competitive pricing, and HIPAA options)
*   **E-commerce (Bookstore - Optional):** Medusa
*   **Deployment:** Vercel (Frontend/Convex), Sanity Platform
*   **Package Manager:** pnpm (as per monorepo setup)

**Repository Structure:**

*   Monorepo (`/Volumes/simon's enjoyment/GitHub/three-trees-cfc`) managed by Turborepo.
*   `apps/web`: Next.js public website & client portal (using Mantine).
*   `apps/crm`: Next.js/React admin interface (using ShadCN/Mantine).
*   `packages/ui`: Shared UI components (Evaluate need vs. Mantine).
*   `packages/config`: Shared configs (ESLint, TSConfig).
*   `convex/`: Convex backend functions and schema.

---

## Phase 1: Foundation & Core Website Structure

**Goal:** Set up the project with the chosen tech stack, establish the main site structure with key pages, implement basic layout, and connect to CMS.

*   **Project Setup:**
    *   [x] Confirm Monorepo structure (Turborepo, bun).
    *   [ ] Install and configure **Mantine** in `apps/web`.
    *   [ ] Set up **Convex** project and integrate with `apps/web` (including basic Auth setup).
    *   [ ] Set up **Sanity** project.
    *   [ ] Define initial Sanity schemas (Blog posts, Locations, Media Types, Team Members, Services, Industries).
*   **Layout & Navigation:**
    *   [ ] Re-create main layout (`apps/web/app/layout.tsx`) using Mantine components.
    *   [ ] Re-create Header component with primary navigation (Services, Our Presence, Media, Careers, Contact) using Mantine.
    *   [ ] Re-create Footer component (Social, Phone, Newsletter Placeholder, Privacy, Terms) using Mantine.
    *   [ ] Design & create reusable CTA component ("Let's Get Started").
*   **Core Static Pages (Re-create Structure with Placeholders):**
    *   [ ] `/` (Main Page)
    *   [ ] `/who-we-are` (Overview)
        *   [ ] `/who-we-are/about` (History, Clients)
        *   [ ] `/who-we-are/founder`
        *   [ ] `/who-we-are/team` (Listing page - connect to Sanity)
        *   [ ] `/who-we-are/team/[slug]` (Individual Bio page structure - connect to Sanity)
    *   [ ] `/services` (Overview - connect to Sanity)
        *   [ ] `/services/court-mandated`
        *   [ ] `/services/college`
        *   [ ] `/services/corporations`
        *   [ ] `/services/hospitals`
    *   [ ] `/industries` (Listing page: Colleges, Gov, Hospitals, Manufacturing, etc. - connect to Sanity)
        *   [ ] `/industries/[slug]` (Individual industry detail page - connect to Sanity)
    *   [ ] `/why-choose-us` (Overview, links to Case Studies, Testimonials placeholders)
        *   [ ] `/why-choose-us/case-studies` (Listing placeholder)
        *   [ ] `/why-choose-us/case-studies/[slug]` (Structure placeholder)
        *   [ ] `/why-choose-us/testimonials` (Structure placeholder)
    *   [ ] `/our-presence` (Regions overview: West, Midwest, SW, SE, NE - SEO focus, connect to Sanity for region details/links)
        *   *Future:* `/our-presence/[region]`, `/our-presence/[region]/[state]` etc. (Build out driven by SEO strategy)
    *   [ ] `/media` (Overview)
        *   [ ] `/media/blog` (Listing page - connect to Sanity)
        *   [ ] `/media/blog/[slug]` (Individual post structure - connect to Sanity)
        *   [ ] `/media/press` (Listing/content page - connect to Sanity)
        *   [ ] `/media/podcasts` (Listing/content page - connect to Sanity)
        *   [ ] `/media/books` (Listing/content page - connect to Sanity)
    *   [ ] `/careers`
    *   [ ] `/contact` (Include basic contact info, location map?)
    *   [ ] `/privacy-policy`
    *   [ ] `/terms-of-use`
*   **Basic Content Integration:**
    *   [ ] Implement fetching logic from Sanity for connected pages.
    *   [ ] Populate initial placeholder content via Sanity Studio.
*   **Initial Deployment:**
    *   [ ] Deploy `apps/web` to Vercel.
    *   [ ] Deploy Convex backend.
    *   [ ] Deploy Sanity Studio.

## Phase 2: General Contact & Enrollment Flow v1 (Form -> Email/CRM -> Scheduling)

**Goal:** Capture leads via a general contact form and implement the court-mandated class enrollment form, saving data to Convex, and integrate Calendly for initial scheduling.

*   **General Contact Form (`/contact` page):**
    *   [ ] Build form using Mantine (Name, Email, Phone, Message).
    *   [ ] Create Convex function to receive submission and send email notification / store lead in CRM.
*   **Court-Mandated Form (`/services/court-mandated`):**
    *   [ ] Build detailed form using Mantine components:
        *   [ ] Fields: First/Last Name, Email, Phone, Address (integrate Google Places API?).
        *   [ ] Class Selection (fetch options from Sanity/Convex?).
        *   [ ] Referral Info (County autocomplete?).
        *   [ ] reCAPTCHA integration.
*   **Backend Logic (Convex):**
    *   [ ] Create Convex schema for `EnrollmentRequests` or similar.
    *   [ ] Create Convex function to validate and save form submission to `EnrollmentRequests`.
    *   [ ] Trigger email notification to admin.
*   **Scheduling Integration:**
    *   [ ] On successful form submission, redirect or display embedded Calendly scheduler filtered for relevant class types.
*   **Admin CRM (`apps/crm`):**
    *   [ ] Basic setup of the CRM interface.
    *   [ ] View submitted contact messages.
    *   [ ] View `EnrollmentRequests` from the court-mandated form.

## Phase 3: Payments & Basic Client Portal

**Goal:** Integrate Stripe for payments after enrollment request and provide a basic logged-in area for clients.

*   **Payment Integration:**
    *   [ ] Set up Stripe account.
    *   [ ] Create Convex function(s) to handle Stripe checkout session creation based on selected class/service.
    *   [ ] Integrate Stripe Elements or Checkout redirect into the flow (after form submission or admin approval?).
    *   [ ] Use Stripe webhooks (handled by Convex) to update enrollment status in Convex DB upon successful payment.
*   **Client Authentication:**
    *   [ ] Implement Google Login flow using Convex Auth.
    *   [ ] Create user profile schema in Convex.
*   **Basic Client Portal (`/portal` or similar):**
    *   [ ] Create protected routes accessible only after login.
    *   [ ] Dashboard showing user's basic info.
    *   [ ] Display Payment History (fetched from Convex, linked to Stripe).
    *   [ ] Display Upcoming Classes (based on successful enrollment/payment).

## Phase 4: Video Integration & Enhanced Client Portal

**Goal:** Integrate Daily.co for live class delivery within the portal and implement auto-attendance tracking.

*   **Video Integration (Daily.co):**
    *   [ ] Set up Daily.co account and configure API keys in Convex environment.
    *   [ ] Create Convex functions to manage Daily.co rooms (create room for a scheduled class).
    *   [ ] Embed Daily.co video client in the Client Portal (`/portal/class/[classId]`?).
    *   [ ] Pass user identity tokens to Daily.co for participant identification.
*   **Auto-Attendance:**
    *   [ ] Use Daily.co webhooks (`participant-joined`, `participant-left`) handled by Convex functions.
    *   [ ] Update attendance records in Convex database based on webhook events.
*   **Enhanced Client Portal:**
    *   [ ] Add "Join Class" button that links to the correct Daily.co room within the portal.
    *   [ ] Display class progress/attendance status.

## Phase 5: Advanced CRM & Reporting

**Goal:** Build out the internal CRM with features for managing classes, facilitators, clients, and reporting.

*   **CRM Features (`apps/crm`):**
    *   [ ] Manage Classes (CRUD operations).
    *   [ ] Manage Facilitators.
    *   [ ] Manage Clients/Users (view details, enrollments, payments, attendance).
    *   [ ] Assign Facilitators to Classes.
    *   [ ] View Attendance Reports.
    *   [ ] Manually manage enrollments/payments if needed.
*   **Reporting:**
    *   [ ] Develop basic reporting dashboards in the CRM (e.g., enrollment trends, payment summaries).

## Phase X: Optional Enhancements

*   **Bookstore:**
    *   [ ] Integrate Medusa for e-commerce functionality.
    *   [ ] List books (from Sanity?) for sale.
*   **HIPAA Compliance:**
    *   [ ] Formal review and BAA with vendors (Convex, Daily.co, Stripe, Vercel).
    *   [ ] Implement necessary technical safeguards (logging, access controls, data encryption at rest/transit - review vendor specifics).
    *   [ ] Develop required policies and procedures.
*   **Advanced SEO:**
    *   [ ] Build out deeper location pages (`/our-presence/[region]/[state]`).
    *   [ ] Implement structured data (Schema.org) for services, events, locations, etc.
*   **Full Scheduling System:**
    *   [ ] Replace Calendly with a custom-built scheduling system within the platform if needed.
