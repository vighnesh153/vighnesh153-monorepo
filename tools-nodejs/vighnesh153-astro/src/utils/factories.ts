import {
  type CookieStoreWrapper,
  CookieStoreWrapperImpl,
} from "@vighnesh153/tools-browser";
import {
  createSingletonFactory,
  type JsonHttpClient,
  JsonHttpClientImpl,
} from "@vighnesh153/tools";

import {
  type BrowserCookieReader,
  BrowserCookieReaderImpl,
} from "./BrowserCookieReader.ts";
import { stage } from "./stage.ts";

export const cookieStoreWrapperFactory = createSingletonFactory<
  CookieStoreWrapper
>(() => {
  return new CookieStoreWrapperImpl();
});

export const browserCookieReaderFactory = createSingletonFactory<
  BrowserCookieReader
>(() => {
  return new BrowserCookieReaderImpl(stage, cookieStoreWrapperFactory());
});

export const httpClientFactory = createSingletonFactory<JsonHttpClient>(() => {
  return new JsonHttpClientImpl({
    baseUrl: "",
  });
});
