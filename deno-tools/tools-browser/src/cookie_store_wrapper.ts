import type { CookiesStatic } from "js-cookie";

class JsCookie {
  static instance: CookiesStatic<string> | null = null;
  static async getInstance(): Promise<CookiesStatic<string>> {
    if (this.instance == null) {
      this.instance = await import("js-cookie").then((module) =>
        module.default
      );
    }
    return this.instance!;
  }
}

export interface CookieStoreWrapper {
  getCookieValue: (name: string) => Promise<string>;
  removeCookie: (name: string) => Promise<void>;
}

export class CookieStoreWrapperImpl implements CookieStoreWrapper {
  async getCookieValue(cookieName: string): Promise<string> {
    if (globalThis.cookieStore?.get != null) {
      return globalThis.cookieStore
        .get(cookieName)
        .then((cookie) => cookie?.value ?? "")
        .then((
          cookieValue,
        ) => (cookieValue ? decodeURIComponent(cookieValue) : ""));
    }
    const jsCookie = await JsCookie.getInstance();
    return jsCookie.get(cookieName) ?? "";
  }

  async removeCookie(cookieName: string): Promise<void> {
    if (globalThis.cookieStore?.delete != null) {
      return globalThis.cookieStore.delete(cookieName);
    }
    const jsCookie = await JsCookie.getInstance();
    return jsCookie.remove(cookieName);
  }
}

// Inspiration: https://stackoverflow.com/a/69429093/8822610
declare global {
  // deno-lint-ignore no-var
  var cookieStore: {
    get: (name: string) => Promise<{ value: string }>;
    delete: (name: string) => Promise<void>;
  };
}
