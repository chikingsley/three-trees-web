import type { CollectionConfig } from 'payload'

export const AttendanceRecords: CollectionConfig = {
  slug: 'attendance-records',
  admin: {
    useAsTitle: 'date',
    defaultColumns: ['date', 'class', 'client', 'status'],
    group: 'Operations',
    description: 'Track attendance for every class session.'
  },
  access: {
    read: ({ req }) => !!req.user && req.user.roles?.includes('admin'),
    create: ({ req }) => !!req.user && req.user.roles?.includes('admin'),
    update: ({ req }) => !!req.user && req.user.roles?.includes('admin'),
    delete: ({ req }) => !!req.user && req.user.roles?.includes('admin'),
  },
  fields: [
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'MM/dd/yyyy',
        }
      }
    },
    {
      name: 'class',
      type: 'relationship',
      relationTo: 'classes',
      hasMany: false,
      required: true,
    },
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'clients',
      hasMany: false,
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Present', value: 'present' },
        { label: 'Absent - Excused', value: 'absent_excused' },
        { label: 'Absent - Unexcused', value: 'absent_unexcused' },
      ]
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
} 