import cookie, { CookieSerializeOptions } from 'cookie';

export interface CookieSerializer {
  serialize: (cookieName: string, cookieValue: string, options: CookieSerializeOptions) => string;
}

export class CookieSerializerImpl implements CookieSerializer {
  serialize(cookieName: string, cookieValue: string, options: CookieSerializeOptions): string {
    return cookie.serialize(cookieName, cookieValue, options);
  }
}

export class FakeCookieSerializer implements CookieSerializer {
  serializedCookie = '';

  serialize(): string {
    return this.serializedCookie;
  }
}
