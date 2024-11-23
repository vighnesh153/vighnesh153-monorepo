import { firestore as firestoreFactory, initializeApp } from "firebase-admin";
import { config } from "@/config.ts";

const app = initializeApp({
  credential: config.firebaseConfig,
});

export const firestore = firestoreFactory(app);
