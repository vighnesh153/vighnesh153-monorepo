import { LambdaFunctionConfig, LambdaFunctionName, StageType } from './aws_config';

const API_HOSTS = {
  dev: 'dev.api.vighnesh153.dev',
  prod: 'prod.api.vighnesh153.dev',
} satisfies Record<StageType, string>;

const UI_HOSTS = {
  dev: 'staging.vighnesh153.dev',
  prod: 'vighnesh153.dev',
} satisfies Record<StageType, string>;

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
      identifier: LambdaFunctionName;
    };
    initiateLogout: {
      path: string;
      identifier: LambdaFunctionName;
    };
    authCallback: {
      path: string;
      identifier: LambdaFunctionName;
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
        path: `${apiOrigin}/${LambdaFunctionConfig.initiateGoogleLogin.name}`,
        identifier: LambdaFunctionConfig.initiateGoogleLogin.name,
      },
      initiateLogout: {
        path: `${apiOrigin}/${LambdaFunctionConfig.initiateLogout.name}`,
        identifier: LambdaFunctionConfig.initiateLogout.name,
      },
      authCallback: {
        path: `${apiOrigin}/${LambdaFunctionConfig.googleAuthCallback.name}`,
        identifier: LambdaFunctionConfig.googleAuthCallback.name,
      },
    },
  };
}

export function constructRoutesForDev(): Vighnesh153Routes {
  return constructRoutes(API_HOSTS.dev, UI_HOSTS.dev);
}

export function constructRoutesForProd(): Vighnesh153Routes {
  return constructRoutes(API_HOSTS.prod, UI_HOSTS.prod);
}
