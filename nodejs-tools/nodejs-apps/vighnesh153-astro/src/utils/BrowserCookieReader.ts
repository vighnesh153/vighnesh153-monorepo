import type { CookieStoreWrapper } from '@vighnesh153/tools-browser';
import { type CompleteUserInfo } from '@vighnesh153/tools';
import { type StageType } from '@vighnesh153/tools/vighnesh153';
import { cookieKeys } from '@vighnesh153/tools/vighnesh153';

import { stage as actualStage } from './stage.ts';
import { cookieStoreWrapperFactory } from './factories.ts';

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
