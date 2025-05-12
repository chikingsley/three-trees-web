import type { CollectionConfig } from 'payload'

export const Counties: CollectionConfig = {
  slug: 'counties',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'isActive'],
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
      type: 'text',
      required: true,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Active counties can be selected during enrollment.'
      }
    }
  ],
}
