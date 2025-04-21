import type { CollectionConfig } from 'payload'

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
    useAsTitle: 'firstName', // Or combine firstName + lastName later if needed
    defaultColumns: ['firstName', 'lastName', 'updatedAt'],
    group: 'Customers', // Example group
  },
  access: {
    read: () => true, // Keep access simple for now
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
  ],
}
