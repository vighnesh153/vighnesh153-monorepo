import { atom, type ReadableAtom } from "nanostores";

import type { CompleteUserInfo } from "@vighnesh153/api/models";

import { initializeAuthChangeListener } from "@/utils/firebase_config.ts";

const mutableLoggedInUser = atom<CompleteUserInfo | null>(null);
export const loggedInUser: ReadableAtom<CompleteUserInfo | null> =
  mutableLoggedInUser;

export function initializeUserInStore() {
  initializeAuthChangeListener(async (user) => {
    // TODO: fetch user info from firebase
    if (user === null) {
      mutableLoggedInUser.set(null);
    } else {
      mutableLoggedInUser.set({
        name: user.displayName ?? "Guest",
        email: user.email ?? "email@email.com",
        createdAtMillis: Date.now(),
        userId: user.uid,
        profilePictureUrl: user.photoURL ?? "",
        username: "dawg",
      });
    }
  });
}
