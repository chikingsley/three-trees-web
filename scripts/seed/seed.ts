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
      console.error(`Error creating ${collectionSlug} item:`, item, error);
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
    await seedCollection(payload, 'programs', 'programs.json', 'programId');
    await seedClasses(payload);
    console.log('\nSeeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
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
        depth: 0, // We only need the ID
      });

      if (programDocs.docs.length === 0) {
        console.warn(`Warning: Program with programId '${item.programId}' not found. Skipping class:`, item);
        skippedCount++;
        continue;
      }
      const programActualId = programDocs.docs[0].id;

      // Check if a similar class block already exists (program, day, time, genderSpecific)
      const existingClass = await payload.find({
        collection: 'classes',
        where: {
          program: { equals: programActualId },
          day: { equals: item.day },
          time: { equals: item.time },
          ...(item.genderSpecific && { genderSpecific: { equals: item.genderSpecific } }),
          // If genderSpecific is not in item, don't include it in the query
          // or ensure it matches documents where genderSpecific is null or not set.
          // For simplicity here, if item.genderSpecific is undefined, we are looking for classes
          // where genderSpecific is also not set or null.
          // A more robust check might be needed if genderSpecific: null has a different meaning than undefined.
        },
        limit: 1,
        depth: 0,
      });

      if (existingClass.docs.length > 0) {
        console.log(`Skipping existing class block: ${item.programId} ${item.day} ${item.time}`);
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
          program: programActualId, // Use the actual ID for the relationship
          clients: [], // Initialize with empty clients array
        },
      });
      createdCount++;
    } catch (error) {
      console.error(`Error creating classes item:`, item, error);
    }
  }
  console.log(`Seeded ${createdCount} classes. Skipped ${skippedCount} existing or unlinked.`);
}

runSeed(); 