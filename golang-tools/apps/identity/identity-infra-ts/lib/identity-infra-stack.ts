import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import * as apiGatewayv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as apiGatewayIntegrations from "aws-cdk-lib/aws-apigatewayv2-integrations";

import { route53Configuration } from "./route53-stuff";
import { dynamoTableConfig } from "./dynamoTable";
import { Stage } from "./stage";
import { httpApiConfig } from "./httpApi";
import { configureLambdaFunctions } from "./lambdaFunctions";

export class IdentityInfraStack extends cdk.Stack {
  constructor(scope: Construct, stage: Stage, props?: cdk.StackProps) {
    super(scope, `IdentityInfraStack-${stage}`, props);

    const domainName = `${stage}.identity.vighnesh153.dev`;
    const route53Config = route53Configuration(this, stage, domainName);
    const { httpApi } = httpApiConfig(this, stage, route53Config.domain);
    const { dynamoTable } = dynamoTableConfig(this, "UserInfo");

    // Create Lambda function for each CRUD operation
    const { initiateGoogleLoginLambda } = configureLambdaFunctions(
      scope,
      domainName
    );

    // Grant the lambda function read/write access to the DynammoDB table
    dynamoTable.grantReadWriteData(initiateGoogleLoginLambda);

    // Associate a lambda function to a route in HttpApi
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
