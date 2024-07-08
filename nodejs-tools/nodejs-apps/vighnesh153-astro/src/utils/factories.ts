import { CookieStoreWrapperImpl, type CookieStoreWrapper } from '@vighnesh153/cookie-store';
import {
  createSingletonFactory,
  type JsonHttpClient,
  JsonHttpClientImpl,
} from '@vighnesh153/tools-platform-independent';

import { type BrowserCookieReader, BrowserCookieReaderImpl } from './BrowserCookieReader';
import { stage } from './stage';

export const cookieStoreWrapperFactory = createSingletonFactory<CookieStoreWrapper>(() => {
  return new CookieStoreWrapperImpl();
});

export const browserCookieReaderFactory = createSingletonFactory<BrowserCookieReader>(() => {
  return new BrowserCookieReaderImpl(stage, cookieStoreWrapperFactory());
});

export const httpClientFactory = createSingletonFactory<JsonHttpClient>(() => {
  return new JsonHttpClientImpl({
    baseUrl: '',
  });
});
