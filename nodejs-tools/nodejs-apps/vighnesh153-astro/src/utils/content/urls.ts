import { stage } from '../stage';

export const UI_ORIGINS = {
  production: 'https://vighnesh153.dev',
  staging: 'https://staging.vighnesh153.dev',
};

export const API_ORIGINS = {
  production: 'https://prod.api.vighnesh153.dev',
  staging: 'https://dev.api.vighnesh153.dev',
};

const apiOrigin = stage === 'prod' ? API_ORIGINS.production : API_ORIGINS.staging;
export const API_PATHS = {
  // auth
  login: apiOrigin + '/initiateGoogleLogin',
  logout: apiOrigin + '/initiateGoogleLogout',
};
