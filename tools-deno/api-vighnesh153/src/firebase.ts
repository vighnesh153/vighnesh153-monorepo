import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { config } from "@/config.ts";

const app = initializeApp({
  credential: cert(config.firebaseConfig),
});

export const firestoreInstance = getFirestore(app);
