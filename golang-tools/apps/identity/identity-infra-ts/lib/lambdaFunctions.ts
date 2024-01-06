import { Construct } from "constructs";

import * as lambda from "aws-cdk-lib/aws-lambda";
import * as goLambda from "@aws-cdk/aws-lambda-go-alpha";

import { Stage } from "./stage";

function envVariableNotFound(): string {
  throw new Error("Environment variable not initialized");
}

export function configureLambdaFunctions(scope: Construct, stage: Stage) {
  const functionProps: Omit<goLambda.GoFunctionProps, "entry"> = {
    environment: {
      // TABLE_NAME: dynamoTable.tableName,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? envVariableNotFound(),
      AUTH_SERVER_ROOT_URI:
        process.env.AUTH_SERVER_ROOT_URI ?? envVariableNotFound(),
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
