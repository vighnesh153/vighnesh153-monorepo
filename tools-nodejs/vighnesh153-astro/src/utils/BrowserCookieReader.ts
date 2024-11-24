import type { CookieStoreWrapper } from "@vighnesh153/tools-browser";

import { cookieStoreWrapperFactory } from "./factories.ts";
import { cookieKeys } from "@vighnesh153/api/client";
import { CompleteUserInfo } from "@vighnesh153/api/models";

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
      const maybeUser = JSON.parse(jsonUserString);

      const result = CompleteUserInfo.safeParse(maybeUser);
      if (result.success) {
        return result.data;
      }

      console.log(
        "Some error occurred while parsing user info cookie:",
        result.error.errors,
      );
      return null;
    } catch (e) {
      console.warn(`Couldn't get or parse user info cookie:`, e);
      return null;
    }
  }
}
