import { slugify } from "@std/text/unstable-slugify";

import { firestoreInstance } from "@/firebase.ts";
import {
  CompleteUserInfo,
  type GoogleOAuthUserInfo,
} from "@/models/user_info.ts";
import type { SimpleRandomStringGenerator } from "@/utils/simple_random_string_generator.ts";
import { SimpleRandomStringGeneratorImpl } from "@/utils/simple_random_string_generator.ts";
import { not } from "@vighnesh153/tools";

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
    private readonly firestore: FirebaseFirestore.Firestore = firestoreInstance,
    private readonly simpleRandomStringGenerator: SimpleRandomStringGenerator =
      new SimpleRandomStringGeneratorImpl(),
  ) {}

  async createOrGetUser(
    oauthUser: GoogleOAuthUserInfo,
  ): Promise<CompleteUserInfo | null> {
    const {
      firestore,
      simpleRandomStringGenerator,
    } = this;

    console.log("Received createOrGetUser request...");

    const txRes = await firestore.runTransaction(async (tx) => {
      // console.log("Fetching user having email:", oauthUser.email);

      // const maybeUser = await tx.get(
      //   this.getUserIdByEmailCollection().doc(oauthUser.email),
      // );

      // if (maybeUser.exists) {
      //   console.log("User already exists. Logging them in..");
      //   return;
      // }

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
      await tx
        .create(
          this.getUserIdByEmailCollection().doc(user.email),
          { userId: user.userId },
        )
        .create(
          this.getUserByUserIdCollection().doc(user.userId),
          user,
        )
        .create(this.getUserIdByUsernameCollection().doc(user.username), {
          userId: user.userId,
        });

      console.log("Created user records successfully.");
    }).catch((e) => e);

    if (
      txRes instanceof Error && not(txRes.message.includes("ALREADY_EXISTS"))
    ) {
      console.log("Some error occurred while creating user:", txRes);
      return null;
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
    return this.firestore.collection(this.collections.userByUserId);
  }

  private getUserIdByEmailCollection(): FirebaseFirestore.CollectionReference {
    return this.firestore.collection(this.collections.userIdByEmail);
  }

  private getUserIdByUsernameCollection(): FirebaseFirestore.CollectionReference {
    return this.firestore.collection(this.collections.userIdByUsername);
  }
}
