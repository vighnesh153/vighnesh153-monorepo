import {
  createSingletonFactory,
  type JsonHttpClient,
  JsonHttpClientImpl,
} from "@vighnesh153/tools";

export const httpClientFactory = createSingletonFactory<JsonHttpClient>(() => {
  return new JsonHttpClientImpl({
    baseUrl: "",
  });
});
