import { SquareClient, SquareEnvironment } from 'square';

// JWT Configuration
export const ENROLLMENT_JWT_SECRET = process.env.ENROLLMENT_JWT_SECRET || 'your-fallback-enrollment-secret-key-for-dev';
export const ENROLLMENT_JWT_EXPIRES_IN = '1h';

// Square Configuration
export const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
export const SQUARE_LOCATION_ID = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
export const SQUARE_AUTOPAY_WEEKLY_PLAN_ID = process.env.SQUARE_AUTOPAY_WEEKLY_PLAN_ID; // Ensure this is in your .env

const SQUARE_ENV_FOR_SDK = process.env.SQUARE_ENVIRONMENT?.toLowerCase() === 'production'
    ? SquareEnvironment.Production
    : SquareEnvironment.Sandbox;

export let squareClient: SquareClient | null = null;

if (SQUARE_ACCESS_TOKEN && SQUARE_LOCATION_ID) {
    try {
        squareClient = new SquareClient({
            token: SQUARE_ACCESS_TOKEN,
            environment: SQUARE_ENV_FOR_SDK,
        });
        // console.log('Square SDK Client initialized from config.ts'); // Optional debug log
    } catch (e) {
        console.error('Failed to initialize Square SDK Client in config.ts:', e);
    }
} else {
    const missing = [];
    if (!SQUARE_ACCESS_TOKEN) missing.push('SQUARE_ACCESS_TOKEN');
    if (!SQUARE_LOCATION_ID) missing.push('SQUARE_LOCATION_ID');
    console.warn(`Square SDK client not initialized. Missing: ${missing.join(', ')}. Payment processing disabled.`);
}