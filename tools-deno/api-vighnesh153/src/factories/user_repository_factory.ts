import { createSingletonFactory } from "@vighnesh153/tools";
import {
  FirebaseUserRepository,
  type UserRepository,
} from "@/repositories/mod.ts";

export const userRepositoryFactory = createSingletonFactory<UserRepository>(
  () => new FirebaseUserRepository(),
);
