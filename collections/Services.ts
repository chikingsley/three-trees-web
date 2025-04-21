import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'programType', 'slug', 'updatedAt'],
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
      name: 'title', // Service name
      type: 'text',
      required: true,
    },
    {
      name: 'slug', // URL-friendly version
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'programType', // Reference to parent program type
      type: 'relationship',
      relationTo: 'programTypes',
      required: true,
    },
    {
      name: 'heroImage', // Header image
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'summary', // Short description (for cards)
      type: 'textarea',
      required: true,
    },
    {
      name: 'description', // Full rich text description
      type: 'richText',
      required: true,
    },
    {
      name: 'benefits', // Benefits of this service
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
        },
      ],
    },
    {
      name: 'features', // Features of this service
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
        },
      ],
    },
    {
      name: 'programDetails', // Details about the program
      type: 'group',
      fields: [
        {
          name: 'duration',
          type: 'text',
          required: true,
        },
        {
          name: 'format',
          type: 'array',
          fields: [
            {
              name: 'formatType',
              type: 'text',
            },
          ],
        },
        {
          name: 'schedule',
          type: 'text',
        },
        {
          name: 'certification',
          type: 'text',
        },
        {
          name: 'requirements',
          type: 'array',
          fields: [
            {
              name: 'requirement',
              type: 'text',
            },
          ],
        },
        {
          name: 'pricing',
          type: 'text',
        },
      ],
    },
    {
      name: 'faqs', // Frequently asked questions
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
      name: 'testimonials', // Success stories specific to this service
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
    },
    {
      name: 'relatedServices', // Other services users might be interested in
      type: 'relationship',
      relationTo: 'services', // Self-reference to this collection
      hasMany: true,
    },
    {
      name: 'availability', // Where this service is available
      type: 'group',
      fields: [
        {
          name: 'locations',
          type: 'relationship',
          relationTo: 'locations',
          hasMany: true,
        },
        {
          name: 'notes',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'callToAction', // CTA for this service
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'style',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
          ],
          defaultValue: 'primary',
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
      ],
    },
  ],
}
