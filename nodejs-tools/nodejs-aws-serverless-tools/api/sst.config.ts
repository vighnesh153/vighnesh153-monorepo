// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

import {
  constructHttpApiLambdaName,
  constructRoutesForDev,
  constructRoutesForProd,
  DEFAULT_AWS_REGION,
  isValidStageType,
  type StageType,
} from "@vighnesh153/tools";

import { userInfoFields } from "./src/common/dynamoDBTableMetadata";
import { FunctionArgs } from "./.sst/platform/src/components/aws";

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
    if (!validateStage(stage ?? "")) {
      throw new Error("Invalid stage");
    }
    return {
      name: `Vighnesh153-Api-${stage}`,
      removal: stage === "prod" ? "retain" : "remove",
      home: "aws",
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
      throw new Error("Invalid stage");
    }

    const stageConfig = STAGE_CONFIG[stage];

    // secrets
    const GOOGLE_CLIENT_ID = new sst.Secret("GoogleClientId");
    const GOOGLE_CLIENT_SECRET = new sst.Secret("GoogleClientSecret");
    const COOKIE_SECRET = new sst.Secret("CookieSecret");

    // user info table
    const userInfoTable = new sst.aws.Dynamo("UserInfoTable", {
      fields: { email: userInfoFields.email, userId: userInfoFields.userId },
      primaryIndex: { hashKey: "email", rangeKey: "userId" },
      // globalIndexes: {
      //   UserIdIndex: {
      //     hashKey: 'userId',
      //   },
      // },
      transform: {
        table(args) {
          args.name = `UserInfo-${stage}`;
        },
      },
    });

    const logging: FunctionArgs["logging"] = {
      retention: stage === "prod" ? "2 weeks" : "1 day",
    };

    new sst.aws.Function("LambdaFunctionGetUser", {
      link: [userInfoTable, COOKIE_SECRET],
      name: constructHttpApiLambdaName({
        stage,
        functionIdentifier: stageConfig.api.getUser.identifier,
        method: "get",
      }),
      handler: `dist/${stageConfig.api.getUser.identifier}.handler`,
      logging,
      environment: {
        STAGE: stage,
      },
    });

    new sst.aws.Function("LambdaFunctionInitiateLogin", {
      link: [GOOGLE_CLIENT_ID],
      name: constructHttpApiLambdaName({
        stage,
        functionIdentifier: stageConfig.api.initiateLogin.identifier,
        method: "get",
      }),
      handler: `dist/${stageConfig.api.initiateLogin.identifier}.handler`,
      logging,
      environment: {
        AUTH_REDIRECT_URL: stageConfig.api.authCallback.path,
      },
    });

    new sst.aws.Function("LambdaFunctionAuthCallback", {
      link: [
        userInfoTable,
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        COOKIE_SECRET,
      ],
      name: constructHttpApiLambdaName({
        stage,
        functionIdentifier: stageConfig.api.authCallback.identifier,
        method: "get",
      }),
      handler: `dist/${stageConfig.api.authCallback.identifier}.handler`,
      logging,
      environment: {
        UI_AUTH_COMPLETE_URL: stageConfig.ui.onAuthCompleteCallback,
        AUTH_REDIRECT_URL: stageConfig.api.authCallback.path,
        STAGE: stage,
      },
    });

    new sst.aws.Function("LambdaFunctionInitiateLogout", {
      name: constructHttpApiLambdaName({
        stage,
        functionIdentifier: stageConfig.api.initiateLogout.identifier,
        method: "get",
      }),
      handler: `dist/${stageConfig.api.initiateLogout.identifier}.handler`,
      logging,
      environment: {
        UI_AUTH_COMPLETE_URL: stageConfig.ui.onAuthCompleteCallback,
        STAGE: stage,
      },
    });

    new sst.aws.Function("LambdaFunctionPlayground", {
      name: constructHttpApiLambdaName({
        stage,
        functionIdentifier: stageConfig.api.playground.identifier,
        method: "get",
      }),
      handler: `dist/${stageConfig.api.playground.identifier}.handler`,
      logging,
    });
  },
});
