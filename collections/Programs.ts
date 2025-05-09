import type { CollectionConfig } from 'payload'

export const Programs: CollectionConfig = {
  slug: 'programs',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['programId', 'name', 'durationText', 'costPerSession', 'enrollmentFee'],
    group: 'Program Setup', // Example group
    description: 'Define the programs offered, their structure, and pricing.',
  },
  access: {
    read: () => true,
    create: () => true, // Decide admin access
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'programId', // This should be unique, e.g., "dv_male", "sort"
      label: 'Program ID (Unique Code)',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'A unique code for this program (e.g., dv_male, am, sort). This is used for linking.',
      }
    },
    {
      name: 'name',
      label: 'Program Name',
      type: 'text',
      required: true,
      localized: false, // If you don't need localization for program names
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Program Description',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'durationText', // e.g., "26 weeks", "18 months"
          label: 'Duration (Text)',
          type: 'text',
          admin: { width: '33%' },
        },
        {
          name: 'weeks', // For calculation if needed
          label: 'Duration (Weeks)',
          type: 'number',
          min: 0,
          admin: { width: '33%' },
        },
        {
            name: 'sessionsPerWeek',
            label: 'Sessions Per Week',
            type: 'number',
            defaultValue: 1,
            min: 1,
            admin: { width: '33%' },
        }
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'costPerSession',
          label: 'Cost Per Session ($)',
          type: 'number',
          min: 0,
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'enrollmentFee',
          label: 'Enrollment Fee ($)',
          type: 'number',
          min: 0,
          required: true,
          admin: { width: '50%' },
        },
      ]
    },
    {
        name: 'programCategory',
        label: 'Program Category',
        type: 'select',
        options: [
            {label: 'Court Ordered', value: 'court_ordered'},
            {label: 'College & University', value: 'college_university'},
            {label: 'Corporate & Hospital', value: 'corporate_hospital'},
            {label: 'General Wellness', value: 'general_wellness'}
        ],
        admin: {
            description: 'Categorize the program for filtering or display purposes.'
        }
    },
    {
        name: 'isActive',
        label: 'Is Program Active?',
        type: 'checkbox',
        defaultValue: true,
        admin: {
            description: 'Active programs can be selected during enrollment.'
        }
    }
  ],
} 