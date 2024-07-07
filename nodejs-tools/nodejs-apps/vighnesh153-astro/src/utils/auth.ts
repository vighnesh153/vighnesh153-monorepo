import { authServerOrigins, authPaths, onSuccessRedirectPathKey, type StageType } from '@/constants';

import { stageFactory } from './factories';

export function isProd(stage: StageType = stageFactory()): boolean {
  console.log(`Current stage: ${stage}`);
  return stage === 'prod';
}
export function getAuthServerOrigin(): string {
  if (isProd()) {
    return authServerOrigins.production;
  }
  return authServerOrigins.default;
}

export function initiateLoginWithGoogle() {
  localStorage.setItem(onSuccessRedirectPathKey, window.location.toString());
  const loginWithGoogleUrl = getAuthServerOrigin() + authPaths.login;
  window.location.assign(loginWithGoogleUrl);
}

export async function initiateLogout() {
  localStorage.setItem(onSuccessRedirectPathKey, window.location.toString());
  const logoutUrl = getAuthServerOrigin() + authPaths.logout;
  window.location.assign(logoutUrl);
}
