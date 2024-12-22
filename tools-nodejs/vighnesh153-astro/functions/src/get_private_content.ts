import { firestore } from "firebase-admin";
import * as logger from "firebase-functions/logger";
import { HttpsError, onCall } from "firebase-functions/v2/https";

import { firebaseCollections } from "../../constants";
import { hasPermission } from "../../permissions/mod";

const db = firestore();

export const getPrivateContent = onCall(async (req) => {
  const uid = req.auth?.uid;
  if (!uid) {
    logger.error("You are not logged in.");
    throw new HttpsError("unauthenticated", "Not logged in.");
  }

  if (!hasPermission(uid, "getPrivateContent")) {
    logger.error("You don't have permission to access this resource.");
    throw new HttpsError(
      "permission-denied",
      "You don't have permission to get private content.",
    );
  }

  try {
    const snapshot = await db.collection(firebaseCollections.privateContent)
      .get();
    const docs = await snapshot.docs.map((doc) => doc.data());
    return docs;
  } catch (e) {
    logger.error("Failed to fetch private content:", e);
    throw new HttpsError(
      "internal",
      "Some internal error occurred file fetching private content.",
    );
  }
});
