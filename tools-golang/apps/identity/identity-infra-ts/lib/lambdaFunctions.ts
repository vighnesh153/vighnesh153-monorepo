import { Construct } from "constructs";
import { aws_logs as logs } from "aws-cdk-lib";

import * as lambda from "aws-cdk-lib/aws-lambda";
import * as goLambda from "@aws-cdk/aws-lambda-go-alpha";
import { Stage } from "./stage";

function envVariableNotFound(): string {
  throw new Error("Environment variable not initialized");
}

export function configureLambdaFunctions(
  scope: Construct,
  stage: Stage,
  domainName: string,
  uiDomain: string
) {
  const AUTH_SERVER_ROOT_URI = domainName.startsWith("http")
    ? domainName
    : `https://${domainName}`;

  const functionProps: Omit<goLambda.GoFunctionProps, "entry"> = {
    runtime: lambda.Runtime.PROVIDED_AL2023,
    logRetention:
      stage === "dev"
        ? logs.RetentionDays.ONE_DAY
        : logs.RetentionDays.ONE_MONTH,
  };

  const initiateGoogleLoginLambda = new goLambda.GoFunction(
    scope,
    "InitiateGoogleLoginFunction",
    {
      ...functionProps,
      environment: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? envVariableNotFound(),
        AUTH_SERVER_ROOT_URI,
      },
      entry: "../initiate-google-login",
    }
  );

  const googleAuthCallbackLamdba = new goLambda.GoFunction(
    scope,
    "GoogleAuthCallbackFunction",
    {
      ...functionProps,
      environment: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? envVariableNotFound(),
        GOOGLE_CLIENT_SECRET:
          process.env.GOOGLE_CLIENT_SECRET ?? envVariableNotFound(),
        COOKIE_SECRET: process.env.COOKIE_SECRET ?? envVariableNotFound(),
        GOOGLE_AUTH_REDIRECT_URI: `${AUTH_SERVER_ROOT_URI}/googleAuthCallback`,
        UI_DOMAIN: uiDomain,
        STAGE: stage,
      },
      entry: "../google-auth-callback",
    }
  );

  return {
    initiateGoogleLoginLambda,
    googleAuthCallbackLamdba,
  };
}
