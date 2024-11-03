import { createSingletonFactory } from "@vighnesh153/tools";
import {
  AuthTokenGenerator,
  AuthTokenGeneratorImpl,
} from "../auth_token_generator";

export const authTokenGeneratorSingletonFactory =
  /* @__PURE__ */ createSingletonFactory<
    AuthTokenGenerator
  >(() => {
    return new AuthTokenGeneratorImpl();
  });
