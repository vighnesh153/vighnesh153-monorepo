import { type FirebaseApp, initializeApp } from "firebase/app";
import {
  type Analytics,
  getAnalytics as getFirebaseAnalytics,
} from "firebase/analytics";
import {
  connectFirestoreEmulator,
  type Firestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import {
  connectFunctionsEmulator,
  type Functions as FirebaseFunctions,
  getFunctions,
  httpsCallable,
} from "firebase/functions";
import {
  connectStorageEmulator,
  type FirebaseStorage,
  getStorage,
} from "firebase/storage";

import { getClientStage } from "./stage.ts";
import { memoize } from "@vighnesh153/tools";
import { functionsRegion } from "../../../constants.ts";

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

// Initialize Firebase App
let app: FirebaseApp;
export async function getOrCreateApp(): Promise<FirebaseApp> {
  if (!app) app = initializeApp(await getFirebaseConfig());
  return app;
}

// Initialize Firebase Analytics
let analytics: Analytics;
export async function getOrCreateAnalytics(): Promise<Analytics> {
  if (!analytics) analytics = getFirebaseAnalytics(await getOrCreateApp());
  return analytics;
}

// Initialize Firebase Firestore
let firestore: Firestore;
export async function getFirestore(): Promise<Firestore> {
  if (!firestore) {
    firestore = initializeFirestore(await getOrCreateApp(), {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
      }),
    });
    if (import.meta.env.DEV) {
      console.log("Picking emulated firestore");
      const emulatorsConf = await getEmulatorsConfig();
      connectFirestoreEmulator(
        firestore,
        "127.0.0.1",
        emulatorsConf.firestore.port,
      );
    }
  }
  return firestore;
}

// Initialize Firebase Storage
let storage: FirebaseStorage;
export async function getOrCreateFirebaseStorage(): Promise<FirebaseStorage> {
  if (!storage) {
    storage = getStorage(await getOrCreateApp());
    if (import.meta.env.DEV) {
      console.log("Picking emulated storage");
      const emulatorsConf = await getEmulatorsConfig();
      connectStorageEmulator(storage, "127.0.0.1", emulatorsConf.storage.port);
    }
  }
  return storage;
}

// Initialize Firebase Functions
let functions: FirebaseFunctions;
export async function getOrCreateFirebaseFunctions(): Promise<
  FirebaseFunctions
> {
  if (!functions) {
    functions = getFunctions(await getOrCreateApp());
    if (import.meta.env.DEV) {
      console.log("Picking emulated functions");
      const emulatorsConf = await getEmulatorsConfig();
      connectFunctionsEmulator(
        functions,
        "127.0.0.1",
        emulatorsConf.functions.port,
      );
    }
  }
  functions.region = functionsRegion;
  return functions;
}
