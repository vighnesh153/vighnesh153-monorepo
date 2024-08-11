import { type SSTConfig } from 'sst';
import { type StackContext, Api, Table, Config, Function } from 'sst/constructs';

import {
  constructRoutesForDev,
  constructRoutesForProd,
  constructHttpApiLambdaName,
  DEFAULT_AWS_REGION,
} from '@vighnesh153/tools-platform-independent';

import { userInfoFields } from './src/googleAuthCallback/dynamoDBTableMetadata';

const stackName = 'Vighnesh153ApiStack';

function validateStage(stage: string): stage is 'dev' | 'prod' {
  if (!['dev', 'prod'].includes(`${stage}`)) {
    throw new Error(`Stage should either be "dev" or "prod", found "${stage}"`);
  }
  return true;
}

const STAGE_CONFIG = {
  dev: constructRoutesForDev(),
  prod: constructRoutesForProd(),
};

function ApiStack({ stack }: StackContext) {
  const { stage } = stack;
  if (!validateStage(stage)) {
    return;
  }

  const stageConfig = STAGE_CONFIG[stage];

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
        deletionProtection: true,
      },
    },
  });

  new Function(stack, 'LambdaFunctionPikachu', {
    bind: [],
    functionName: `HttpApiGet-pikachu-${stage}`,
    handler: `dist/pikachu.handler`,
    logRetention: 'one_day',
    environment: {
      PIKACHU_ENV: 'pikachu-secret',
    },
  });

  // http api
  const api = new Api(stack, 'HttpApi', {
    customDomain: {
      domainName: stageConfig.api.baseHost,
      hostedZone: 'vighnesh153.dev',
    },
    routes: {
      [`GET /${stageConfig.api.initiateLogin.identifier}`]: {
        function: {
          bind: [GOOGLE_CLIENT_ID],
          functionName: constructHttpApiLambdaName({
            stage,
            functionIdentifier: stageConfig.api.initiateLogin.identifier,
            method: 'Get',
          }),
          handler: `dist/${stageConfig.api.initiateLogin.identifier}.handler`,
          logRetention: stage === 'prod' ? 'two_weeks' : 'one_day',
          environment: {
            AUTH_REDIRECT_URL: stageConfig.api.authCallback.path,
          },
        },
      },
      [`GET /${stageConfig.api.authCallback.identifier}`]: {
        function: {
          bind: [userInfoTable, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, COOKIE_SECRET],
          functionName: constructHttpApiLambdaName({
            stage,
            functionIdentifier: stageConfig.api.authCallback.identifier,
            method: 'Get',
          }),
          handler: `dist/${stageConfig.api.authCallback.identifier}.handler`,
          logRetention: stage === 'prod' ? 'two_weeks' : 'one_day',
          environment: {
            UI_AUTH_COMPLETE_URL: stageConfig.ui.onAuthCompleteCallback,
            AUTH_REDIRECT_URL: stageConfig.api.authCallback.path,
            STAGE: stage,
          },
        },
      },
      [`GET /${stageConfig.api.initiateLogout.identifier}`]: {
        function: {
          functionName: constructHttpApiLambdaName({
            stage,
            functionIdentifier: stageConfig.api.initiateLogout.identifier,
            method: 'Get',
          }),
          handler: `dist/${stageConfig.api.initiateLogout.identifier}.handler`,
          logRetention: stage === 'prod' ? 'two_weeks' : 'one_day',
          environment: {
            UI_AUTH_COMPLETE_URL: stageConfig.ui.onAuthCompleteCallback,
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
      name: `Vighnesh153-Api-${stage}`,
      region: DEFAULT_AWS_REGION,
    };
  },
  stacks(app) {
    const { stage } = app;
    validateStage(stage);
    app.stack(ApiStack, {
      stackName: `${stackName}-${stage}`,
    });
  },
};

export default sstConfig;
