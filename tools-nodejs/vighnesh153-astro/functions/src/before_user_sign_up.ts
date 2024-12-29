import * as logger from "firebase-functions/logger";
import { HttpsError } from "firebase-functions/v2/https";
import { beforeUserCreated } from "firebase-functions/v2/identity";

import { firebaseCollections } from "../../constants";
import { firestoreInstance } from "./init";

export const beforeUserSignUp = beforeUserCreated(async (event) => {
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
    profilePictureUrl: user.photoURL,
    createdAtMillis: Date.now(),
  };

  logger.info("Attempting to create user with info=", userInfo);

  await firestoreInstance.runTransaction(async (tx) => {
    return tx.create(
      firestoreInstance.collection(firebaseCollections.usersByUserId).doc(uid),
      userInfo,
    ).create(
      firestoreInstance.collection(firebaseCollections.userIdByUsername).doc(
        userInfo.username,
      ),
      { userId: userInfo.userId, expiresOn: null },
    );
  }).catch((e) => {
    logger.error("Failed to create user info records:", e);
    throw new HttpsError("internal", "Failed to create user info records!");
  });

  logger.info("User creation complete");
});

function slugify(text: string): string {
  return text.toLowerCase().replace(/ /g, "-").replace(/[-]+/g, "-").replace(
    /[^\w-]+/g,
    "",
  );
}
