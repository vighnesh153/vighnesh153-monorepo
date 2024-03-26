import { DynamoDB } from 'aws-sdk';

export function createDynamoDBClient(): DynamoDB.DocumentClient {
  return new DynamoDB.DocumentClient();
}
