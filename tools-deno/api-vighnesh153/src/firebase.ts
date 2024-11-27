import "https://deno.land/x/xhr@0.1.1/mod.ts";

import { type App, cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import {} from "firebase-admin";
import { config } from "@/config.ts";

class FirebaseApp {
  private static app: App | null = null;

  static getApp(): App {
    if (FirebaseApp.app === null) {
      FirebaseApp.app = initializeApp({
        credential: cert(config.firebaseConfig),
      });
    }
    return FirebaseApp.app!;
  }
}

export class FirestoreInstance {
  private static firestoreInstance: FirebaseFirestore.Firestore | null = null;

  static getFirestoreInstance(): FirebaseFirestore.Firestore {
    if (FirestoreInstance.firestoreInstance === null) {
      FirestoreInstance.firestoreInstance = getFirestore(FirebaseApp.getApp());
    }
    return FirestoreInstance.firestoreInstance;
  }
}
