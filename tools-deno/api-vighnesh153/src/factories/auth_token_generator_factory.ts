import { createSingletonFactory } from "@vighnesh153/tools";
import {
  AuthTokenGenerator,
  AuthTokenGeneratorImpl,
} from "@/utils/auth_token_generator.ts";

export const authTokenGeneratorFactory = createSingletonFactory<
  AuthTokenGenerator
>(() => new AuthTokenGeneratorImpl());
