import { authLoginPaths, onSuccessRedirectPathKey } from '@/constants/authConstants';
import { getAuthServerOrigin } from './getAuthServerOrigin';

export function initiateLoginWithGoogle() {
  localStorage.setItem(onSuccessRedirectPathKey, window.location.toString());
  const loginWithGoogleUrl = getAuthServerOrigin() + authLoginPaths.googleLogin;
  window.location.assign(loginWithGoogleUrl);
}
