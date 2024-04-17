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
}

declare global {
  interface Window {
    cookieStore: {
      get: (name: string) => Promise<{ value: string }>;
    };
  }
}
