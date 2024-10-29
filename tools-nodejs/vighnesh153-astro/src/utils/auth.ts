import { routes } from "./content/urls.ts";
import { logAnalyticsEvent } from "./firebase_config.ts";

export const onAuthSuccessRedirectPathKey = "on_auth_success_redirect_path";

export function initiateLoginWithGoogle() {
  logAnalyticsEvent("login/initiate");
  localStorage.setItem(
    onAuthSuccessRedirectPathKey,
    window.location.toString(),
  );
  window.location.assign(routes.api.initiateLogin.path);
}

export async function initiateLogout() {
  logAnalyticsEvent("logout/initiate");
  localStorage.setItem(
    onAuthSuccessRedirectPathKey,
    window.location.toString(),
  );
  window.location.assign(routes.api.initiateLogout.path);
}
