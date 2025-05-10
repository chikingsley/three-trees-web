import type { CollectionConfig } from 'payload'
import {
  countyNames,
  referralSources,
} from '../lib/form-types' 
// import { v4 as uuidv4 } from 'uuid';

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
    useAsTitle: 'lastName', // Changed to lastName, can be combined later
    defaultColumns: ['firstName', 'lastName', 'email', 'enrollmentProcessStatus', 'paymentStatus', 'enrollmentDate', 'updatedAt'],
    group: 'Customers',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    // Personal Info
    // {
    //   name: 'id',
    //   required: true,
    //   type: 'number',
    //   // defaultValue: () => uuidv4(),
    // },
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
        {
          name: 'sex',
          type: 'select',
          options: ['Male', 'Female'],
        }
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'phone',
          type: 'text',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'county',
          type: 'select',
          options: [...countyNames, 'Other'].map(val => ({ label: val, value: val })),
        },
        {
          name: 'countyOther',
          type: 'text',
          admin: {
            condition: (data) => data.county === 'Other',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'state',
          type: 'text',
        },
        {
          name: 'zipcode',
          type: 'text',
        },
      ],
    },
    {
      name: 'consentToContact',
      label: 'Consent to Contact',
      type: 'checkbox',
    },
    {
      name: 'referralSource',
      type: 'select',
      options: [...referralSources, 'Other'].map(val => ({ label: val, value: val })),
    },
    {
      name: 'referralSourceOther',
      type: 'text',
      admin: {
        condition: (data) => data.referralSource === 'Other',
      },
    },
    {
      name: 'whyReferred',
      type: 'textarea',
    },
    // Program & Scheduling
    {
      name: 'selectedProgram',
      type: 'text',
    },
    {
      name: 'selectedClassSlotId',
      type: 'text',
    },
    // Documents
    {
      name: 'agreedToTerms',
      label: 'Agreed to Program Agreement & Consent',
      type: 'checkbox',
    },
    // { // Example for more complex signature data if needed later
    //   name: 'signatureData',
    //   type: 'json', // or textarea
    //   label: 'Signature Affirmation Data (e.g., typed name, timestamp)'
    // },

    // Payment
    {
      name: 'paymentOption',
      type: 'select',
      options: [
        { label: 'Pay As You Go', value: 'pay_as_you_go' },
        { label: 'Autopay Weekly', value: 'autopay_weekly' },
        { label: 'Prepay Full Program', value: 'full_program' },
      ],
    },
    {
      name: 'agreeToRecurring',
      label: 'Agreed to Recurring Payments (for Autopay)',
      type: 'checkbox',
      admin: {
        condition: (data) => data.paymentOption === 'autopay_weekly',
      }
    },
    {
      name: 'enrollmentProcessStatus',
      label: 'Enrollment Process Status',
      type: 'select',
      options: [
        { label: 'Contact Info Collected', value: 'contact_info_collected' },
        { label: 'Program Info Collected', value: 'program_info_collected' },
        { label: 'Schedule Selected', value: 'schedule_selected' },
        { label: 'Consent Agreed', value: 'consent_agreed' },
        { label: 'Final Data Collected (Pending Payment)', value: 'final_data_collected_pending_payment' },
        { label: 'Enrollment Complete', value: 'enrollment_complete' }
      ],
      defaultValue: 'contact_info_collected',
      admin: {
        position: 'sidebar',
      }
    },
    // Internal Admin Fields
    {
      name: 'enrollmentDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'MM/dd/yyyy',
        },
        position: 'sidebar',
        readOnly: false, // Or true if only set programmatically
      },
      defaultValue: () => new Date(),
    },
    {
      name: 'paymentStatus',
      type: 'select',
      options: [
        { label: 'Pending Enrollment Fee', value: 'pending_enrollment_fee' },
        { label: 'Pending Subscription', value: 'pending_subscription' },
        { label: 'Active - Autopaying', value: 'active_autopay' },
        { label: 'Active - Paid in Full', value: 'active_paid_full' },
        { label: 'Payment Issue', value: 'payment_issue' },
        { label: 'Completed', value: 'completed' },
        { label: 'On Hold', value: 'on_hold' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      admin: {
        position: 'sidebar',
      },
      defaultValue: 'pending_enrollment_fee',
    },
    {
      name: 'squareCustomerId',
      label: 'Square Customer ID',
      type: 'text',
      admin: {
        readOnly: true, // Usually set programmatically
        position: 'sidebar',
      },
    },
    {
      name: 'squareSubscriptionId',
      label: 'Square Subscription ID',
      type: 'text',
      admin: {
        readOnly: true, // Usually set programmatically
        position: 'sidebar',
      },
    },
    // Notes field for admin
    {
      name: 'internalNotes',
      label: 'Internal Notes',
      type: 'textarea',
      admin: {
        description: 'Notes for internal admin use only.'
      }
    }
  ],
}
