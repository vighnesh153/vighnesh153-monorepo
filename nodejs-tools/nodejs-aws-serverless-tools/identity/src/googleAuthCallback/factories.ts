import { createSingletonFactory } from '@vighnesh153/factory';
import { JsonHttpClient, JsonHttpClientImpl } from '@vighnesh153/http-client';
import { UserInfoDecoder, UserInfoDecoderImpl } from './UserInfoDecoder';
import { ConsoleLogger, Logger } from '@vighnesh153/logger';

export const loggerSingletonFactory = createSingletonFactory<Logger>(() => {
  return ConsoleLogger.getInstance();
});

export const httpClientSingletonFactory = createSingletonFactory<JsonHttpClient>(() => {
  return new JsonHttpClientImpl({
    baseUrl: '',
  });
});

export const userInfoDecoderSingletonFactory = createSingletonFactory<UserInfoDecoder>(() => {
  return new UserInfoDecoderImpl(loggerSingletonFactory());
});
