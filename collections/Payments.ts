import type { CollectionConfig } from 'payload'

export const Payments: CollectionConfig = {
  slug: 'payments',
  admin: {
    group: 'Customers',
    defaultColumns: ['client', 'amount', 'paymentDate', 'type', 'squareTransactionId'],
    description: 'Records of financial transactions.',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'clients',
      required: true,
      hasMany: false,
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      admin: {
        description: 'Amount in USD (e.g., 50.00 for $50.00)',
      }
    },
    {
      name: 'paymentDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'MM/dd/yyyy hh:mm a',
        },
      },
      defaultValue: () => new Date(),
    },
    {
      name: 'type',
      label: 'Payment Type',
      type: 'select',
      options: [
        { label: 'Enrollment Fee', value: 'enrollment_fee' },
        { label: 'Session Fee (One-time/Autopay)', value: 'session_fee' },
        { label: 'Full Program Prepayment', value: 'full_program_prepayment' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
        name: 'paymentMethod',
        label: 'Payment Method Detail',
        type: 'text',
        defaultValue: 'Square Online',
        admin: {
            description: 'e.g., Square Online, Manual Offline'
        }
    },
    {
      name: 'squareTransactionId',
      label: 'Square Transaction ID',
      type: 'text',
      admin: {
        readOnly: true, // Usually set programmatically by the payment integration
      }
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Payment Notes',
    }
  ],
} 