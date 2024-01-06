import { Construct } from "constructs";

import * as lambda from "aws-cdk-lib/aws-lambda";
import * as goLambda from "@aws-cdk/aws-lambda-go-alpha";

function envVariableNotFound(): string {
  throw new Error("Environment variable not initialized");
}

export function configureLambdaFunctions(scope: Construct, domainName: string) {
  const functionProps: Omit<goLambda.GoFunctionProps, "entry"> = {
    environment: {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? envVariableNotFound(),
      AUTH_SERVER_ROOT_URI: domainName.startsWith("http")
        ? domainName
        : `https://${domainName}`,
    },
    runtime: lambda.Runtime.PROVIDED_AL2023,
  };

  // Create Lambda function for each CRUD operation
  const initiateGoogleLoginLambda = new goLambda.GoFunction(
    scope,
    "InitiateGoogleLoginFunction",
    {
      ...functionProps,
      environment: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? envVariableNotFound(),
        AUTH_SERVER_ROOT_URI:
          process.env.AUTH_SERVER_ROOT_URI ?? envVariableNotFound(),
      },
      entry: "../initiate-google-login",
    }
  );

  return {
    initiateGoogleLoginLambda,
  };
}
