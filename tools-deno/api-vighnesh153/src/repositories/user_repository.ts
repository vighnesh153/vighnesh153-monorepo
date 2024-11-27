import { assert } from "@std/assert";
import { slugify } from "@std/text/unstable-slugify";

import { not } from "@vighnesh153/tools";

import { FirestoreInstance } from "@/firebase.ts";
import {
  CompleteUserInfo,
  type GoogleOAuthUserInfo,
} from "@/models/user_info.ts";
import type { SimpleRandomStringGenerator } from "@/utils/simple_random_string_generator.ts";
import { SimpleRandomStringGeneratorImpl } from "@/utils/simple_random_string_generator.ts";

export interface UserRepository {
  createOrGetUser(
    oauthUser: GoogleOAuthUserInfo,
  ): Promise<CompleteUserInfo | null>;
}

export class FirebaseUserRepository implements UserRepository {
  private collections = {
    userByUserId: "user_by_user_id",
    userIdByEmail: "user_id_by_email",
    userIdByUsername: "user_id_by_username",
  };

  constructor(
    private readonly simpleRandomStringGenerator: SimpleRandomStringGenerator =
      new SimpleRandomStringGeneratorImpl(),
  ) {}

  async createOrGetUser(
    oauthUser: GoogleOAuthUserInfo,
  ): Promise<CompleteUserInfo | null> {
    const firestore = FirestoreInstance.getFirestoreInstance();
    const { simpleRandomStringGenerator } = this;

    console.log("Received createOrGetUser request...");

    try {
      const userId = `${
        slugify(oauthUser.name)
      }-${simpleRandomStringGenerator.generate()}`.toLowerCase();
      const user: CompleteUserInfo = {
        userId,
        username: userId,
        name: oauthUser.name,
        email: oauthUser.email,
        profilePictureUrl: oauthUser.picture,
        createdAtMillis: Date.now(),
      };

      console.log("Attempting to create user records...");

      // use transaction
      await firestore.runTransaction(async (tx) => {
        await tx.create(
          this.getUserIdByEmailCollection().doc(user.email),
          { userId: user.userId },
        );
        await tx.create(
          this.getUserByUserIdCollection().doc(user.userId),
          user,
        );
        await tx.create(
          this.getUserIdByUsernameCollection().doc(user.username),
          { userId: user.userId },
        );
      });

      console.log("Successfully created user records...");
    } catch (e) {
      if (not(e instanceof Error)) {
        console.log("Some unknown error occurred:", e);
        return null;
      }

      assert(e instanceof Error);

      if (not(e.message.includes("ALREADY_EXISTS"))) {
        console.log("Some error occurred while creating user:", e);
        return null;
      }

      console.log("User already exists... Proceeding to next step.");
    }

    try {
      console.log("Fetching user id...");
      const userId = (await this.getUserIdByEmailCollection().doc(
        oauthUser.email,
      )
        .get()).data()?.userId;

      console.log("Fetching user for userId:", userId);
      const user = await this.getUserByUserIdCollection().doc(
        userId ?? "",
      ).get();

      const parsedUser = CompleteUserInfo.safeParse(user.data());
      if (parsedUser.success) {
        console.log("Successfully parsed user:", parsedUser.data);
        return parsedUser.data;
      }

      console.log("Failed to parse completeUserInfo:", parsedUser.error.errors);
      return null;
    } catch (e) {
      console.log(
        "Some error occurred while getting user info for logging in:",
        e,
      );
      return null;
    }
  }

  private getUserByUserIdCollection(): FirebaseFirestore.CollectionReference {
    return FirestoreInstance.getFirestoreInstance().collection(
      this.collections.userByUserId,
    );
  }

  private getUserIdByEmailCollection(): FirebaseFirestore.CollectionReference {
    return FirestoreInstance.getFirestoreInstance().collection(
      this.collections.userIdByEmail,
    );
  }

  private getUserIdByUsernameCollection(): FirebaseFirestore.CollectionReference {
    return FirestoreInstance.getFirestoreInstance().collection(
      this.collections.userIdByUsername,
    );
  }
}
