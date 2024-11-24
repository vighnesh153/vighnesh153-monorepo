import {
  createSingletonFactory,
  type JsonHttpClient,
  JsonHttpClientImpl,
} from "@vighnesh153/tools";

export const jsonHttpClientFactory = createSingletonFactory<JsonHttpClient>(
  () => new JsonHttpClientImpl({ baseUrl: "" }),
);
