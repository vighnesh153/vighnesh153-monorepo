import { routes } from './content/urls';

export const onAuthSuccessRedirectPathKey = 'on_auth_success_redirect_path';

export function initiateLoginWithGoogle() {
  localStorage.setItem(onAuthSuccessRedirectPathKey, window.location.toString());
  window.location.assign(routes.api.initiateLogin.path);
}

export async function initiateLogout() {
  localStorage.setItem(onAuthSuccessRedirectPathKey, window.location.toString());
  window.location.assign(routes.api.initiateLogout.path);
}
