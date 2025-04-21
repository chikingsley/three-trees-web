import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'featured', 'updatedAt'],
    group: 'Content',
  },
  access: {
    // Using simple access control for now, adjust as needed
    read: () => true,
    create: () => true, // Example: Allow anyone to create
    update: () => true, // Example: Allow anyone to update
    delete: () => true, // Example: Allow anyone to delete
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'title', // e.g., "Former Client"
      type: 'text',
      required: true,
    },
    {
      name: 'location', // e.g., "South Carolina"
      type: 'text',
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'fullTestimonial', // Optional longer version
      type: 'richText',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', // Assumes 'media' collection exists
    },
    // Removed programType and service relationships for this test
    // {
    //   name: 'programType',
    //   type: 'relationship',
    //   relationTo: 'programTypes', // Assumes 'programTypes' collection exists
    // },
    // {
    //   name: 'service',
    //   type: 'relationship',
    //   relationTo: 'services', // Assumes 'services' collection exists
    // },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'date',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
