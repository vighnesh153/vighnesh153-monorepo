// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

import {
  constructRoutesForDev,
  constructRoutesForProd,
  constructHttpApiLambdaName,
  DEFAULT_AWS_REGION,
  isValidStageType,
  type StageType,
} from '@vighnesh153/tools-platform-independent';

import { userInfoFields } from './src/googleAuthCallback/dynamoDBTableMetadata';

function validateStage(stage: string): stage is StageType {
  if (!isValidStageType(stage)) {
    throw new Error(`Stage should either be "dev" or "prod", found "${stage}"`);
  }
  return true;
}

const STAGE_CONFIG = {
  dev: constructRoutesForDev(),
  prod: constructRoutesForProd(),
};

export default $config({
  app(input) {
    const { stage } = input;
    if (!validateStage(stage ?? '')) {
      throw new Error('Invalid stage');
    }
    return {
      name: `Vighnesh153-Api-${stage}`,
      removal: stage === 'prod' ? 'retain' : 'remove',
      home: 'aws',
      providers: {
        aws: {
          region: DEFAULT_AWS_REGION,
        },
      },
    };
  },
  async run() {
    const { stage } = $app;
    if (!validateStage(stage)) {
      throw new Error('Invalid stage');
    }

    const stageConfig = STAGE_CONFIG[stage];

    // secrets
    const GOOGLE_CLIENT_ID = new sst.Secret('GoogleClientId');
    const GOOGLE_CLIENT_SECRET = new sst.Secret('GoogleClientSecret');
    const COOKIE_SECRET = new sst.Secret('CookieSecret');

    // user info table
    const userInfoTable = new sst.aws.Dynamo('UserInfoTable', {
      fields: { email: userInfoFields.email, userId: userInfoFields.userId },
      primaryIndex: { hashKey: 'email', rangeKey: 'userId' },
      transform: {
        table(args) {
          args.name = `UserInfo-${stage}`;
        },
      },
    });

    new sst.aws.Function('LambdaFunctionInitiateLogin', {
      link: [GOOGLE_CLIENT_ID],
      name: constructHttpApiLambdaName({
        stage,
        functionIdentifier: stageConfig.api.initiateLogin.identifier,
        method: 'get',
      }),
      handler: `dist/${stageConfig.api.initiateLogin.identifier}.handler`,
      logging: {
        retention: stage === 'prod' ? '2 weeks' : '1 day',
      },
      environment: {
        AUTH_REDIRECT_URL: stageConfig.api.authCallback.path,
      },
    });

    new sst.aws.Function('LambdaFunctionAuthCallback', {
      link: [userInfoTable, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, COOKIE_SECRET],
      name: constructHttpApiLambdaName({
        stage,
        functionIdentifier: stageConfig.api.authCallback.identifier,
        method: 'get',
      }),
      handler: `dist/${stageConfig.api.authCallback.identifier}.handler`,
      logging: {
        retention: stage === 'prod' ? '2 weeks' : '1 day',
      },
      environment: {
        UI_AUTH_COMPLETE_URL: stageConfig.ui.onAuthCompleteCallback,
        AUTH_REDIRECT_URL: stageConfig.api.authCallback.path,
        STAGE: stage,
      },
    });

    new sst.aws.Function('LambdaFunctionInitiateLogout', {
      name: constructHttpApiLambdaName({
        stage,
        functionIdentifier: stageConfig.api.initiateLogout.identifier,
        method: 'get',
      }),
      handler: `dist/${stageConfig.api.initiateLogout.identifier}.handler`,
      logging: {
        retention: stage === 'prod' ? '2 weeks' : '1 day',
      },
      environment: {
        UI_AUTH_COMPLETE_URL: stageConfig.ui.onAuthCompleteCallback,
        STAGE: stage,
      },
    });
  },
});
