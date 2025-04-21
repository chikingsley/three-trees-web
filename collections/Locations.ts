import type { CollectionConfig } from 'payload'

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'slug', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true, // Public read access
    create: () => true, // Example: Allow anyone to create
    update: () => true, // Example: Allow anyone to update
    delete: () => true, // Example: Allow anyone to delete
  },
  fields: [
    {
      name: 'name', // e.g., "California" or "Orange County"
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'State', value: 'state' },
        { label: 'County', value: 'county' },
        { label: 'City', value: 'city' },
      ],
      required: true,
    },
    {
      name: 'parent', // Reference to parent location (e.g., state for a county)
      type: 'relationship',
      relationTo: 'locations', // Self-reference
    },
    {
      name: 'description', // Rich text description of services in this location
      type: 'richText',
      required: true,
    },
    {
      name: 'heroImage', // Header image for location page
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'services', // Available services in this location
      type: 'relationship',
      relationTo: 'services', // Reference to Services collection
      hasMany: true,
    },
    {
      name: 'address', // Physical address if applicable
      type: 'group',
      fields: [
        {
          name: 'street',
          type: 'text',
        },
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'state',
          type: 'text',
        },
        {
          name: 'zipCode',
          type: 'text',
        },
      ],
    },
    {
      name: 'contactInformation', // Contact info for this location
      type: 'group',
      fields: [
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'hours',
          type: 'text',
        },
      ],
    },
    {
      name: 'localPartners', // Local providers or partners
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
        },
        {
          name: 'contact',
          type: 'text',
        },
      ],
    },
    {
      name: 'localRequirements', // Specific requirements for this location
      type: 'richText',
    },
    {
      name: 'testimonials', // Location-specific testimonials
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
    },
    {
      name: 'faqs', // Location-specific FAQs
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
        },
      ],
    },
    {
      name: 'seo', // SEO metadata
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
        },
        {
          name: 'keywords',
          type: 'array',
          fields: [
            {
              name: 'keyword',
              type: 'text',
            },
          ],
        },
        {
          name: 'localKeywords', // Location-specific keywords
          type: 'array',
          fields: [
            {
              name: 'keyword',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
