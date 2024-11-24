import { slugify } from "@std/text/unstable-slugify";

import { firestore as firestoreInstance } from "@/firebase.ts";
import { CompleteUserInfo, GoogleOAuthUserInfo } from "@/models/user_info.ts";
import { SimpleRandomStringGenerator } from "@/utils/simple_random_string_generator.ts";
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
    private readonly firestore: FirebaseFirestore.Firestore = firestoreInstance,
    private readonly simpleRandomStringGenerator: SimpleRandomStringGenerator =
      new SimpleRandomStringGeneratorImpl(),
  ) {}

  async createOrGetUser(
    oauthUser: GoogleOAuthUserInfo,
  ): Promise<CompleteUserInfo | null> {
    const {
      firestore,
      getUserByUserIdCollection,
      getUserIdByEmailCollection,
      getUserIdByUsernameCollection,
      simpleRandomStringGenerator,
    } = this;

    const txRes = await firestore.runTransaction(async (tx) => {
      console.log("Fetching user having email:", oauthUser.email);

      const maybeUser = await tx.get(
        getUserIdByEmailCollection().doc(oauthUser.email),
      );

      if (maybeUser.exists) {
        console.log("User already exists. Logging them in..");
        return;
      }

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
          getUserByUserIdCollection().doc(user.userId),
          user,
        )
        .create(
          getUserIdByEmailCollection().doc(user.email),
          { userId: user.userId },
        )
        .create(getUserIdByUsernameCollection().doc(user.username), {
          username: user.username,
        });

      console.log("Created user records successfully.");
    }).catch((e) => e);

    if (txRes instanceof Error) {
      console.log("Some error occurred while creating user:", txRes);
      return null;
    }

    try {
      console.log("Fetching user id...");
      const userId = await getUserIdByEmailCollection().doc(oauthUser.email)
        .get();

      console.log("Fetching user user for userId:", userId);
      const user = await getUserByUserIdCollection().doc(
        userId.data()?.userId ?? "",
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
