export const functionsRegion = "us-central1";

export const firebaseCollections = {
  usersByUserId: "users_by_userId",
  userIdByUsername: "userId_by_username",
  privateContent: "private_content",
};

const dayInMillis = 24 * 3600 * 1000;

export const cacheTtlMillis = {
  // max allowed expiration is 7 days in firebase. So, keeping it 6 here so
  // that we can have 1 day buffer
  privateContent: 6 * dayInMillis,
};
