import { createSingletonFactory } from "@vighnesh153/tools";
import { FirebaseUserRepository, UserRepository } from "@/repositories/mod.ts";

export const userRepositoryFactory = createSingletonFactory<UserRepository>(
  () => new FirebaseUserRepository(),
);
