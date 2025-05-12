import type { CollectionConfig } from 'payload'

export const ReferralSourceTypes: CollectionConfig = {
  slug: 'referral-source-types',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'abbreviation', 'isActive'],
    group: 'Program Setup',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name of the referral source type (e.g., "Probation Pardon & Parole")'
      }
    },
    {
      name: 'abbreviation',
      type: 'text',
      required: true,
      admin: {
        description: 'Common abbreviation (e.g., "PPP")'
      }
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Active referral source types can be selected during enrollment.'
      }
    }
  ],
}
