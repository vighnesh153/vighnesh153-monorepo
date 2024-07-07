import type { CookieStoreWrapper } from '@vighnesh153/cookie-store';
import { cookieKeys } from 'vighnesh153-cookies';
import type { CompleteUserInfo } from '@vighnesh153/types';

import type { StageType } from '@/constants';
import { cookieStoreWrapperFactory, stageFactory } from './factories';

export interface BrowserCookieReader {
  readUserInfo: () => Promise<CompleteUserInfo | null>;
}

export class BrowserCookieReaderImpl implements BrowserCookieReader {
  constructor(
    private stage: StageType = stageFactory(),
    private cookieStoreWrapper: CookieStoreWrapper = cookieStoreWrapperFactory()
  ) {}

  async readUserInfo(): Promise<CompleteUserInfo | null> {
    const cookieKey = cookieKeys.userInfo(this.stage);
    try {
      const cookieValueString = await this.cookieStoreWrapper.getCookieValue(cookieKey);
      return JSON.parse(cookieValueString) as CompleteUserInfo;
    } catch (e) {
      console.error(`Couldn't parse user info cookie:`, e);
      return null;
    }
  }
}
