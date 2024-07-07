import { cookieKeys } from 'vighnesh153-cookies';
import type { CookieStoreWrapper } from '@vighnesh153/cookie-store';

import { authServerOrigins, authLoginPaths, onSuccessRedirectPathKey, type StageType } from '@/constants';

import { cookieStoreWrapperFactory, stageFactory } from './factories';

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
  const loginWithGoogleUrl = getAuthServerOrigin() + authLoginPaths.googleLogin;
  window.location.assign(loginWithGoogleUrl);
}

export function initiateLogout(
  cookieStoreWrapper: CookieStoreWrapper = cookieStoreWrapperFactory(),
  stage: StageType = stageFactory()
) {
  const userInfoCookieName = cookieKeys.userInfo(stage);
  cookieStoreWrapper.removeCookie(userInfoCookieName);

  window.location.reload();
}
