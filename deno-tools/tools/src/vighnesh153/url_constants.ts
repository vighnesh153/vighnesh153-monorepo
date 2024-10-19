import {
  LambdaFunctionConfig,
  type LambdaFunctionName,
  type StageType,
} from "./aws_config.ts";

const API_HOSTS = {
  dev: "dev.api.vighnesh153.dev",
  prod: "prod.api.vighnesh153.dev",
} satisfies Record<StageType, string>;

const UI_HOSTS = {
  dev: "staging.vighnesh153.dev",
  prod: "vighnesh153.dev",
} satisfies Record<StageType, string>;

export interface Vighnesh153Routes {
  ui: {
    baseHost: string;
    baseOrigin: string;

    onAuthCompleteCallback: string;
  };

  api: {
    baseHost: string;
    baseOrigin: string;

    // auth
    authCallback: {
      path: string;
      identifier: LambdaFunctionName;
    };
    getUser: {
      path: string;
      identifier: LambdaFunctionName;
    };
    initiateLogin: {
      path: string;
      identifier: LambdaFunctionName;
    };
    initiateLogout: {
      path: string;
      identifier: LambdaFunctionName;
    };
    playground: {
      path: string;
      identifier: LambdaFunctionName;
    };
  };
}

function constructRoutes(apiHost: string, uiHost: string): Vighnesh153Routes {
  const apiOrigin = `https://${apiHost}`;
  const uiOrigin = `https://${uiHost}`;

  const buildApiRouteConfig = (key: keyof typeof LambdaFunctionConfig) => ({
    path: `${apiOrigin}/${LambdaFunctionConfig[key].name}`,
    identifier: LambdaFunctionConfig[key].name,
  });

  return {
    ui: {
      baseHost: uiHost,
      baseOrigin: uiOrigin,
      onAuthCompleteCallback: `${uiOrigin}/auth/callback`,
    },
    api: {
      baseHost: apiHost,
      baseOrigin: apiOrigin,
      authCallback: buildApiRouteConfig("googleAuthCallback"),
      getUser: buildApiRouteConfig("getUser"),
      initiateLogin: buildApiRouteConfig("initiateGoogleLogin"),
      initiateLogout: buildApiRouteConfig("initiateLogout"),
      playground: buildApiRouteConfig("playground"),
    },
  };
}

export function constructRoutesForDev(): Vighnesh153Routes {
  return constructRoutes(API_HOSTS.dev, UI_HOSTS.dev);
}

export function constructRoutesForProd(): Vighnesh153Routes {
  return constructRoutes(API_HOSTS.prod, UI_HOSTS.prod);
}
