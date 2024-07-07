const API_ORIGINS = {
  DEV: 'https://dev.api.vighnesh153.dev',
  PROD: 'https://prod.api.vighnesh153.dev',
};

export interface Vighnesh153ApiRoutes {
  basePath: string;

  // auth
  initiateLogin: {
    path: string;
    identifier: string;
  };
  initiateLogout: {
    path: string;
    identifier: string;
  };
  authCallback: {
    path: string;
    identifier: string;
  };
}

function constructRoutes(origin: string): Vighnesh153ApiRoutes {
  return {
    basePath: origin,
    initiateLogin: {
      path: `${origin}/initiateGoogleLogin`,
      identifier: 'initiateGoogleLogin',
    },
    initiateLogout: {
      path: `${origin}/initiateLogout`,
      identifier: 'initiateLogout',
    },
    authCallback: {
      path: `${origin}/googleAuthCallback`,
      identifier: 'googleAuthCallback',
    },
  };
}

export function constructRouteForDev(): Vighnesh153ApiRoutes {
  return constructRoutes(API_ORIGINS.DEV);
}

export function constructRoutesForProd(): Vighnesh153ApiRoutes {
  return constructRoutes(API_ORIGINS.PROD);
}
