import { authLoginPaths, onSuccessRedirectPathKey } from '@/constants/authConstants';
import { getAuthServerOrigin } from './getAuthServerOrigin';

export function initiateLoginWithGoogle() {
  const [, redirectPath] = window.location.toString().split(window.location.origin);
  localStorage.setItem(onSuccessRedirectPathKey, redirectPath);
  const loginWithGoogleUrl = getAuthServerOrigin() + authLoginPaths.googleLogin;
  window.location.assign(loginWithGoogleUrl);
}
