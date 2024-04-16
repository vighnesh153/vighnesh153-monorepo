import { beforeEach, describe, expect, test } from 'vitest';
import { type ServiceOutputTypes, QueryCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
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
    fakeDocumentClient.sendReturnValues.pushRight({
      Items: [result],
    } as unknown as ServiceOutputTypes);

    const actual = await dynamoDBTableImpl.queryOne({
      filterBy: { name: { value: 'Pikachu' } },
    });

    expect(fakeDocumentClient.sendCalledWithArgs?.[0]?.input).toStrictEqual(
      new QueryCommand({
        ExpressionAttributeValues: {
          ':name': 'Pikachu',
        },
        KeyConditionExpression: 'name = :name',
        TableName: tableName,
      }).input
    );
    expect(fakeDocumentClient.sendCalledWithArgs?.[1]).toStrictEqual(undefined);
    expect(actual).toStrictEqual({
      error: null,
      data: { ...result },
    });
  });

  test('should return error if item not found', async () => {
    fakeDocumentClient.sendReturnValues.pushRight({
      Items: [],
    } as unknown as ServiceOutputTypes);

    const actual = await dynamoDBTableImpl.queryOne({ filterBy: { name: { value: 'Pikachu' } } });

    expect(fakeDocumentClient.sendCalledWithArgs?.[0]?.input).toStrictEqual(
      new QueryCommand({
        ExpressionAttributeValues: {
          ':name': 'Pikachu',
        },
        KeyConditionExpression: 'name = :name',
        TableName: tableName,
      }).input
    );
    expect(fakeDocumentClient.sendCalledWithArgs?.[1]).toStrictEqual(undefined);
    expect(actual).toStrictEqual({
      error: {
        message: 'OBJECT_NOT_FOUND',
        errorObject: null,
      },
      data: null,
    });
  });

  test('should return error if error occurs while fetching', async () => {
    const error = new Error('Some random error');
    fakeDocumentClient.sendError = error;

    const actual = await dynamoDBTableImpl.queryOne({ filterBy: { name: { value: 'Pikachu' } } });

    expect(fakeDocumentClient.sendCalledWithArgs?.[0]?.input).toStrictEqual(
      new QueryCommand({
        ExpressionAttributeValues: {
          ':name': 'Pikachu',
        },
        KeyConditionExpression: 'name = :name',
        TableName: tableName,
      }).input
    );
    expect(fakeDocumentClient.sendCalledWithArgs?.[1]).toStrictEqual(undefined);
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
    fakeDocumentClient.sendReturnValues.pushRight({} as unknown as ServiceOutputTypes);

    const result = await dynamoDBTableImpl.createOne({
      data: item,
    });

    expect(fakeDocumentClient.sendCalledWithArgs?.[0]?.input).toStrictEqual(
      new PutCommand({
        Item: item,
        TableName: tableName,
      }).input
    );
    expect(fakeDocumentClient.sendCalledWithArgs?.[1]).toStrictEqual(undefined);
    expect(result).toStrictEqual({ error: null });
  });

  test('should return error if error occurs while creation', async () => {
    const item = {
      name: 'Pikachu',
      type: 'thunder',
      strength: 70,
    };
    const error = new Error('Some error occurred while creating the item');
    fakeDocumentClient.sendError = error;

    const result = await dynamoDBTableImpl.createOne({
      data: item,
    });

    expect(fakeDocumentClient.sendCalledWithArgs?.[0]?.input).toStrictEqual(
      new PutCommand({
        Item: item,
        TableName: tableName,
      }).input
    );
    expect(fakeDocumentClient.sendCalledWithArgs?.[1]).toStrictEqual(undefined);
    expect(result).toStrictEqual({
      error: {
        message: 'CREATION_FAILED',
        errorObject: error,
      },
    });
  });
});
