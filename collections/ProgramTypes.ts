import type { CollectionConfig } from 'payload'

export const ProgramTypes: CollectionConfig = {
  slug: 'programTypes',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Content', // Example group
  },
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'title', // e.g., "Court-Ordered Programs"
      type: 'text',
      required: true,
    },
    {
      name: 'slug', // e.g., "court-ordered-programs"
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      // Add validation/hooks later if needed
    },
    {
      name: 'subtitle', // Optional subtitle
      type: 'text',
    },
    {
      name: 'description', // Rich text description
      type: 'richText',
      required: true,
    },
    {
      name: 'heroImage', // Featured image for overview page
      type: 'upload',
      relationTo: 'media', // Assumes 'media' collection exists
      required: true, // Make required if necessary
    },
    {
      name: 'shortDescription', // Brief summary for cards/previews
      type: 'textarea',
      required: true,
    },
    {
      name: 'icon', // Optional icon reference
      type: 'text',
    },
    // {
    //   name: 'services', // Array of related services
    //   type: 'relationship',
    //   relationTo: 'services', // Assumes 'services' collection exists
    //   hasMany: true,
    //   admin: {
    //     description: 'Services related to this program type',
    //   },
    // },
    {
      name: 'featuredTestimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
    },
    {
      name: 'seo', // SEO metadata group
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
    {
      name: 'callToAction', // Primary CTA group
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
      name: 'additionalContent', // Any additional content sections
      type: 'richText',
    },
  ],
}
