import { CookiesStatic } from 'js-cookie';

class JsCookie {
  static instance: CookiesStatic<string> | null = null;
  static async getInstance(): Promise<CookiesStatic<string>> {
    if (this.instance == null) {
      this.instance = await import('js-cookie').then((module) => module.default);
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
    if (window.cookieStore?.get) {
      return window.cookieStore
        .get(cookieName)
        .then((cookie) => cookie?.value ?? '')
        .then((cookieValue) => (cookieValue ? decodeURIComponent(cookieValue) : ''));
    }
    const jsCookie = await JsCookie.getInstance();
    return jsCookie.get(cookieName) ?? '';
  }

  async removeCookie(cookieName: string): Promise<void> {
    if (window.cookieStore?.delete) {
      return window.cookieStore.delete(cookieName);
    }
    const jsCookie = await JsCookie.getInstance();
    return jsCookie.remove(cookieName);
  }
}

declare global {
  interface Window {
    cookieStore: {
      get: (name: string) => Promise<{ value: string }>;
      delete: (name: string) => Promise<void>;
    };
  }
}
