import {
  logAnalyticsEvent,
  signInToGoogle,
  signOutFromGoogle,
} from "./firebase_config.ts";

export async function initiateLoginWithGoogle() {
  logAnalyticsEvent("login_initiate");
  await signInToGoogle();
}

export async function initiateLogout() {
  logAnalyticsEvent("logout_initiate");
  await signOutFromGoogle();
}
