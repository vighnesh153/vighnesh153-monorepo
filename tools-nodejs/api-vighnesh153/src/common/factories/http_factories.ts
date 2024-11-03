import {
  createSingletonFactory,
  JsonHttpClient,
  JsonHttpClientImpl,
} from "@vighnesh153/tools";

export const httpClientSingletonFactory = createSingletonFactory<
  JsonHttpClient
>(() => {
  return new JsonHttpClientImpl({
    baseUrl: "",
  });
});
