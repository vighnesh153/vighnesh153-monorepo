import crypto from "node:crypto";
import { config } from "@/config.ts";

export interface AuthTokenGeneratorParams {
  userId: string;
}

export interface AuthTokenGenerator {
  generate(params: AuthTokenGeneratorParams): string;
}

export class AuthTokenGeneratorImpl implements AuthTokenGenerator {
  generate({ userId }: AuthTokenGeneratorParams): string {
    const data = `${userId}-${config.cookieSecret}`;
    return crypto.createHash("sha256").update(data, "binary").digest("hex");
  }
}

export class FakeAuthTokenGenerator implements AuthTokenGenerator {
  authToken: string | null = null;

  generate({ userId }: AuthTokenGeneratorParams): string {
    return this.authToken ?? `hashed(${userId})`;
  }
}
