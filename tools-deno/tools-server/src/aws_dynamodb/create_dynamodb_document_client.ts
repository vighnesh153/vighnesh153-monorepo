import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import type { IDynamoDBDocumentClient } from "./dynamodb_document_client.ts";

export function createDynamoDBDocumentClient(): IDynamoDBDocumentClient {
  return DynamoDBDocumentClient.from(new DynamoDBClient());
}
