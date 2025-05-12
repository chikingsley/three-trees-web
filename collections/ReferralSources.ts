import type { CollectionConfig } from 'payload'

export const ReferralSources: CollectionConfig = {
  slug: 'referral-sources',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['county', 'sourceType', 'isActive'],
    group: 'Program Setup',
    description: 'Specific referral sources combining county and type (e.g., York PPP)'
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'county',
      type: 'relationship',
      relationTo: 'counties',
      required: true,
      admin: {
        description: 'The county this referral source is located in'
      }
    },
    {
      name: 'sourceType',
      type: 'relationship',
      relationTo: 'referral-source-types',
      required: true,
      admin: {
        description: 'The type of referral source (e.g., PPP, DSS, PTI)'
      }
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        hidden: true, // Generated field for display
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            if (siblingData && 'title' in siblingData) {
              delete siblingData['title'];
            }
          }
        ],
        afterRead: [
          async ({ data }) => {
            if (!data) return null;

            let countyName = ''; 
            let sourceAbbreviation = '';

            if (data.county && typeof data.county === 'object' && 'name' in data.county) {
              countyName = data.county.name;
            }

            if (data.sourceType && typeof data.sourceType === 'object' && 'abbreviation' in data.sourceType) {
              sourceAbbreviation = data.sourceType.abbreviation;
            }

            return `${countyName} ${sourceAbbreviation}`;
          }
        ]
      }
    },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        {
          name: 'contactName',
          type: 'text',
          admin: {
            description: 'Primary contact person at this referral source'
          }
        },
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'phone',
          type: 'text',
        }
      ]
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Any special requirements or procedures for this specific referral source'
      }
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Active referral sources can be selected during enrollment'
      }
    }
  ],
}
