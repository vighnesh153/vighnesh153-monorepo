// Import the functions you need from the SDKs you need
import { type FirebaseApp, initializeApp } from "firebase/app";
import {
  type Analytics,
  getAnalytics as getFirebaseAnalytics,
  logEvent,
} from "firebase/analytics";
import {
  type Auth,
  getAuth as getFirebaseAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User as FirebaseUser,
} from "firebase/auth";

import { createSnackbar } from "@/store/snackbar.ts";
import type { AnalyticsEventName } from "./analytics_event_name.ts";

const firebaseConfig = await (async () => {
  if (import.meta.env.DEV) {
    console.log("picking firebase emulator config");
    const emulators = await import("../../../firebase.json").then((mod) =>
      mod.emulators
    );
    return {
      apiKey: "12345",
      authDomain: `http://127.0.0.1:${emulators.auth.port}`,
      projectId: "demo-vighnesh153-app",
      storageBucket: `http://127.0.0.1:${emulators.storage.port}`,
      messagingSenderId: "",
      appId: "12345",
      measurementId: "",
    };
  }
  console.log("picking firebase production config");
  return {
    apiKey: "AIzaSyCgaEjjH2_n6GAPZ7VvYDf9iUV52SSqXq4",
    authDomain: "vighnesh153-app.firebaseapp.com",
    projectId: "vighnesh153-app",
    storageBucket: "vighnesh153-app.firebasestorage.app",
    messagingSenderId: "358901652361",
    appId: "1:358901652361:web:46fda03fec43438ee21f58",
    measurementId: "G-K2XNCYWS1E",
  };
})();

// Initialize Firebase
let app: FirebaseApp;
let analytics: Analytics;
function getApp(): FirebaseApp {
  if (!app) app = initializeApp(firebaseConfig);
  return app;
}
function getAnalytics(): Analytics {
  if (!analytics) analytics = getFirebaseAnalytics(getApp());
  return analytics;
}

// Analytics event logger
export function logAnalyticsEvent(
  eventName: AnalyticsEventName,
  extras: Record<string, unknown> | null = null,
): void {
  if (import.meta.env.DEV) {
    // no-op for local development
    return;
  }
  if (extras == null) {
    logEvent(getAnalytics(), eventName);
  } else {
    logEvent(getAnalytics(), eventName, extras);
  }
}

// Google auth provider
let googleAuthProvider: GoogleAuthProvider = new GoogleAuthProvider();
function getGoogleAuthProvider(): GoogleAuthProvider {
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

let auth: Auth;
async function getAuth(): Promise<Auth> {
  if (!auth) {
    auth = getFirebaseAuth(getApp());
    auth.useDeviceLanguage();
  }
  return auth;
}

export async function signInToGoogle(): Promise<FirebaseUser | null> {
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

export async function signOutFromGoogle(): Promise<void> {
  return signOut(await getAuth()).then(() =>
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

export async function initializeAuthChangeListener(
  onUserChange: (user: FirebaseUser | null) => Promise<void>,
) {
  onAuthStateChanged(await getAuth(), (user) => onUserChange(user));
}
