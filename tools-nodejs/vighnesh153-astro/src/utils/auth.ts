import {
  initiateGoogleLogin,
  initiateLogout as clientInitiateLogout,
} from "@vighnesh153/api/client";
import { logAnalyticsEvent } from "./firebase_config.ts";

export const onAuthSuccessRedirectPathKey = "on_auth_success_redirect_path";

export function initiateLoginWithGoogle() {
  logAnalyticsEvent("login_initiate");
  localStorage.setItem(
    onAuthSuccessRedirectPathKey,
    window.location.toString(),
  );
  initiateGoogleLogin();
}

export async function initiateLogout() {
  logAnalyticsEvent("logout_initiate");
  localStorage.setItem(
    onAuthSuccessRedirectPathKey,
    window.location.toString(),
  );
  clientInitiateLogout();
}
