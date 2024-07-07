import type { CookieStoreWrapper } from '@vighnesh153/cookie-store';
import { cookieKeys } from 'vighnesh153-cookies';
import type { CompleteUserInfo } from '@vighnesh153/types';

import { stage as actualStage, type StageType } from '@/utils';
import { cookieStoreWrapperFactory } from './factories';

export interface BrowserCookieReader {
  readUserInfo: () => Promise<CompleteUserInfo | null>;
}

export class BrowserCookieReaderImpl implements BrowserCookieReader {
  constructor(
    private stage: StageType = actualStage,
    private cookieStoreWrapper: CookieStoreWrapper = cookieStoreWrapperFactory()
  ) {}

  async readUserInfo(): Promise<CompleteUserInfo | null> {
    const cookieKey = cookieKeys.userInfo(this.stage);
    try {
      const cookieValueString = await this.cookieStoreWrapper.getCookieValue(cookieKey);
      return JSON.parse(cookieValueString) as CompleteUserInfo;
    } catch (e) {
      console.warn(`Couldn't get or parse user info cookie:`, e);
      return null;
    }
  }
}
