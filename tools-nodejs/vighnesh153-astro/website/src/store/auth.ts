import { onAuthStateChanged } from "firebase/auth";
import { atom, type ReadableAtom } from "nanostores";

import { UserInfo } from "@/models/user_info.ts";
import { getAuth } from "@/utils/firebase_config.ts";
import { getUserById } from "./users.ts";

const mutableLoggedInUser = atom<UserInfo | null>(null);
export const loggedInUser: ReadableAtom<UserInfo | null> = mutableLoggedInUser;

export async function initializeUserInStore() {
  await onAuthStateChanged(await getAuth(), async (user) => {
    if (user === null) {
      mutableLoggedInUser.set(null);
    } else {
      mutableLoggedInUser.set(await getUserById(user.uid));
    }
  });
}
