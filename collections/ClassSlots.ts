import type { CollectionConfig } from 'payload'

export const ClassSlots: CollectionConfig = {
  slug: 'class-slots',
  admin: {
    useAsTitle: 'slotIdentifier', // We'll create a virtual field for a better title
    defaultColumns: ['program', 'day', 'time', 'spotsTotal', 'isActive'],
    group: 'Program Setup',
    description: 'Define specific instances of classes, including day, time, and capacity.',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'program', // Relationship to Programs collection
      type: 'relationship',
      relationTo: 'programs', // slug of the Programs collection
      required: true,
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'day',
      type: 'select',
      options: [
        { label: 'Monday', value: 'Monday' },
        { label: 'Tuesday', value: 'Tuesday' },
        { label: 'Wednesday', value: 'Wednesday' },
        { label: 'Thursday', value: 'Thursday' },
        { label: 'Friday', value: 'Friday' },
        { label: 'Saturday', value: 'Saturday' },
        { label: 'Sunday', value: 'Sunday' },
      ],
      required: true,
    },
    {
      name: 'time', // e.g., "5:00 PM"
      type: 'text',
      required: true,
      admin: {
        description: 'Enter time in a consistent format (e.g., 5:00 PM, 10:00 AM).',
      }
    },
    {
      name: 'genderSpecific',
      label: 'Gender Specific (if applicable)',
      type: 'select',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
      ],
      admin: {
        description: 'Select if this class slot is gender-specific.'
      }
    },
    {
      name: 'spotsTotal',
      label: 'Total Spots Available',
      type: 'number',
      min: 0,
      required: true,
      defaultValue: 10,
    },
    {
      name: 'slotIdentifier', // Virtual field for a better admin list title
      type: 'text',
      admin: {
        hidden: true, // Hidden from direct edit
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // remove field from data
            if (siblingData && 'slotIdentifier' in siblingData) { // Ensure siblingData is defined
              delete siblingData['slotIdentifier'];
            }
          }
        ],
        afterRead: [
          // Removed payload and findMany from destructuring as they are not used in this simple version
          async ({ data }) => { 
            if (!data) return null; // Handle case where data might be undefined

            if (data.program && data.day && data.time) {
              let programName = String(data.program); // Default to ID if not populated or not an object
              // Check if program is populated and has a name property
              if (typeof data.program === 'object' && data.program !== null && 'name' in data.program && typeof data.program.name === 'string') {
                programName = data.program.name;
              }
              return `${programName} - ${data.day} ${data.time}`;
            }
            return `Slot - ${data.id || 'Unknown ID'}`;
          }
        ]
      }
    },
    {
      name: 'isActive',
      label: 'Is Slot Active?',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Active slots are available for enrollment selection.'
      }
    }
    // Future: Link to Facilitator(s)
  ],
} 