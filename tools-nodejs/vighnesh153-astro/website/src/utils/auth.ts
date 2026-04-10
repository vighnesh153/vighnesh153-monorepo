import {
  type Auth,
  getAuth as getFirebaseAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createSnackbar } from "@/store/snackbar.ts";

import { getOrCreateApp } from "./firebase_config.ts";
import { associateUserWithAnalytics, logAnalyticsEvent } from "./analytics.ts";

let auth: Auth;
export async function getOrCreateAuth(): Promise<Auth> {
  if (!auth) {
    auth = getFirebaseAuth(await getOrCreateApp());
    auth.useDeviceLanguage();
  }
  return auth;
}

// Google auth provider
let googleAuthProvider: GoogleAuthProvider = new GoogleAuthProvider();
function getOrCreateGoogleAuthProvider(): GoogleAuthProvider {
  if (!googleAuthProvider) {
    googleAuthProvider = new GoogleAuthProvider();
    googleAuthProvider.addScope(
      "https://www.googleapis.com/auth/userinfo.profile",
    );
    googleAuthProvider.addScope(
      "https://www.googleapis.com/auth/userinfo.email",
    );
  }
  return googleAuthProvider;
}

// Login with Google
export async function initiateLoginWithGoogle() {
  logAnalyticsEvent("login_initiate");
  return signInWithPopup(
    await getOrCreateAuth(),
    getOrCreateGoogleAuthProvider(),
  ).then(
    (res) => {
      associateUserWithAnalytics(res.user.email);
      return res.user;
    },
  ).catch((e) => {
    createSnackbar({
      type: "error",
      message: `Failed to sign in.`,
    });
    console.log(e);
    console.dir(e);
    return null;
  });
}

// Logout
export async function initiateLogout() {
  logAnalyticsEvent("logout_initiate");
  await signOut(await getOrCreateAuth()).then(() => {
    associateUserWithAnalytics(null);
    createSnackbar({
      type: "success",
      message: "Successfully signed out!",
    });
  }).catch((e) => {
    createSnackbar({
      type: "error",
      message: "Failed to sign out.",
    });
    console.log(e);
    console.dir(e);
  });
}
