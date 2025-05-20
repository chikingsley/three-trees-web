import type { CollectionConfig } from 'payload'

export const Payments: CollectionConfig = {
  slug: 'payments',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['id', 'client', 'program', 'amount', 'status', 'paymentDate', 'type'],
    group: 'Billing',
    description: 'Records of financial transactions, primarily from Square.',
  },
  access: {
    read: ({ req }) => {
      if (!req.user) return false;
      if (req.user.roles?.includes('admin')) {
        return true;
      }
      return false;
    },
    create: ({ req }) => {
      if (!req.user) return false;
      if (req.user.roles?.includes('admin')) {
        return true;
      }
      return false;
    },
    update: ({ req }) => {
      if (!req.user) return false;
      if (req.user.roles?.includes('admin')) {
        return true;
      }
      return false;
    },
    delete: ({ req }) => {
      if (!req.user) return false;
      if (req.user.roles?.includes('admin')) {
        return true;
      }
      return false;
    },
  },
  fields: [
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'clients',
      required: true,
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'program',
      type: 'relationship',
      relationTo: 'programs',
      required: false,
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'squarePaymentId',
      label: 'Square Payment ID',
      type: 'text',
      admin: {
        description: 'The unique ID of the payment from Square.',
        readOnly: false,
      },
    },
    {
      name: 'squareSubscriptionId',
      label: 'Square Subscription ID',
      type: 'text',
      admin: {
        description: 'The unique ID of the subscription from Square, if this payment is for one.',
        readOnly: false,
      },
    },
    {
      name: 'squareCustomerId',
      label: 'Square Customer ID',
      type: 'text',
      admin: {
        description: 'The Square Customer ID associated with this payment.',
        readOnly: false,
      },
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      admin: {
        description: 'Payment amount in currency units (e.g., dollars). Assumed to be in the system currency (e.g., USD).',
      },
    },
    {
      name: 'currency',
      type: 'text',
      required: true,
      defaultValue: 'USD',
      admin: {
        description: 'Currency code (e.g., USD).',
      },
    },
    {
      name: 'status',
      label: 'Payment Status',
      type: 'text',
      required: true,
      admin: {
        description: 'The status of the payment (e.g., COMPLETED, FAILED, PENDING). Often from Square.',
      },
    },
    {
      name: 'paymentDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'The date and time the payment was processed.',
      },
      defaultValue: () => new Date(),
    },
    {
      name: 'type',
      label: 'Payment Type',
      type: 'select',
      required: true,
      options: [
        { label: 'Enrollment Fee', value: 'enrollment_fee' },
        { label: 'Session Fee (Subscription)', value: 'session_fee_subscription' },
        { label: 'Session Fee (PAYG)', value: 'session_fee_payg' },
        { label: 'Program Fee (Pay in Full)', value: 'program_fee_pif' },
        { label: 'Refund', value: 'refund' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'The nature of the payment.',
      },
    },
    {
        name: 'paymentMethod',
        label: 'Payment Method Detail',
        type: 'text',
        defaultValue: 'Square Online',
        admin: {
          description: 'e.g., Square Online, Manual Offline, Check'
      }
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Payment Notes',
    }
  ],
} 