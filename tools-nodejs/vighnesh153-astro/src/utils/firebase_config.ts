// Import the functions you need from the SDKs you need
import {
  type FirebaseApp,
  type FirebaseOptions,
  initializeApp,
} from "firebase/app";
import {
  type Analytics,
  getAnalytics as getFirebaseAnalytics,
  logEvent,
} from "firebase/analytics";

import { stage } from "./stage.ts";
import type { AnalyticsEventName } from "./analytics_event_name.ts";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const devFirebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyD7wJY2h83V6Uge47A7dO9qNnjFvka3zxk",
  authDomain: "vighnesh153-dev.firebaseapp.com",
  projectId: "vighnesh153-dev",
  storageBucket: "vighnesh153-dev.appspot.com",
  messagingSenderId: "496208746312",
  appId: "1:496208746312:web:ed99e5656abc9e8e8b457d",
  measurementId: "G-P9YK4PWTL3",
};

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const prodFirebaseConfig = {
  apiKey: "AIzaSyB1PzqOiV2PQg6FoJaZpA9hAq3CjXYFfdU",
  authDomain: "vighnesh153-prod.firebaseapp.com",
  projectId: "vighnesh153-prod",
  storageBucket: "vighnesh153-prod.appspot.com",
  messagingSenderId: "717598737213",
  appId: "1:717598737213:web:e94b90c2c16e6233cdbb54",
  measurementId: "G-RMNNTH60LS",
};

let firebaseConfig: FirebaseOptions = devFirebaseConfig;
if (stage === "prod") {
  console.log("Switching to production firebase config");
  firebaseConfig = prodFirebaseConfig;
} else {
  console.log("Holding on to dev firebase config");
}

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
  if (extras == null) {
    logEvent(getAnalytics(), eventName);
  } else {
    logEvent(getAnalytics(), eventName, extras);
  }
}
