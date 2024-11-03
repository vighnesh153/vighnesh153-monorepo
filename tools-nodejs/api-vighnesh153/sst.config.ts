/// <reference path="./.sst/platform/config.d.ts" />

import {
  constructHttpApiLambdaName,
  constructRoutesForDev,
  constructRoutesForProd,
  DEFAULT_AWS_REGION,
  isValidStageType,
  type StageType,
} from "@vighnesh153/tools/vighnesh153";

import { userInfoFields } from "./src/common/dynamo_db_table_metadata.ts";
import { FunctionArgs } from "./.sst/platform/src/components/aws/index.ts";

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
          region: DEFAULT_AWS_REGION as any,
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
      deletionProtection: true,
      transform: {
        table(args) {
          args.name = `UserInfo-${stage}`;
        },
      },
    });

    // s3 buckets
    const publicFilesBucket = new sst.aws.Bucket("PublicFilesBucket", {
      access: "cloudfront",
    });
    const privateFilesBucket = new sst.aws.Bucket("PrivateFilesBucket", {});

    // cloudfront for public assets bucket
    const publicFilesCloudfront = new sst.aws.Cdn("PublicFilesCloudfront", {
      comment: `Public files - ${stage}`,
      origins: [{
        domainName: publicFilesBucket.domain,
        originId: publicFilesBucket.name,
      }],
      defaultCacheBehavior: {
        targetOriginId: publicFilesBucket.name,
        allowedMethods: ["GET", "HEAD", "OPTIONS"],
        cachedMethods: ["GET", "HEAD", "OPTIONS"],
        forwardedValues: {
          queryString: true,
          cookies: { forward: "none" },
        },
        viewerProtocolPolicy: "redirect-to-https",
      },
      domain: {
        name: stageConfig.publicAssets.baseHost,
        dns: sst.aws.dns(),
      },
    });

    const logging: FunctionArgs["logging"] = {
      retention: stage === "prod" ? "2 weeks" : "1 day",
    };

    // lambda functions
    new sst.aws.Function("LambdaFunctionCreateUploadPresignedUrl", {
      link: [
        publicFilesBucket,
        privateFilesBucket,
      ],
      name: constructHttpApiLambdaName({
        stage,
        functionIdentifier: stageConfig.api.createUploadPresignedUrl.identifier,
        method: "post",
      }),
      handler:
        `dist/${stageConfig.api.createUploadPresignedUrl.identifier}.handler`,
      logging,
      environment: {
        STAGE: stage,
      },
    });

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

    new sst.aws.Function("LambdaFunctionGoogleAuthCallback", {
      link: [
        userInfoTable,
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        COOKIE_SECRET,
      ],
      name: constructHttpApiLambdaName({
        stage,
        functionIdentifier: stageConfig.api.googleAuthCallback.identifier,
        method: "get",
      }),
      handler: `dist/${stageConfig.api.googleAuthCallback.identifier}.handler`,
      logging,
      environment: {
        UI_AUTH_COMPLETE_URL: stageConfig.ui.onAuthCompleteCallback,
        AUTH_REDIRECT_URL: stageConfig.api.googleAuthCallback.path,
        STAGE: stage,
      },
    });

    new sst.aws.Function("LambdaFunctionInitiateGoogleLogin", {
      link: [GOOGLE_CLIENT_ID],
      name: constructHttpApiLambdaName({
        stage,
        functionIdentifier: stageConfig.api.initiateGoogleLogin.identifier,
        method: "get",
      }),
      handler: `dist/${stageConfig.api.initiateGoogleLogin.identifier}.handler`,
      logging,
      environment: {
        AUTH_REDIRECT_URL: stageConfig.api.googleAuthCallback.path,
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
      environment: {
        STAGE: stage,
      },
    });
  },
});
