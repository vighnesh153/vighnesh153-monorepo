import { createSingletonFactory } from '@vighnesh153/factory';
import { JsonHttpClient, JsonHttpClientImpl } from '@vighnesh153/http-client';

export const httpClientSingletonFactory = createSingletonFactory<JsonHttpClient>(() => {
  return new JsonHttpClientImpl({
    baseUrl: '',
  });
});
