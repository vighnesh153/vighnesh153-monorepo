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

const PUBLIC_ASSETS_HOSTS = {
  dev: "dev.public-assets.vighnesh153.dev",
  prod: "prod.public-assets.vighnesh153.dev",
};

export type Vighnesh153ApiRoute = {
  path: string;
  identifier: LambdaFunctionName;
};

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
    createUploadPresignedUrl: Vighnesh153ApiRoute;
    initiateGoogleLogin: Vighnesh153ApiRoute;
    initiateLogout: Vighnesh153ApiRoute;
    getUser: Vighnesh153ApiRoute;
    googleAuthCallback: Vighnesh153ApiRoute;
    playground: Vighnesh153ApiRoute;
  };

  publicAssets: {
    baseHost: string;
    baseOrigin: string;
  };
}

function constructRoutes(
  apiHost: string,
  uiHost: string,
  publicAssetsHost: string,
): Vighnesh153Routes {
  const apiOrigin = `https://${apiHost}`;
  const uiOrigin = `https://${uiHost}`;
  const publicAssetsOrigin = `https://${publicAssetsHost}`;

  const buildApiRouteConfig = (
    key: keyof typeof LambdaFunctionConfig,
  ): Vighnesh153ApiRoute => ({
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
      createUploadPresignedUrl: buildApiRouteConfig("createUploadPresignedUrl"),
      getUser: buildApiRouteConfig("getUser"),
      googleAuthCallback: buildApiRouteConfig("googleAuthCallback"),
      initiateGoogleLogin: buildApiRouteConfig("initiateGoogleLogin"),
      initiateLogout: buildApiRouteConfig("initiateLogout"),
      playground: buildApiRouteConfig("playground"),
    },
    publicAssets: {
      baseHost: publicAssetsHost,
      baseOrigin: publicAssetsOrigin,
    },
  };
}

export function constructRoutesForDev(): Vighnesh153Routes {
  return constructRoutes(API_HOSTS.dev, UI_HOSTS.dev, PUBLIC_ASSETS_HOSTS.dev);
}

export function constructRoutesForProd(): Vighnesh153Routes {
  return constructRoutes(
    API_HOSTS.prod,
    UI_HOSTS.prod,
    PUBLIC_ASSETS_HOSTS.prod,
  );
}
