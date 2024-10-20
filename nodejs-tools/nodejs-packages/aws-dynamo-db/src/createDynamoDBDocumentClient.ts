import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { IDynamoDBDocumentClient } from "./IDynamoDBDocumentClient.ts";

export function createDynamoDBDocumentClient(): IDynamoDBDocumentClient {
  return DynamoDBDocumentClient.from(new DynamoDBClient());
}
