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
  
  if (!value) {
    if (required && process.env.NODE_ENV === 'production') {
      console.warn(`WARNING: Required environment variable ${key} is not set in production`);
    }
    return fallback;
  }
  
  return value;
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

// Common environment variables used across the application
export const ENV = {
  // API Keys
  SHAPESINC_API_KEY: getEnv('SHAPESINC_API_KEY', '', true),
  VOICE_API_KEY: getEnv('VOICE_API_KEY', ''),
  
  // Feature flags
  VOICE_ENABLED: isEnabled('VOICE_API_ENABLED', false),
  ANALYTICS_ENABLED: isEnabled('ANALYTICS_ENABLED', false),
  
  // API endpoints
  SHAPES_API_URL: getEnv('SHAPES_API_URL', 'https://api.shapes.inc/v1'),
  
  // Environment detection
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
}; 