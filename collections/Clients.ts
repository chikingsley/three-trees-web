import type { CollectionConfig } from 'payload'
import { v4 as uuidv4 } from 'uuid';

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
    useAsTitle: 'lastName',
    defaultColumns: ['firstName', 'lastName', 'email', 'publicId', 'enrollmentProcessStatus', 'paymentStatus', 'updatedAt'],
    group: 'Customers',
  },
  access: {
    read: ({ req }) => {
      if (req.user && req.user.roles?.includes('admin')) {
        return true;
      }
      // Future: Allow clients to read their own record
      return false; 
    },
    create: () => true, // Public enrollment form needs this
    update: ({ req }) => {
      if (req.user && req.user.roles?.includes('admin')) {
        return true;
      }
      // Future: Allow clients to update parts of their own record
      return false;
    },
    delete: ({ req }) => {
      if (req.user && req.user.roles?.includes('admin')) {
        return true;
      }
      return false;
    },
  },
  fields: [
    // Personal Info
    {
      name: 'publicId',
      label: 'Public ID',
      type: 'text',
      unique: true,
      index: true, 
      admin: { readOnly: true, position: 'sidebar' },
      defaultValue: () => uuidv4(),
      access: { 
          read: () => true, // Public ID can be generally readable if the document itself is readable
          update: ({ req }) => !!req.user && req.user.roles?.includes('admin'), // Only admins can change it
      },
    },
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
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'city',
          type: 'text',
          admin: { width: '40%' },
        },
        {
          name: 'state',
          type: 'text',
          admin: { width: '30%' },
        },
        {
          name: 'zipcode',
          type: 'text',
          admin: { width: '30%' },
        },
      ],
    },
    {
      name: 'sex',
      type: 'select',
      options: ['Male', 'Female'],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'county',
          type: 'relationship',
          relationTo: 'counties',
          hasMany: false,
          required: false,
          admin: {
            description: 'Select the client\'s county of residence or use the "Other" field',
            width: '50%'
          }
        },
        {
          name: 'countyOther',
          type: 'text',
          admin: {
            description: 'If county not in the list, specify the name here',
            width: '50%',
            placeholder: 'Other county...'
          }
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
      type: 'relationship',
      relationTo: 'referral-sources',
      hasMany: false,
      required: false,
      admin: {
        description: 'Select the agency that referred this client or use the "Other" field'
      }
    },
    {
      name: 'referralSourceOther',
      type: 'text',
      admin: {
        description: 'If referral source not in the list, specify here',
        placeholder: 'Other referral source...'
      }
    },
    {
      name: 'whyReferred',
      type: 'textarea',
    },
    // Program & Scheduling
    {
      name: 'selectedProgram',
      type: 'relationship',
      relationTo: 'programs',
      hasMany: false,
      admin: {
        description: 'The program the client is enrolled in'
      }
    },
    {
      name: 'selectedClassSlot',
      type: 'relationship',
      relationTo: 'classes',
      hasMany: false,
      admin: {
        description: 'The specific day/time slot the client is assigned to'
      }
    },
    // Documents
    {
      name: 'agreedToTerms',
      label: 'Agreed to Program Agreement & Consent',
      type: 'checkbox',
    },
    {
      name: 'signature',
      label: 'Electronic Signature (Typed Name)',
      type: 'text',
    },
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
      access: { // Field-level access for sensitive ID
        read: ({ req }) => !!req.user && req.user.roles?.includes('admin'),
        update: ({ req }) => !!req.user && req.user.roles?.includes('admin'),
      }
    },
    {
      name: 'squareSubscriptionId',
      label: 'Square Subscription ID',
      type: 'text',
      admin: {
        readOnly: true, // Usually set programmatically
        position: 'sidebar',
      },
      access: { // Field-level access for sensitive ID
        read: ({ req }) => !!req.user && req.user.roles?.includes('admin'),
        update: ({ req }) => !!req.user && req.user.roles?.includes('admin'),
      }
    },
    // Notes field for admin
    {
      name: 'internalNotes',
      label: 'Internal Notes',
      type: 'textarea',
      admin: {
        description: 'Notes for internal admin use only.'
      }
    },
    // {
    //   name: 'tags',
    //   type: 'relationship',
    //   relationTo: 'tags',
    //   hasMany: true,
    // }, // Temporarily removed due to missing Tags collection
    {
      name: 'class',
      label: 'Assigned Class Block',
      type: 'relationship',
      relationTo: 'classes',
      hasMany: false,
      admin: {
        description: 'The specific class block this client is currently assigned to.',
      }
    },
  ],
}
