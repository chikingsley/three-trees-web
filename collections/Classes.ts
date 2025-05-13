import type { CollectionConfig, FieldHook } from 'payload'
import type { Payload } from 'payload'
import type { Program } from '../payload-types'

// Helper function to generate time options
const generateTimeOptions = () => {
  const options = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hour = String(h).padStart(2, '0');
      const minute = String(m).padStart(2, '0');
      const timeValue = `${hour}:${minute}`;
      // Basic AM/PM conversion for label - can be enhanced
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      const ampm = h < 12 || h === 24 ? 'AM' : 'PM';
      const label = `${hour12}:${minute} ${ampm}`;
      options.push({ label: label, value: timeValue });
    }
  }
  return options;
}

// Field Hook to calculate spotsTotal and spotsAvailable
const calculateSpots: FieldHook = async ({ req, data }) => {
  if (!data || !data.program || typeof data.numberOfParallelClasses !== 'number') {
    return { spotsTotal: 0, spotsAvailable: 0 };
  }

  const payload = req.payload as Payload;
  let programDoc: Program | null = null;

  // Check if program is already populated (e.g., after create/update)
  if (typeof data.program === 'object' && data.program?.id) {
    programDoc = data.program as Program;
  } else if (typeof data.program === 'string') {
    // Fetch the program if only the ID is present
    try {
      programDoc = await payload.findByID({
        collection: 'programs',
        id: data.program,
        depth: 0, // Don't need relationships here
      });
    } catch (error) {
      payload.logger.error(`Error fetching program ${data.program} for spot calculation: ${error}`);
    }
  }

  const spotsPerClass = programDoc?.spotsPerClass ?? 0;
  const spotsTotal = data.numberOfParallelClasses * spotsPerClass;

  // Calculate available spots
  const enrolledClientCount = Array.isArray(data.clients) ? data.clients.length : 0;
  const spotsAvailable = Math.max(0, spotsTotal - enrolledClientCount);

  // Return the calculated values. These are added to the document *after* it's read.
  // Important: These should NOT be stored in the DB via beforeChange/beforeValidate
  // as they depend on runtime data (program.spotsPerClass, clients.length).
  return { spotsTotal, spotsAvailable };
}


// Field Hook to generate the identifier
const generateIdentifier: FieldHook = async ({ req, data }) => {
  if (!data || !data.program || !data.day || !data.time || typeof data.numberOfParallelClasses !== 'number') {
    return `Class Block - ${data?.id || 'Unknown ID'}`;
  }

  const payload = req.payload as Payload;
  let programName = String(data.program); // Default to ID

  // Check if program is populated
  if (typeof data.program === 'object' && data.program?.name) {
    programName = data.program.name;
  } else if (typeof data.program === 'string') {
    // Fetch the program if only the ID is present
    try {
      const programDoc = await payload.findByID({
        collection: 'programs',
        id: data.program,
        depth: 0,
      });
      if (programDoc?.name) {
        programName = programDoc.name;
      }
    } catch (error) {
      payload.logger.error(`Error fetching program ${data.program} for identifier generation: ${error}`);
    }
  }

  return `${programName} - ${data.day} ${data.time} (x${data.numberOfParallelClasses})`;
}


export const Classes: CollectionConfig = {
  slug: 'classes', // Renamed slug
  admin: {
    useAsTitle: 'classBlockIdentifier', // Use the virtual field
    defaultColumns: ['classBlockIdentifier', 'spotsAvailable', 'spotsTotal', 'isActive'], // Updated columns
    group: 'Program Setup',
    description: 'Define scheduled blocks of classes for specific programs, days, and times.', // Updated description
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
      relationTo: 'programs', 
      required: true,
      admin: {
        position: 'sidebar',
      }
    },
    {
        name: 'numberOfParallelClasses', // Added field (the multiplier)
        label: 'Number of Parallel Classes',
        type: 'number',
        min: 1,
        required: true,
        defaultValue: 1,
        admin: {
            description: 'How many instances of this class run simultaneously at this time.',
        }
    },
    {
      type: 'row',
      fields: [
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
          admin: { width: '33%' },
        },
        {
          name: 'time', // Changed to select
          type: 'select',
          options: generateTimeOptions(), // Use generated options
          required: true,
          admin: {
            description: 'Start time of the class block.',
            width: '33%',
          }
        },
        {
          name: 'genderSpecific',
          label: 'Gender Specific (optional)',
          type: 'select',
          options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ],
          admin: {
            description: 'Select if this class block is gender-specific.',
            width: '33%',
          }
        },
      ],
    },
    {
      name: 'clients', // Added relationship
      type: 'relationship',
      relationTo: 'clients',
      hasMany: true, // Multiple clients can enroll
      admin: {
        description: 'Clients currently enrolled in this class block.'
      }
    },
    // --- Virtual Fields --- 
    {
        name: 'spotsTotal', 
        type: 'number', 
        admin: { 
            readOnly: true, 
            description: 'Calculated: Number of Parallel Classes * Spots Per Class defined on the Program.'
        }, 
        access: { create: () => false, update: () => false }, // Prevent setting via API
        hooks: {
            afterRead: [calculateSpots], // Calculate after reading data
            beforeChange: [({ siblingData }) => { delete siblingData?.['spotsTotal'] }],
        }
    },
    {
        name: 'spotsAvailable',
        type: 'number',
        admin: { 
            readOnly: true, 
            description: 'Calculated: Spots Total - Number of Enrolled Clients.'
        }, 
        access: { create: () => false, update: () => false }, // Prevent setting via API
        hooks: {
             afterRead: [calculateSpots], // Also calculated by calculateSpots hook
             beforeChange: [({ siblingData }) => { delete siblingData?.['spotsAvailable'] }],
        }
    },
    {
      name: 'classBlockIdentifier', // Virtual field for a better admin list title
      type: 'text',
      admin: {
        hidden: true, // Hidden from direct edit form
      },
      access: { create: () => false, update: () => false }, // Prevent setting via API
      hooks: {
        afterRead: [generateIdentifier],
         // Remove the field before validating/saving
        beforeChange: [({ siblingData }) => { delete siblingData?.['classBlockIdentifier'] }],
      }
    },
    // --- End Virtual Fields ---
    {
      name: 'isActive',
      label: 'Is Class Block Active?',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Active class blocks are available for enrollment selection.'
      }
    }
    // Future: Link to Facilitator(s)
    // {
    //   name: 'facilitators',
    //   type: 'relationship',
    //   relationTo: 'users', // Or a dedicated 'staff' collection
    //   hasMany: true,
    // },
  ],
} 