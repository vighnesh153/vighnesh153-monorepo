import { routes } from "./content/urls.ts";
import { logAnalyticsEvent } from "./firebase_config.ts";

export const onAuthSuccessRedirectPathKey = "on_auth_success_redirect_path";

export function initiateLoginWithGoogle() {
  logAnalyticsEvent("login_initiate");
  localStorage.setItem(
    onAuthSuccessRedirectPathKey,
    window.location.toString(),
  );
  window.location.assign(routes.api.initiateGoogleLogin.path);
}

export async function initiateLogout() {
  logAnalyticsEvent("logout_initiate");
  localStorage.setItem(
    onAuthSuccessRedirectPathKey,
    window.location.toString(),
  );
  window.location.assign(routes.api.initiateLogout.path);
}
