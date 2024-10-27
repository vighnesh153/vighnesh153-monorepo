import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import * as dynamoDB from "aws-cdk-lib/aws-dynamodb";

export function dynamoTableConfig(scope: Construct, stage: string) {
  const dynamoTable = new dynamoDB.Table(scope, "UserInfo", {
    partitionKey: {
      name: "email",
      type: dynamoDB.AttributeType.STRING,
    },
    tableName: `UserInfo-${stage}`,
    removalPolicy: cdk.RemovalPolicy.RETAIN,
  });

  return {
    dynamoTable,
  };
}
