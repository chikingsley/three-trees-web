import type { CollectionConfig } from 'payload';

export const ProgramGroups: CollectionConfig = {
  slug: 'program-groups',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sharedProgramId', 'spotsPerClassInstance'],
    group: 'Program Setup',
    description: 'Define groups of programs that share class slots and capacity.'
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.roles?.includes('admin') ?? false, // Only admins can create
    update: ({ req }) => req.user?.roles?.includes('admin') ?? false, // Only admins can update
    delete: ({ req }) => req.user?.roles?.includes('admin') ?? false, // Only admins can delete
  },
  fields: [
    {
      name: 'name',
      label: 'Group Name',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Descriptive name for the group (e.g., \"Level 1 Programs\")',
      }
    },
    {
      name: 'sharedProgramId',
      label: 'Shared Program ID (for Scheduling)',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'A unique code for this group used in scheduling (e.g., \"L1_SHARED\")',
      }
    },
    {
      name: 'spotsPerClassInstance',
      label: 'Spots Per Single Class Instance',
      type: 'number',
      min: 1,
      required: true,
      defaultValue: 10,
      admin: {
        description: 'Max clients in one class instance belonging to this group.'
      }
    },
    // You could add a relationship back to Programs (hasMany) if you want to see 
    // which programs belong to this group from the group's admin view, but it's not strictly necessary
    // for the primary logic if Programs links to ProgramGroups.
  ],
}; 