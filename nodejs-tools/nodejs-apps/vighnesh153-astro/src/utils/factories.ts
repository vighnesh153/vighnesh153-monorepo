import { createSingletonFactory } from '@vighnesh153/factory';
import { type BrowserCookieReader, BrowserCookieReaderImpl } from './BrowserCookieReader';
import { stage, type StageType } from '@/constants';
import { CookieStoreWrapperImpl, type CookieStoreWrapper } from '@vighnesh153/cookie-store';

export const stageFactory = createSingletonFactory<StageType>(() => stage);

export const cookieStoreWrapperFactory = createSingletonFactory<CookieStoreWrapper>(() => {
  return new CookieStoreWrapperImpl();
});

export const browserCookieReaderFactory = createSingletonFactory<BrowserCookieReader>(() => {
  return new BrowserCookieReaderImpl(stageFactory(), cookieStoreWrapperFactory());
});
