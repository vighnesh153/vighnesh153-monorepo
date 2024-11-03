import { createSingletonFactory } from "@vighnesh153/tools";
import {
  RandomStringGenerator,
  RandomStringGeneratorImpl,
} from "../random_string_generator";

export const randomStringGeneratorSingletonFactory =
  /* @__PURE__ */ createSingletonFactory<
    RandomStringGenerator
  >(() => {
    return new RandomStringGeneratorImpl();
  });
