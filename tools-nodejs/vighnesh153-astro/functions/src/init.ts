import { initializeApp } from "firebase-admin/app";
import { setGlobalOptions } from "firebase-functions/v2";
import { getStorage } from "firebase-admin/storage";
import { getFirestore } from "firebase-admin/firestore";

import { functionsRegion } from "../../constants";

setGlobalOptions({ maxInstances: 1, region: functionsRegion });

export const app = initializeApp();

export const storageInstance = getStorage(app);

export const firestoreInstance = getFirestore(app);
