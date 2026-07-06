import { beforeUserSignedIn } from "firebase-functions/v2/identity";

export const beforeUserSignIn = beforeUserSignedIn((_) => {
  return;
});
