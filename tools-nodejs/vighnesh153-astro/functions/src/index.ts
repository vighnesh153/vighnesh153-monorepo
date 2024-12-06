/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as logger from "firebase-functions/logger";
import { setGlobalOptions } from "firebase-functions/v2";
import { HttpsError } from "firebase-functions/v2/https";
import {
  beforeUserCreated,
  beforeUserSignedIn,
} from "firebase-functions/v2/identity";

import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import { firebaseCollections } from "../../constants";

setGlobalOptions({ maxInstances: 2 });

initializeApp();

function slugify(text: string): string {
  return text.toLowerCase().replace(/ /g, "-").replace(/[-]+/g, "-").replace(
    /[^\w-]+/g,
    "",
  );
}

export const createUserRecords = beforeUserCreated(async (event) => {
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

  if (!user.emailVerified) {
    logger.info("email is not verified.", user);
    throw new HttpsError("failed-precondition", "email is not verified");
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
      firestore.collection(firebaseCollections.usersByUserId).doc(uid),
      userInfo,
    ).create(
      firestore.collection(firebaseCollections.userIdByUsername).doc(
        userInfo.username,
      ),
      { userId: userInfo.userId },
    );
  }).catch((e) => {
    logger.error("Failed to create user info records:", e);
    throw new HttpsError("internal", "Failed to create user info records!");
  });

  logger.info("User creation complete");
});

export const updateUserRecords = beforeUserSignedIn(async (event) => {
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

  if (!user.emailVerified) {
    logger.info("email is not verified.", user);
    throw new HttpsError("failed-precondition", "email is not verified");
  }

  const userInfo = {
    name: user.displayName,
    email: user.email,
    profilePictureUri: user.photoURL,
  };

  logger.info("Attempting to sign in user with info=", userInfo);

  await firestore.runTransaction(async (tx) => {
    return tx.update(
      firestore.collection(firebaseCollections.usersByUserId).doc(uid),
      userInfo,
    );
  }).catch((e) => {
    logger.error("Failed to update user info records:", e);
    throw new HttpsError("internal", "Failed to update user info records!");
  });

  logger.info("User sign in complete");
});
