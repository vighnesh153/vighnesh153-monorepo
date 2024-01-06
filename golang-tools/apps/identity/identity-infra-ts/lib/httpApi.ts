import { Construct } from "constructs";

import * as apiGatewayv2 from "aws-cdk-lib/aws-apigatewayv2";

import { Stage } from "./stage";

const allowedOrigins: Record<Stage, string[]> = {
  dev: ["https://staging.vighnesh153.dev"],
  prod: ["https://vighnesh153.dev"],
};

export function httpApiConfig(
  scope: Construct,
  stage: Stage,
  domain: apiGatewayv2.DomainName
) {
  const httpApi = new apiGatewayv2.HttpApi(scope, "HttpApi", {
    corsPreflight: {
      allowCredentials: true,
      allowHeaders: ["*"],
      allowMethods: [apiGatewayv2.CorsHttpMethod.ANY],
      allowOrigins: allowedOrigins[stage],
    },
    apiName: `IdentityApp-${stage}`,
    defaultDomainMapping: {
      domainName: domain,
    },
  });

  return {
    httpApi,
  };
}
