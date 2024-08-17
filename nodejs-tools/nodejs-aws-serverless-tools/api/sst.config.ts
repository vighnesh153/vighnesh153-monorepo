import { type SSTConfig } from 'sst';
import { type StackContext, Table, Config, Function } from 'sst/constructs';

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

  new Function(stack, 'LambdaFunctionInitiateLogin', {
    bind: [GOOGLE_CLIENT_ID],
    functionName: constructHttpApiLambdaName({
      stage,
      functionIdentifier: stageConfig.api.initiateLogin.identifier,
      method: 'get',
    }),
    handler: `dist/${stageConfig.api.initiateLogin.identifier}.handler`,
    logRetention: stage === 'prod' ? 'two_weeks' : 'one_day',
    environment: {
      AUTH_REDIRECT_URL: stageConfig.api.authCallback.path,
    },
  });

  new Function(stack, 'LambdaFunctionAuthCallback', {
    bind: [userInfoTable, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, COOKIE_SECRET],
    functionName: constructHttpApiLambdaName({
      stage,
      functionIdentifier: stageConfig.api.authCallback.identifier,
      method: 'get',
    }),
    handler: `dist/${stageConfig.api.authCallback.identifier}.handler`,
    logRetention: stage === 'prod' ? 'two_weeks' : 'one_day',
    environment: {
      UI_AUTH_COMPLETE_URL: stageConfig.ui.onAuthCompleteCallback,
      AUTH_REDIRECT_URL: stageConfig.api.authCallback.path,
      STAGE: stage,
    },
  });

  new Function(stack, 'LambdaFunctionInitiateLogout', {
    functionName: constructHttpApiLambdaName({
      stage,
      functionIdentifier: stageConfig.api.initiateLogout.identifier,
      method: 'get',
    }),
    handler: `dist/${stageConfig.api.initiateLogout.identifier}.handler`,
    logRetention: stage === 'prod' ? 'two_weeks' : 'one_day',
    environment: {
      UI_AUTH_COMPLETE_URL: stageConfig.ui.onAuthCompleteCallback,
      STAGE: stage,
    },
  });

  stack.addOutputs({
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
