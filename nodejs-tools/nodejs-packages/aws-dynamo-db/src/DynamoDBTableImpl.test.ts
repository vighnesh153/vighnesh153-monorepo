import { beforeEach, describe, expect, test } from 'vitest';
import { AWSError, DynamoDB, Request } from 'aws-sdk';
import { FakeDynamoDBDocumentClient } from './FakeDynamoDBDocumentClient';
import { DynamoDBTableImpl } from './DynamoDBTableImpl';
import { TableMetadata } from './TableMetadata';

const tableName = 'Pokemon' as const;
const tableMetadata = {
  tableName,
  fields: {
    name: 'string',
    type: 'string',
    strength: 'number',
  },
} satisfies TableMetadata;
let fakeDocumentClient: FakeDynamoDBDocumentClient;
let dynamoDBTableImpl: DynamoDBTableImpl<typeof tableMetadata>;

beforeEach(() => {
  fakeDocumentClient = new FakeDynamoDBDocumentClient();
  dynamoDBTableImpl = new DynamoDBTableImpl(fakeDocumentClient, tableMetadata);
});

describe('queryOne tests', () => {
  test('should return item if no errors', async () => {
    const result = { name: 'pikachu', type: 'electric', strength: 60 };
    fakeDocumentClient.queryResult = {
      promise: () =>
        Promise.resolve({
          Items: [result],
        }),
    } as unknown as Request<DynamoDB.DocumentClient.QueryOutput, AWSError>;

    const actual = await dynamoDBTableImpl.queryOne({ filterBy: { name: 'Pikachu' } });

    expect(fakeDocumentClient.queryCalledWithArgs).toStrictEqual({
      ExpressionAttributeValues: {
        ':name': 'Pikachu',
      },
      KeyConditionExpression: 'name = :name',
      TableName: tableName,
    });
    expect(actual).toStrictEqual({
      error: null,
      data: { ...result },
    });
  });

  test('should return error if item not found', async () => {
    const error = new Error('No item matches the given filter');
    fakeDocumentClient.queryResult = {
      promise: () => Promise.resolve({ $response: { error } }),
    } as unknown as Request<DynamoDB.DocumentClient.QueryOutput, AWSError>;

    const actual = await dynamoDBTableImpl.queryOne({ filterBy: { name: 'Pikachu' } });

    expect(fakeDocumentClient.queryCalledWithArgs).toStrictEqual({
      ExpressionAttributeValues: {
        ':name': 'Pikachu',
      },
      KeyConditionExpression: 'name = :name',
      TableName: tableName,
    });
    expect(actual).toStrictEqual({
      error: {
        message: 'OBJECT_NOT_FOUND',
        errorObject: error,
      },
      data: null,
    });
  });

  test('should return error if error occurs while fetching', async () => {
    const error = new Error('Some random error');
    fakeDocumentClient.queryError = error;

    const actual = await dynamoDBTableImpl.queryOne({ filterBy: { name: 'Pikachu' } });

    expect(fakeDocumentClient.queryCalledWithArgs).toStrictEqual({
      ExpressionAttributeValues: {
        ':name': 'Pikachu',
      },
      KeyConditionExpression: 'name = :name',
      TableName: tableName,
    });
    expect(actual).toStrictEqual({
      error: {
        message: 'ERROR_WHILE_FETCHING',
        errorObject: error,
      },
      data: null,
    });
  });
});

describe('createOne tests', () => {
  test('should create item if no errors', async () => {
    const item = {
      name: 'Pikachu',
      type: 'thunder',
      strength: 70,
    };

    const result = await dynamoDBTableImpl.createOne({
      data: item,
    });

    expect(fakeDocumentClient.putCalledWithArgs).toStrictEqual({
      Item: item,
      TableName: tableName,
    });
    expect(result).toStrictEqual({ error: null });
  });

  test('should return error if error occurs while creation', async () => {
    const item = {
      name: 'Pikachu',
      type: 'thunder',
      strength: 70,
    };
    const error = new Error('Some error occurred while creating the item');
    fakeDocumentClient.putError = error;

    const result = await dynamoDBTableImpl.createOne({
      data: item,
    });

    expect(fakeDocumentClient.putCalledWithArgs).toStrictEqual({
      Item: item,
      TableName: tableName,
    });
    expect(result).toStrictEqual({
      error: {
        message: 'CREATION_FAILED',
        errorObject: error,
      },
    });
  });
});
