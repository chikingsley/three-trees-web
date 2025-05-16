/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path';
import fs from 'fs';
import { getPayload } from 'payload';
import type { Payload } from 'payload';

// Adjust the path to your Payload config as needed
import configPromise from '@/payload.config';

/**
 * Seeds data for a specific collection from a JSON file.
 * @param payload The Payload instance
 * @param collectionSlug The slug of the collection to seed (string, will be asserted)
 * @param jsonPath Relative path to the JSON data file within scripts/seed/data/
 * @param keyField Optional field name to check for existing documents (e.g., 'name' or 'email')
 */
async function seedCollection(
  payload: Payload,
  collectionSlug: string,
  jsonPath: string,
  keyField?: string,
) {
  const dataFilePath = path.resolve(__dirname, 'data', jsonPath);
  console.log(`\n--- Seeding ${collectionSlug} from ${jsonPath} ---`);

  if (!fs.existsSync(dataFilePath)) {
    console.warn(`Warning: Data file not found at ${dataFilePath}. Skipping ${collectionSlug}.`);
    return;
  }

  let dataToSeed;
  try {
    const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
    dataToSeed = JSON.parse(jsonData);
    if (!Array.isArray(dataToSeed)) {
        console.error(`Error: Expected an array in ${jsonPath}, but got ${typeof dataToSeed}. Skipping.`);
        return;
    }
  } catch (e) {
    console.error(`Error reading or parsing ${dataFilePath}:`, e);
    return;
  }

  let createdCount = 0;
  let skippedCount = 0;

  for (const item of dataToSeed) {
    try {
        if (keyField && (item as any)[keyField]) {
            const existing = await payload.find({
                collection: collectionSlug as any,
                where: { [keyField]: { equals: (item as any)[keyField] } },
                limit: 1,
                depth: 0,
            });
            if (existing.docs.length > 0) {
                skippedCount++;
                continue;
            }
        }

        await payload.create({
            collection: collectionSlug as any,
            data: item as any,
        });
        createdCount++;

    } catch (error) {
      console.error(`Error creating ${collectionSlug} item:`, JSON.stringify(item, null, 2), error);
    }
  }

  console.log(`Seeded ${createdCount} ${collectionSlug}. Skipped ${skippedCount} existing.`);
}

/**
 * Main seed function.
 */
