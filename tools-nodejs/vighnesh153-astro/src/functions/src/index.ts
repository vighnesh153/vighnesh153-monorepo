/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as logger from "firebase-functions/logger";
import { HttpsError } from "firebase-functions/v2/https";
import { beforeUserCreated } from "firebase-functions/v2/identity";

import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();

function slugify(text: string): string {
  return text.toLowerCase().replace(/ /g, "-").replace(/[-]+/g, "-").replace(
    /[^\w-]+/g,
    "",
  );
}

export const beforecreated = beforeUserCreated(async (event) => {
  const firestore = getFirestore();

  const user = event.data;
  if (!user) {
    logger.info("User info is missing from request.", user);
    throw new HttpsError("invalid-argument", "User info is missing");
  }

  const uid = user?.uid;
  if (!uid) {
    logger.info("uid is missing.", user);
    throw new HttpsError("invalid-argument", "UID is not defined");
  }

  const userInfo = {
    userId: uid,
    username: `${slugify(user.displayName ?? "guest")}-${
      Math.random().toString(16).slice(2)
    }`.toLowerCase(),
    name: user.displayName,
    email: user.email,
    profilePictureUri: user.photoURL,
    createdAtMillis: Date.now(),
  };

  logger.info("Attempting to create user with info=", userInfo);

  await firestore.runTransaction(async (tx) => {
    return tx.create(
      firestore.collection("user_by_user_id").doc(uid),
      userInfo,
    ).create(
      firestore.collection("user_id_by_username").doc(userInfo.username),
      { userId: userInfo.userId },
    );
  }).catch((e) => {
    logger.error("Failed to create user info records:", e);
    throw new HttpsError("internal", "Failed to create user info records!");
  });

  logger.info("User creation complete");
});
