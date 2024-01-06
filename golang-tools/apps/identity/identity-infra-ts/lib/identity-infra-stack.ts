import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

import * as apiGatewayv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as apiGatewayIntegrations from "aws-cdk-lib/aws-apigatewayv2-integrations";

import * as dynamoDB from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as goLambda from "@aws-cdk/aws-lambda-go-alpha";
import { route53Configuration } from "./route53-stuff";

function envVariableNotFound(): string {
  throw new Error("Environment variable not initialized");
}

export class IdentityInfraStack extends cdk.Stack {
  constructor(scope: Construct, stage: string, props?: cdk.StackProps) {
    super(scope, `IdentityInfraStack-${stage}`, props);

    const domainName = `${stage}.identity.vighnesh153.dev`;
    const route53Config = route53Configuration(this, stage, domainName);

    const dynamoTable = new dynamoDB.Table(this, "UserInfo", {
      partitionKey: {
        name: "email",
        type: dynamoDB.AttributeType.STRING,
      },
      tableName: `UserInfo-${stage}`,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

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
      this,
      "InitiateGoogleLoginFunction",
      {
        ...functionProps,
        environment: {
          GOOGLE_CLIENT_ID:
            process.env.GOOGLE_CLIENT_ID ?? envVariableNotFound(),
          AUTH_SERVER_ROOT_URI:
            process.env.AUTH_SERVER_ROOT_URI ?? envVariableNotFound(),
        },
        entry: "../initiate-google-login",
      }
    );

    // Grant the lambda function read/write access to the DynammoDB table
    dynamoTable.grantReadWriteData(initiateGoogleLoginLambda);

    // Create an API Gateway resource for each of the CRUD operations
    const httpApi = new apiGatewayv2.HttpApi(this, "HttpApi", {
      corsPreflight: {
        allowCredentials: true,
        allowHeaders: ["*"],
        allowMethods: [apiGatewayv2.CorsHttpMethod.ANY],
        allowOrigins: [
          "https://vighnesh153.dev",
          "https://staging.vighnesh153.dev",
        ],
      },
      apiName: `IdentityApp-${stage}`,
      defaultDomainMapping: {
        domainName: route53Config.domain,
      },
    });

    httpApi.addRoutes({
      path: "/initiateGoogleLogin",
      methods: [apiGatewayv2.HttpMethod.GET],
      integration: new apiGatewayIntegrations.HttpLambdaIntegration(
        "InitiateGoogleLoginFunctionHttpIntegration",
        initiateGoogleLoginLambda
      ),
    });
  }
}
