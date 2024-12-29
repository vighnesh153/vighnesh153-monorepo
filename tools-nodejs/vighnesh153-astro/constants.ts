export const functionsRegion = "us-central1";

export const firebaseCollections = {
  usersByUserId: "users_by_userId",
  userIdByUsername: "userId_by_username",
  privateContent: "private_content",
};

const dayInMillis = 24 * 3600 * 1000;

export const cacheTtlMillis = {
  privateContent: 7 * dayInMillis,
};
