import * as logger from "firebase-functions/logger";
import { HttpsError } from "firebase-functions/v2/https";
import { beforeUserSignedIn } from "firebase-functions/v2/identity";

import { getFirestore } from "firebase-admin/firestore";

import { firebaseCollections } from "../../constants";

export const beforeUserSignIn = beforeUserSignedIn(async (event) => {
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
