import { type SSTConfig } from 'sst';
import { type StackContext, Api, Table, Config } from 'sst/constructs';

import { userInfoFields } from './src/googleAuthCallback/dynamoDBTableMetadata';

const stackName = 'Vighnesh153IdentityStack';

function validateStage(stage: string): stage is 'dev' | 'prod' {
  if (!['dev', 'prod'].includes(`${stage}`)) {
    throw new Error(`Stage should either be "dev" or "prod", found "${stage}"`);
  }
  return true;
}

const stageConfig = {
  dev: {
    uiBaseUrl: 'https://staging.vighnesh153.dev',
    baseUrl: 'https://dev.identity.vighnesh153.dev',
    authRedirectUrl: 'https://dev.identity.vighnesh153.dev/googleAuthCallback',
  },
  prod: {
    uiBaseUrl: 'https://vighnesh153.dev',
    baseUrl: 'https://prod.identity.vighnesh153.dev',
    authRedirectUrl: 'https://prod.identity.vighnesh153.dev/googleAuthCallback',
  },
};

export function IdentityStack({ stack }: StackContext) {
  const { stage } = stack;
  if (!validateStage(stage)) {
    return;
  }

  // secrets
  const GOOGLE_CLIENT_ID = new Config.Secret(stack, 'GOOGLE_CLIENT_ID');
  const GOOGLE_CLIENT_SECRET = new Config.Secret(stack, 'GOOGLE_CLIENT_SECRET');
  const COOKIE_SECRET = new Config.Secret(stack, 'COOKIE_SECRET');

  // user info table
  const userInfoTable = new Table(stack, 'UserInfo', {
    fields: userInfoFields,
    primaryIndex: { partitionKey: 'email', sortKey: 'userId' },
    cdk: {
      table: {
        tableName: `UserInfo-${stage}`,
      },
    },
  });

  const initiateGoogleLogin = 'initiateGoogleLogin';
  const googleAuthCallback = 'googleAuthCallback';

  // http api
  const api = new Api(stack, 'HttpApi', {
    customDomain: {
      domainName: `${stage}.identity.vighnesh153.dev`,
      hostedZone: 'vighnesh153.dev',
    },
    routes: {
      [`GET /${initiateGoogleLogin}`]: {
        function: {
          bind: [GOOGLE_CLIENT_ID],
          functionName: `HttpApiGet-${initiateGoogleLogin}-${stage}`,
          handler: `dist/${initiateGoogleLogin}.handler`,
          logRetention: stage === 'prod' ? 'two_weeks' : 'one_day',
          environment: {
            IDENTITY_LAMBDA_BASE_URI: stageConfig[stage].baseUrl,
          },
        },
      },
      [`GET /${googleAuthCallback}`]: {
        function: {
          bind: [userInfoTable, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, COOKIE_SECRET],
          functionName: `HttpApiGet-${googleAuthCallback}-${stage}`,
          handler: `dist/${googleAuthCallback}.handler`,
          logRetention: stage === 'prod' ? 'two_weeks' : 'one_day',
          environment: {
            UI_BASE_URL: stageConfig[stage].uiBaseUrl,
            AUTH_REDIRECT_URL: stageConfig[stage].authRedirectUrl,
            STAGE: stage,
          },
        },
      },
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    CustomDomain: api.customDomainUrl,
    Routes: api.routes.join(', '),
    UserInfoTableName: userInfoTable.tableName,
  });
}

const sstConfig: SSTConfig = {
  config(input) {
    const { stage } = input;
    if (!validateStage(stage ?? '')) {
      throw new Error('Invalid stage');
    }
    return {
      name: `Vighnesh153-Identity-${stage}`,
      region: 'ap-south-1', // Mumbai
    };
  },
  stacks(app) {
    const { stage } = app;
    validateStage(stage);
    app.stack(IdentityStack, {
      stackName: `${stackName}-${stage}`,
    });
  },
};

export default sstConfig;
