import { isProduction } from "@/is_production.ts";
import {
  apexDomains,
  apiDomains,
  apiHosts,
  uiDomains,
  uiHosts,
} from "@/constants.ts";

const stage = isProduction ? "prod" : "local";

function getEnvVar(key: string): string {
  const variable = Deno.env.get(key);
  if (!variable) {
    throw new Error(`Environment variable: "${key}" is not defined`);
  }
  return variable;
}

export const config = {
  apexDomain: apexDomains[stage],
  apiDomain: apiDomains[stage],
  apiHost: apiHosts[stage],
  uiHost: uiHosts[stage],
  uiDomain: uiDomains[stage],
  get serverAuthRedirectUrl() {
    return `${this.apiDomain}/googleAuthCallback`;
  },
  get uiAuthCompleteUrl() {
    return `${this.uiDomain}/auth/callback`;
  },
  googleClientId: getEnvVar("GOOGLE_CLIENT_ID"),
  googleClientSecret: getEnvVar("GOOGLE_CLIENT_SECRET"),
  cookieSecret: getEnvVar("COOKIE_SECRET"),
  firebaseConfig: JSON.parse(
    atob(getEnvVar("FIREBASE_SERVICE_ACCOUNT_CONFIG_B64")),
  ),
};
