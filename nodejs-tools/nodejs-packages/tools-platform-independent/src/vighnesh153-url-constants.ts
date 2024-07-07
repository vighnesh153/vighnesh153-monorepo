const API_HOSTS = {
  DEV: 'dev.api.vighnesh153.dev',
  PROD: 'prod.api.vighnesh153.dev',
};

const UI_HOSTS = {
  DEV: 'staging.vighnesh153.dev',
  PROD: 'vighnesh153.dev',
};

export interface Vighnesh153Routes {
  ui: {
    baseHost: string;
    basePath: string;

    onAuthCompleteCallback: string;
  };

  api: {
    baseHost: string;
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
  };
}

function constructRoutes(apiHost: string, uiHost: string): Vighnesh153Routes {
  const apiOrigin = `https://${apiHost}`;
  const uiOrigin = `https://${uiHost}`;
  return {
    ui: {
      baseHost: uiHost,
      basePath: uiOrigin,
      onAuthCompleteCallback: `${uiOrigin}/auth/callback`,
    },
    api: {
      baseHost: apiHost,
      basePath: apiOrigin,
      initiateLogin: {
        path: `${apiOrigin}/initiateGoogleLogin`,
        identifier: 'initiateGoogleLogin',
      },
      initiateLogout: {
        path: `${apiOrigin}/initiateLogout`,
        identifier: 'initiateLogout',
      },
      authCallback: {
        path: `${apiOrigin}/googleAuthCallback`,
        identifier: 'googleAuthCallback',
      },
    },
  };
}

export function constructRoutesForDev(): Vighnesh153Routes {
  return constructRoutes(API_HOSTS.DEV, UI_HOSTS.DEV);
}

export function constructRoutesForProd(): Vighnesh153Routes {
  return constructRoutes(API_HOSTS.PROD, UI_HOSTS.PROD);
}
