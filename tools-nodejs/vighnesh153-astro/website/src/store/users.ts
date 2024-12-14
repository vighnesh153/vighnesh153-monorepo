import { doc, getDoc } from "firebase/firestore";
import ls from "localstorage-slim";

import { milliseconds } from "@vighnesh153/tools";
import { UserInfo } from "@/models/user_info";
import { getFirestore } from "@/utils/firebase_config";
import { firebaseCollections } from "../../../constants";

const cacheKeys = {
  userById: (userId: string) => `vighnesh153/user_by_id/${userId}`,
  userByUsername: (username: string) =>
    `vighnesh153/user_by_username/${username}`,
};

export async function getUserById(
  userId: string | null,
): Promise<UserInfo | null> {
  if (userId === null) {
    return null;
  }
  const maybeCachedUser = ls.get(cacheKeys.userById(userId));
  const parsedCachedUser = parseUserInfo(maybeCachedUser);
  if (parsedCachedUser !== null) {
    console.log("Fetched user from local cache");
    return parsedCachedUser;
  }

  const userFromFirebase = await getFirebaseUserById(userId);
  if (userFromFirebase === null) {
    return null;
  }
  // Cache user info for 7 days
  ls.set(cacheKeys.userById(userId), userFromFirebase, {
    ttl: milliseconds({ days: 7 }) / 1000,
  });
  return userFromFirebase;
}

async function getFirebaseUserById(userId: string): Promise<UserInfo | null> {
  console.log("Fetching user info from firebase with id=", userId);
  const user = await getDoc(
    doc(await getFirestore(), firebaseCollections.usersByUserId, userId),
  );
  if (user.exists()) {
    return parseUserInfo(user.data());
  }
  console.log(
    "Some error occurred while fetching user information from firebase:",
    user,
  );
  return null;
}

function parseUserInfo(maybeUser: unknown): UserInfo | null {
  if (!maybeUser) {
    console.log("Cannot parse falsy user value:", maybeUser);
    return null;
  }

  const parsed = UserInfo.safeParse(maybeUser);
  if (parsed.success) {
    return parsed.data;
  }
  console.log("Failed to parse as user info:", maybeUser);
  console.log("Parsing error:", parsed.error);
  return null;
}
