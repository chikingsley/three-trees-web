import type { CollectionConfig } from 'payload'

export const Enrollments: CollectionConfig = {
  slug: 'enrollments',
  admin: {
    group: 'Customers',
    defaultColumns: ['client', 'classSlot', 'enrollmentDate', 'status'],
    description: 'Tracks client enrollments in specific class slots.',
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
      relationTo: 'clients', // slug of the Clients collection
      required: true,
      hasMany: false,
    },
    {
      name: 'classSlot',
      label: 'Class Slot (Program-Day-Time)',
      type: 'relationship',
      relationTo: 'class-slots', // slug of the ClassSlots collection
      required: true,
      hasMany: false,
      admin: {
        description: 'Links to the specific type of class slot the client enrolled in.'
      }
    },
    {
      name: 'enrollmentDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'MM/dd/yyyy',
        },
      },
      defaultValue: () => new Date(),
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'On Hold', value: 'on_hold' },
      ],
      defaultValue: 'active',
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Enrollment Notes',
    }
  ],
} 