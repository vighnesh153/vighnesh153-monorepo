import { signInWithPopup, signOut } from "firebase/auth";

import { createSnackbar } from "@/store/snackbar.ts";

import {
  getAuth,
  getGoogleAuthProvider,
  logAnalyticsEvent,
} from "./firebase_config.ts";

export async function initiateLoginWithGoogle() {
  logAnalyticsEvent("login_initiate");
  return signInWithPopup(await getAuth(), getGoogleAuthProvider()).then((res) =>
    res.user
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

export async function initiateLogout() {
  logAnalyticsEvent("logout_initiate");
  await signOut(await getAuth()).then(() =>
    createSnackbar({
      type: "success",
      message: "Successfully signed out!",
    })
  ).catch((e) => {
    createSnackbar({
      type: "error",
      message: "Failed to sign out.",
    });
    console.log(e);
    console.dir(e);
  });
}