async function runSeed() {
  console.log('Initializing Payload for seeding...');
  let payload: Payload;

  try {
    payload = await getPayload({ config: configPromise });
    console.log('Payload initialized.');
  } catch (e) {
    console.error('Error initializing Payload:', e);
    process.exit(1);
  }

  try {
    await seedCollection(payload, 'counties', 'counties.json', 'name');
    await seedCollection(payload, 'referral-source-types', 'referral-source-types.json', 'name');
    await seedCollection(payload, 'program-groups', 'program-groups.json', 'sharedProgramId');
    await seedPrograms(payload);
    await seedClasses(payload);

    // TODO: Add seeding for clients
    // TODO: Add seeding for referral sources
    // TODO: Add seeding for services
    // TODO: Add seeding for testimonials
    // TODO: Add seeding for users
    // TODO: Add seeding for media
    // TODO: Add seeding for blog posts
    
    console.log('\nSeeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

// New function to seed Programs with ProgramGroup ID lookup
async function seedPrograms(payload: Payload) {
  const dataFilePath = path.resolve(__dirname, 'data', 'programs.json');
  console.log(`\n--- Seeding programs from programs.json ---`);

  if (!fs.existsSync(dataFilePath)) {
    console.warn(`Warning: Data file not found at ${dataFilePath}. Skipping programs.`);
    return;
  }

  let dataToSeed;
  try {
    const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
    dataToSeed = JSON.parse(jsonData);
    if (!Array.isArray(dataToSeed)) {
      console.error(`Error: Expected an array in programs.json, but got ${typeof dataToSeed}. Skipping.`);
      return;
    }
  } catch (e) {
    console.error(`Error reading or parsing ${dataFilePath}:`, e);
    return;
  }

  let createdCount = 0;
  let skippedCount = 0;

  for (const item of dataToSeed as any[]) {
    try {
      // Check if program already exists by programId
      const existingProgram = await payload.find({
        collection: 'programs',
        where: { programId: { equals: item.programId } },
        limit: 1,
        depth: 0,
      });

      if (existingProgram.docs.length > 0) {
        skippedCount++;
        continue;
      }

      // Find the ProgramGroup document by its sharedProgramId field
      if (!item.programGroupSharedId) {
        console.warn(`Warning: Program item missing programGroupSharedId. Skipping program:`, item);
        skippedCount++;
        continue;
      }

      const programGroupDocs = await payload.find({
        collection: 'program-groups',
        where: { sharedProgramId: { equals: item.programGroupSharedId } },
        limit: 1,
        depth: 0, // We only need the ID
      });

      if (programGroupDocs.docs.length === 0) {
        console.warn(`Warning: ProgramGroup with sharedProgramId '${item.programGroupSharedId}' not found for program '${item.programId}'. Skipping program:`, item);
        skippedCount++;
        continue;
      }
      const programGroupId = programGroupDocs.docs[0].id;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { programGroupSharedId, ...programData } = item;

      await payload.create({
        collection: 'programs' as any,
        data: {
          ...programData,
          programGroup: programGroupId, // Use the actual ID for the relationship
        },
      });
      createdCount++;
    } catch (error) {
      console.error(`Error creating programs item:`, JSON.stringify(item, null, 2), error);
    }
  }
  console.log(`Seeded ${createdCount} programs. Skipped ${skippedCount} existing or unlinked.`);
}

// New function to seed Classes with Program ID lookup
async function seedClasses(payload: Payload) {
  const dataFilePath = path.resolve(__dirname, 'data', 'classes.json');
  console.log(`\n--- Seeding classes from classes.json ---`);

  if (!fs.existsSync(dataFilePath)) {
    console.warn(`Warning: Data file not found at ${dataFilePath}. Skipping classes.`);
    return;
  }

  let dataToSeed;
  try {
    const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
    dataToSeed = JSON.parse(jsonData);
    if (!Array.isArray(dataToSeed)) {
      console.error(`Error: Expected an array in classes.json, but got ${typeof dataToSeed}. Skipping.`);
      return;
    }
  } catch (e) {
    console.error(`Error reading or parsing ${dataFilePath}:`, e);
    return;
  }

  let createdCount = 0;
  let skippedCount = 0;

  for (const item of dataToSeed as any[]) {
    try {
      // Find the Program document by its programId field
      const programDocs = await payload.find({
        collection: 'programs',
        where: { programId: { equals: item.programId } },
        limit: 1,
        depth: 1, // We need to populate programGroup
      });

      if (programDocs.docs.length === 0) {
        console.warn(`Warning: Program with programId '${item.programId}' not found. Skipping class:`, JSON.stringify(item, null, 2));
        skippedCount++;
        continue;
      }
      // const programActualId = programDocs.docs[0].id; // This was the Program ID

      const programDoc = programDocs.docs[0];
      if (!programDoc.programGroup || typeof programDoc.programGroup !== 'object' || !programDoc.programGroup.id) {
         if (typeof programDoc.programGroup === 'string') { // It might be an ID string if depth didn't populate
            // If it's a string, assume it's the ID and try to use it.
            // This case implies depth: 1 didn't populate the object fully as expected,
            // or programGroup is stored as just an ID.
             console.warn(`Warning: programGroup for Program '${item.programId}' is an ID string. Using it directly. This may indicate an issue with population or data structure.`);

         } else {
            console.warn(`Warning: Program '${item.programId}' does not have a valid populated programGroup or programGroup.id. Skipping class:`, JSON.stringify(item, null, 2));
            console.warn(`Program document details: programGroup is '${typeof programDoc.programGroup}', value: ${JSON.stringify(programDoc.programGroup)}`);
            skippedCount++;
            continue;
        }
      }
      
      const programGroupId = (typeof programDoc.programGroup === 'string') ? programDoc.programGroup : programDoc.programGroup.id;


      // Check if a similar class block already exists (programGroup, day, time, genderSpecific)
      const existingClass = await payload.find({
        collection: 'classes',
        where: {
          programGroup: { equals: programGroupId }, // Check against the ProgramGroup ID
          day: { equals: item.day },
          time: { equals: item.time },
          ...(item.genderSpecific ? { genderSpecific: { equals: item.genderSpecific } } : { genderSpecific: { exists: false } }),
        },
        limit: 1,
        depth: 0,
      });

      if (existingClass.docs.length > 0) {
        // console.log(`Skipping existing class block: PG '${programGroupId}' ${item.day} ${item.time}`);
        skippedCount++;
        continue;
      }
      
      // const { programId, ...classData } = item; // programId already used for lookup
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { programId: _, ...classData } = item; // Destructure to omit programId from classData

      await payload.create({
        collection: 'classes' as any,
        data: {
          ...classData,
          programGroup: programGroupId, // Use the ProgramGroup ID for the relationship
          clients: [], // Initialize with empty clients array
        },
      });
      createdCount++;
    } catch (error) {
      console.error(`Error creating classes item:`, JSON.stringify(item, null, 2), error);
    }
  }
  console.log(`Seeded ${createdCount} classes. Skipped ${skippedCount} existing or unlinked.`);
}

runSeed(); 