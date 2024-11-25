// Import the functions you need from the SDKs you need
import { type FirebaseApp, initializeApp } from "firebase/app";
import {
  type Analytics,
  getAnalytics as getFirebaseAnalytics,
  logEvent,
} from "firebase/analytics";
import { getClientStage } from "@vighnesh153/api/client";

import type { AnalyticsEventName } from "./analytics_event_name.ts";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAHxfcAxglveOAq5VfEIGaPAv1-RwOJYX8",
  authDomain: "vighnesh153-production.firebaseapp.com",
  projectId: "vighnesh153-production",
  storageBucket: "vighnesh153-production.firebasestorage.app",
  messagingSenderId: "469621969767",
  appId: "1:469621969767:web:31bd01b8a4113f81e115c2",
  measurementId: "G-MRE4DGGHM9",
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
