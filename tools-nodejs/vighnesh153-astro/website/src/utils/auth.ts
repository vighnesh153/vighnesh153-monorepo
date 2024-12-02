import {
  logAnalyticsEvent,
  signInToGoogle,
  signOutFromGoogle,
} from "./firebase_config.ts";

export function initiateLoginWithGoogle() {
  logAnalyticsEvent("login_initiate");
  signInToGoogle();
}

export async function initiateLogout() {
  logAnalyticsEvent("logout_initiate");
  signOutFromGoogle();
}
