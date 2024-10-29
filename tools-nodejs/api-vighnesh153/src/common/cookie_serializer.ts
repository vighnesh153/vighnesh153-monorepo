import cookie, { type SerializeOptions } from "cookie";

export interface CookieSerializer {
  serialize(
    cookieName: string,
    cookieValue: string,
    options: SerializeOptions,
  ): string;

  parse(cookieValue: string): Record<string, string | undefined>;
}

export class CookieSerializerImpl implements CookieSerializer {
  serialize(
    cookieName: string,
    cookieValue: string,
    options: SerializeOptions,
  ): string {
    return cookie.serialize(cookieName, cookieValue, options);
  }

  parse(cookieValue: string): Record<string, string | undefined> {
    return cookie.parse(cookieValue);
  }
}

export class FakeCookieSerializer implements CookieSerializer {
  serializedCookie = "";
  parsedValue: Record<string, string | undefined> = {};

  serialize(): string {
    return this.serializedCookie;
  }

  parse(): Record<string, string | undefined> {
    return this.parsedValue;
  }
}
