// Import the functions you need from the SDKs you need
import { type FirebaseOptions, initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

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
  firebaseConfig = prodFirebaseConfig;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export function logAnalyticsEvent(
  eventName: AnalyticsEventName,
  extras: Record<string, unknown> | null = null,
): void {
  if (extras == null) {
    logEvent(analytics, eventName);
  } else {
    logEvent(analytics, eventName, extras);
  }
}
