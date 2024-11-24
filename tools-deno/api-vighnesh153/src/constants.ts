import { isProduction } from "@/is_production.ts";

const key = isProduction ? "prod" : "local";

const apexDomains = {
  local: "localhost",
  prod: "vighnesh153.dev",
};

const apiHosts = {
  local: "localhost:8000",
  prod: "api.vighnesh153.dev",
};

const apiDomains = {
  local: `http://${apiHosts.local}`,
  prod: `https://${apiHosts.prod}`,
};

const uiHosts = {
  local: "localhost:4321",
  prod: "vighnesh153.dev",
};

const uiDomains = {
  local: `http://${uiHosts.local}`,
  prod: `https://${uiHosts.prod}`,
};

export const apexDomain = apexDomains[key];
export const apiHost = apiHosts[key];
export const apiDomain = apiDomains[key];
export const uiHost = uiHosts[key];
export const uiDomain = uiDomains[key];
export const serverAuthRedirectUrl = `${apiDomain}/googleAuthCallback`;
export const uiAuthCompleteUrl = `${uiDomain}/auth/callback`;
