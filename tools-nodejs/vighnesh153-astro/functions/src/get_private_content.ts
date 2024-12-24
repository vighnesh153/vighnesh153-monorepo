import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import * as logger from "firebase-functions/logger";
import { HttpsError, onCall } from "firebase-functions/v2/https";

import { firebaseCollections } from "../../constants";
import { hasPermission } from "../../permissions/mod";

const db = getFirestore();
const storage = getStorage();

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

    return Promise.all(docs.map(async (doc) => ({
      ...doc,
      imageUrl: await createReadSignedUrl(doc.internalImagePath),
      videoUrl: await createReadSignedUrl(doc.internalVideoPath),
    })));
  } catch (e) {
    logger.error("Failed to fetch private content:", e);
    throw new HttpsError(
      "internal",
      "Some internal error occurred file fetching private content.",
    );
  }
});

const dayInMs = 24 * 3600 * 1000;

async function createReadSignedUrl(
  internalPath: string,
): Promise<string | null> {
  const file = storage.bucket().file(internalPath);
  const expirationDate = new Date(Date.now() + dayInMs * 2);

  // https://github.com/firebase/firebase-tools/issues/3400#issuecomment-847916638
  if (process.env.FUNCTIONS_EMULATOR) {
    return internalPath.startsWith("http") ? internalPath : file.publicUrl();
  }

  try {
    const urls = await file.getSignedUrl({
      version: "v4",
      action: "read",
      expires: expirationDate,
      extensionHeaders: {
        "cache-control": `max-age=${dayInMs * 365 / 1000}`,
      },
    });
    return urls[0];
  } catch (e) {
    logger.error("Some error occurred while creating read signed url:", e);
    return null;
  }
}
