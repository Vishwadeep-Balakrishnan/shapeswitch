/**
 * Utility functions for safely accessing environment variables with fallbacks
 */

import { z } from 'zod';

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

// Zod schema for environment variables
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  // Required in production – allow empty during local dev for mock APIs
  SHAPESINC_API_KEY: z.string().optional(),
  // Optional keys
  VOICE_API_KEY: z.string().optional(),
  VOICE_API_ENABLED: z.string().optional(),
  ANALYTICS_ENABLED: z.string().optional(),
  SHAPES_API_URL: z.string().url().optional(),
});

const _env = envSchema.parse(process.env);

// Runtime enforcement for SHAPESINC_API_KEY
if (_env.NODE_ENV === 'production' && !_env.SHAPESINC_API_KEY) {
  throw new Error('SHAPESINC_API_KEY environment variable is required in production');
}

if (_env.NODE_ENV === 'development') {
  console.debug('[env] SHAPESINC_API_KEY type:', typeof _env.SHAPESINC_API_KEY);
  console.debug('[env] SHAPESINC_API_KEY value:', _env.SHAPESINC_API_KEY ? `${_env.SHAPESINC_API_KEY.substring(0, 3)}...` : 'undefined');
}

export const ENV = {
  // ——— Keys ———
  SHAPESINC_API_KEY: _env.SHAPESINC_API_KEY ?? '',
  VOICE_API_KEY: _env.VOICE_API_KEY ?? '',

  // ——— Flags ———
  VOICE_ENABLED: ['true', '1', 'yes', 'y'].includes((_env.VOICE_API_ENABLED ?? '').toLowerCase()),
  ANALYTICS_ENABLED: ['true', '1', 'yes', 'y'].includes((_env.ANALYTICS_ENABLED ?? '').toLowerCase()),

  // ——— Endpoints ———
  SHAPES_API_URL: _env.SHAPES_API_URL ?? 'https://api.shapes.inc/v1',

  // ——— Env meta ———
  IS_PRODUCTION: _env.NODE_ENV === 'production',
  IS_DEVELOPMENT: _env.NODE_ENV === 'development',
} as const; 