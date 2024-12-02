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
import { getClientStage } from "@vighnesh153/api/client";

import type { AnalyticsEventName } from "./analytics_event_name.ts";
import { createSnackbar } from "@/store/snackbar.ts";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCgaEjjH2_n6GAPZ7VvYDf9iUV52SSqXq4",
  authDomain: "vighnesh153-app.firebaseapp.com",
  projectId: "vighnesh153-app",
  storageBucket: "vighnesh153-app.firebasestorage.app",
  messagingSenderId: "358901652361",
  appId: "1:358901652361:web:46fda03fec43438ee21f58",
  measurementId: "G-K2XNCYWS1E",
};

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
  if (getClientStage() === "local") {
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
function getAuth(): Auth {
  if (!auth) {
    auth = getFirebaseAuth(getApp());
    auth.useDeviceLanguage();
  }
  return auth;
}

export function signInToGoogle(): Promise<FirebaseUser | null> {
  return signInWithPopup(getAuth(), getGoogleAuthProvider()).then((res) =>
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
  return signOut(getAuth()).then(() =>
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

export function initializeAuthChangeListener(
  onUserChange: (user: FirebaseUser | null) => Promise<void>,
) {
  onAuthStateChanged(getAuth(), (user) => onUserChange(user));
}
