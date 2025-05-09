import type { CollectionConfig } from 'payload'
import {
  countyNames,
  referralSources,
  // PaymentOption as PaymentOptionType // Removed unused alias
} from '../lib/form-types' // Adjust path as necessary

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
    useAsTitle: 'lastName', // Changed to lastName, can be combined later
    defaultColumns: ['firstName', 'lastName', 'email', 'paymentStatus', 'enrollmentDate', 'updatedAt'],
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
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'email', // Assuming email is collected, add if not
      type: 'email',
      // required: true, // Decide if email is strictly required
    },
    {
      name: 'phone', // Assuming phone is collected
      type: 'text',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'city',
          type: 'text',
          // required: true, // From form-types, city is required
          admin: { width: '50%' },
        },
        {
          name: 'sex',
          type: 'select',
          options: ['Male', 'Female'],
          // required: true, // From form-types, sex is required
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'county',
      type: 'select',
      options: [...countyNames, 'Other'].map(val => ({ label: val, value: val })),
      // required: true, // From form-types, county is required
    },
    {
      name: 'countyOther',
      type: 'text',
      admin: {
        condition: (data) => data.county === 'Other',
      },
    },
    {
      name: 'referralSource',
      type: 'select',
      options: [...referralSources, 'Other'].map(val => ({ label: val, value: val })),
      // required: true, // From form-types, referralSource is required
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
      // required: true, // From form-types, whyReferred is required
    },
    // Program & Scheduling
    {
      name: 'selectedProgram', // Stores Program ID
      type: 'text', // Consider relationship to Programs collection later
      // required: true,
    },
    {
      name: 'selectedClassSlotId', // Stores Class Slot ID
      type: 'text', // Consider relationship to ClassSlots collection later
      // required: true,
    },
    // Documents
    {
      name: 'agreedToTerms',
      label: 'Agreed to Program Agreement & Consent',
      type: 'checkbox',
      // required: true, // From form-types, this is true
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
      // required: true, // From form-types, paymentOption is required
    },
    {
      name: 'agreeToRecurring',
      label: 'Agreed to Recurring Payments (for Autopay)',
      type: 'checkbox',
      admin: {
        condition: (data) => data.paymentOption === 'autopay_weekly',
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
        { label: 'Pending Enrollment Fee', value: 'pending_enrollment_fee'},
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
