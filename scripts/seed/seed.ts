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
    
    console.log('\nSeeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

runSeed(); 