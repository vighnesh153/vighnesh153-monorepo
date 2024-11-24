import type { CookieStoreWrapper } from "@vighnesh153/tools-browser";
import { type CompleteUserInfo } from "@vighnesh153/tools";
import { cookieKeys } from "@vighnesh153/tools/vighnesh153";

import { cookieStoreWrapperFactory } from "./factories.ts";

export interface BrowserCookieReader {
  readUserInfo: () => Promise<CompleteUserInfo | null>;
}

export class BrowserCookieReaderImpl implements BrowserCookieReader {
  constructor(
    private cookieStoreWrapper: CookieStoreWrapper =
      cookieStoreWrapperFactory(),
  ) {}

  async readUserInfo(): Promise<CompleteUserInfo | null> {
    const cookieKey = cookieKeys.userInfo;
    try {
      const cookieValueString = await this.cookieStoreWrapper.getCookieValue(
        cookieKey,
      );
      const jsonUserString = atob(cookieValueString);
      return JSON.parse(jsonUserString) as CompleteUserInfo;
    } catch (e) {
      console.warn(`Couldn't get or parse user info cookie:`, e);
      return null;
    }
  }
}
