import { type FirebaseApp, initializeApp } from "firebase/app";
import {
  type Analytics,
  initializeAnalytics,
  logEvent,
} from "firebase/analytics";
import {
  type Auth,
  getAuth as getFirebaseAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  type Firestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { type FirebaseStorage, getStorage } from "firebase/storage";

import type { AnalyticsEventName } from "./analytics_event_name.ts";
import { getClientStage } from "./stage.ts";
import { memoize } from "@vighnesh153/tools";

async function getEmulatorsConfig() {
  return await import("../../../firebase.json").then((mod) => mod.emulators);
}

const getFirebaseConfig = memoize(async function () {
  if (getClientStage() === "local") {
    console.log("picking firebase emulator config");
    const emulatorsConf = await getEmulatorsConfig();
    return {
      apiKey: "12345",
      authDomain: `http://127.0.0.1:${emulatorsConf.auth.port}`,
      projectId: "demo-vighnesh153-app",
      // storageBucket: `http://127.0.0.1:${emulatorsConf.storage.port}`,
      storageBucket: `demo-vighnesh153-app.appspot.com`,
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
});

// Initialize Firebase
let app: FirebaseApp;
let analytics: Analytics;
let firestore: Firestore;
let storage: FirebaseStorage;
async function getApp(): Promise<FirebaseApp> {
  if (!app) app = initializeApp(await getFirebaseConfig());
  return app;
}
async function getAnalytics(): Promise<Analytics> {
  if (!analytics) analytics = initializeAnalytics(await getApp());
  return analytics;
}
export async function getFirestore(): Promise<Firestore> {
  if (!firestore) {
    const localConfig = await getFirebaseConfig();
    firestore = initializeFirestore(await getApp(), {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
      }),
    });
    if (localConfig.projectId.startsWith("demo")) {
      const emulatorsConf = await getEmulatorsConfig();
      (await import("firebase/firestore").then((mod) =>
        mod.connectFirestoreEmulator
      ))(
        firestore,
        "127.0.0.1",
        emulatorsConf.firestore.port,
      );
    }
  }
  return firestore;
}
export async function getFirebaseStorage(): Promise<FirebaseStorage> {
  if (!storage) {
    const localConfig = await getFirebaseConfig();
    storage = getStorage(await getApp());
    if (localConfig.projectId.startsWith("demo")) {
      const emulatorsConf = await getEmulatorsConfig();
      (await import("firebase/storage").then((mod) =>
        mod.connectStorageEmulator
      ))(
        storage,
        "127.0.0.1",
        emulatorsConf.storage.port,
      );
    }
  }
  return storage;
}

// Analytics event logger
export async function logAnalyticsEvent(
  eventName: AnalyticsEventName,
  extras: Record<string, unknown> | null = null,
): Promise<void> {
  if (import.meta.env.DEV) {
    // no-op for local development
    return;
  }
  if (extras == null) {
    logEvent(await getAnalytics(), eventName);
  } else {
    logEvent(await getAnalytics(), eventName, extras);
  }
}

// Google auth provider
let googleAuthProvider: GoogleAuthProvider = new GoogleAuthProvider();
export function getGoogleAuthProvider(): GoogleAuthProvider {
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
export async function getAuth(): Promise<Auth> {
  if (!auth) {
    auth = getFirebaseAuth(await getApp());
    auth.useDeviceLanguage();
  }
  return auth;
}
