import type { CookieStoreWrapper } from '@vighnesh153/cookie-store';
import { cookieStoreWrapperFactory, stageFactory } from './factories';
import { cookieKeys } from 'vighnesh153-cookies';
import type { StageType } from '@/constants';

export function initiateLogout(
  cookieStoreWrapper: CookieStoreWrapper = cookieStoreWrapperFactory(),
  stage: StageType = stageFactory()
) {
  const userInfoCookieName = cookieKeys.userInfo(stage);
  cookieStoreWrapper.removeCookie(userInfoCookieName);

  window.location.reload();
}
