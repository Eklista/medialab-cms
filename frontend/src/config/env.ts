interface EnvConfig {
  API_BASE_URL: string;
  API_TIMEOUT: number;
  APP_NAME: string;
  APP_VERSION: string;
  APP_ENV: string;
  AUTH_TOKEN_KEY: string;
  AUTH_REFRESH_KEY: string;
  ENABLE_LOGGING: boolean;
  ENABLE_DEV_TOOLS: boolean;
}

function getEnvVar(key: string, defaultValue?: string): string {
  const value = import.meta.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is required`);
  }
  return value || defaultValue!;
}

function getBooleanEnv(key: string, defaultValue: boolean = false): boolean {
  const value = import.meta.env[key];
  if (!value) return defaultValue;
  return value.toLowerCase() === 'true';
}

function getNumberEnv(key: string, defaultValue?: number): number {
  const value = import.meta.env[key];
  if (!value && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is required`);
  }
  return value ? parseInt(value, 10) : defaultValue!;
}

export const env: EnvConfig = {
  API_BASE_URL: getEnvVar('VITE_API_BASE_URL'),
  API_TIMEOUT: getNumberEnv('VITE_API_TIMEOUT', 10000),
  APP_NAME: getEnvVar('VITE_APP_NAME', 'Medialab CRM'),
  APP_VERSION: getEnvVar('VITE_APP_VERSION', '1.0.0'),
  APP_ENV: getEnvVar('VITE_APP_ENV', 'development'),
  AUTH_TOKEN_KEY: getEnvVar('VITE_AUTH_TOKEN_KEY', 'medialab_auth_token'),
  AUTH_REFRESH_KEY: getEnvVar('VITE_AUTH_REFRESH_KEY', 'medialab_refresh_token'),
  ENABLE_LOGGING: getBooleanEnv('VITE_ENABLE_LOGGING', true),
  ENABLE_DEV_TOOLS: getBooleanEnv('VITE_ENABLE_DEV_TOOLS', true),
};

export const isDevelopment = env.APP_ENV === 'development';
export const isProduction = env.APP_ENV === 'production';