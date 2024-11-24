export const apexDomains = {
  local: "localhost",
  prod: "vighnesh153.dev",
};

export const apiHosts = {
  local: "localhost:8000",
  prod: "api.vighnesh153.dev",
};

export const apiDomains = {
  local: `http://${apiHosts.local}`,
  prod: `https://${apiHosts.prod}`,
};

export const uiHosts = {
  local: "localhost:4321",
  prod: "vighnesh153.dev",
};

export const uiDomains = {
  local: `http://${uiHosts.local}`,
  prod: `https://${uiHosts.prod}`,
};

export const cookieKeys = {
  userInfo: "user-info",
  authToken: "auth-token",
};
