/**
 * Utility functions for safely accessing environment variables with fallbacks
 */

/**
 * Safely get an environment variable with a fallback value
 * @param key The environment variable key
 * @param fallback Optional fallback value if the key is not found
 * @param required If true, will console.warn when the key is missing
 */
export function getEnv(key: string, fallback = '', required = false): string {
  const value = process.env[key];
  
  // Force value to be a string (or fallback if null/undefined)
  if (value === undefined || value === null) {
    if (required && process.env.NODE_ENV === 'production') {
      console.warn(`WARNING: Required environment variable ${key} is not set in production`);
    }
    return String(fallback);
  }
  
  // Ensure it's always returned as a string, even if somehow it's not
  return String(value);
}

/**
 * Check if an environment flag is enabled (true/1/yes)
 * @param key The environment variable key
 * @param defaultValue Default value if not found
 */
export function isEnabled(key: string, defaultValue = false): boolean {
  const value = process.env[key]?.toLowerCase();
  if (value === undefined) return defaultValue;
  return ['true', '1', 'yes', 'y'].includes(value);
}

// Validate SHAPESINC_API_KEY specifically
const apiKey = process.env.SHAPESINC_API_KEY;
if (apiKey === undefined) {
  console.warn('⚠️ WARNING: SHAPESINC_API_KEY environment variable is not set. API calls will use mock data.');
} else if (typeof apiKey !== 'string') {
  console.error('🚨 ERROR: SHAPESINC_API_KEY must be a string. Current type:', typeof apiKey);
} else if (apiKey.trim() === '') {
  console.warn('⚠️ WARNING: SHAPESINC_API_KEY is empty. API calls will use mock data.');
} else if (apiKey.includes('placeholder') || apiKey.includes('your_api_key')) {
  console.warn('⚠️ WARNING: SHAPESINC_API_KEY appears to be a placeholder value. API calls may fail.');
}

// Common environment variables used across the application
export const ENV = {
  // API Keys
  SHAPESINC_API_KEY: String(getEnv('SHAPESINC_API_KEY', '', true)),
  VOICE_API_KEY: String(getEnv('VOICE_API_KEY', '')),
  
  // Feature flags
  VOICE_ENABLED: Boolean(isEnabled('VOICE_API_ENABLED', false)),
  ANALYTICS_ENABLED: Boolean(isEnabled('ANALYTICS_ENABLED', false)),
  
  // API endpoints
  SHAPES_API_URL: String(getEnv('SHAPES_API_URL', 'https://api.shapes.inc/v1')),
  
  // Environment detection
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
}; 