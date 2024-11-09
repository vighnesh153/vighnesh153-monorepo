import { assertEquals } from "@std/assert";
import { beforeEach, describe, it } from "@std/testing/bdd";
import {
  BatchWriteCommand,
  QueryCommand,
  type ServiceOutputTypes,
} from "@aws-sdk/lib-dynamodb";
import { FakeDynamoDBDocumentClient } from "./fake_dynamodb_document_client.ts";
import { DynamoDBTableImpl } from "./dynamodb_table_impl.ts";
import type { TableMetadata } from "./table_metadata.ts";

const tableName = "Pokemon" as const;
const tableMetadata = {
  tableName,
  fields: {
    name: "string",
    type: "string",
    strength: "number",
  },
} satisfies TableMetadata;
let fakeDocumentClient: FakeDynamoDBDocumentClient;
let dynamoDBTableImpl: DynamoDBTableImpl<typeof tableMetadata>;

beforeEach(() => {
  fakeDocumentClient = new FakeDynamoDBDocumentClient();
  dynamoDBTableImpl = new DynamoDBTableImpl(fakeDocumentClient, tableMetadata);
});

describe("queryOne tests", () => {
  it("should return item if no errors", async () => {
    const result = { name: "pikachu", type: "electric", strength: 60 };
    fakeDocumentClient.sendReturnValues.pushRight({
      Items: [result],
    } as unknown as ServiceOutputTypes);

    const actual = await dynamoDBTableImpl.queryOne({
      filterBy: { name: { value: "Pikachu" } },
    });

    assertEquals(
      fakeDocumentClient.sendCalledWithArgs?.[0]?.input,
      new QueryCommand({
        ExpressionAttributeValues: {
          ":name": "Pikachu",
        },
        KeyConditionExpression: "name = :name",
        TableName: tableName,
      }).input,
    );
    assertEquals(fakeDocumentClient.sendCalledWithArgs?.[1], undefined);
    assertEquals(actual, {
      error: null,
      data: { ...result },
    });
  });

  it("should return error if item not found", async () => {
    fakeDocumentClient.sendReturnValues.pushRight({
      Items: [],
    } as unknown as ServiceOutputTypes);

    const actual = await dynamoDBTableImpl.queryOne({
      filterBy: { name: { value: "Pikachu" } },
    });

    assertEquals(
      fakeDocumentClient.sendCalledWithArgs?.[0]?.input,
      new QueryCommand({
        ExpressionAttributeValues: {
          ":name": "Pikachu",
        },
        KeyConditionExpression: "name = :name",
        TableName: tableName,
      }).input,
    );
    assertEquals(fakeDocumentClient.sendCalledWithArgs?.[1], undefined);
    assertEquals(actual, {
      error: {
        message: "OBJECT_NOT_FOUND",
        errorObject: null,
      },
      data: null,
    });
  });

  it("should return error if error occurs while fetching", async () => {
    const error = new Error("Some random error");
    fakeDocumentClient.sendError = error;

    const actual = await dynamoDBTableImpl.queryOne({
      filterBy: { name: { value: "Pikachu" } },
    });

    assertEquals(
      fakeDocumentClient.sendCalledWithArgs?.[0]?.input,
      new QueryCommand({
        ExpressionAttributeValues: {
          ":name": "Pikachu",
        },
        KeyConditionExpression: "name = :name",
        TableName: tableName,
      }).input,
    );
    assertEquals(fakeDocumentClient.sendCalledWithArgs?.[1], undefined);
    assertEquals(actual, {
      error: {
        message: "ERROR_WHILE_FETCHING",
        errorObject: error,
      },
      data: null,
    });
  });
});

describe("createOne tests", () => {
  it("should create item if no errors", async () => {
    const item = {
      name: "Pikachu",
      type: "thunder",
      strength: 70,
    };
    fakeDocumentClient.sendReturnValues.pushRight(
      {} as unknown as ServiceOutputTypes,
    );

    const result = await dynamoDBTableImpl.createOne({
      data: item,
    });

    assertEquals(
      fakeDocumentClient.sendCalledWithArgs?.[0]?.input,
      new BatchWriteCommand({
        RequestItems: {
          [tableName]: [
            {
              PutRequest: {
                Item: item,
              },
            },
          ],
        },
      }).input,
    );
    assertEquals(fakeDocumentClient.sendCalledWithArgs?.[1], undefined);
    assertEquals(result, { error: null });
  });

  it("should return error if error occurs while creation", async () => {
    const item = {
      name: "Pikachu",
      type: "thunder",
      strength: 70,
    };
    const error = new Error("Some error occurred while creating the item");
    fakeDocumentClient.sendError = error;

    const result = await dynamoDBTableImpl.createOne({
      data: item,
    });

    assertEquals(
      fakeDocumentClient.sendCalledWithArgs?.[0]?.input,
      new BatchWriteCommand({
        RequestItems: {
          [tableName]: [
            {
              PutRequest: {
                Item: item,
              },
            },
          ],
        },
      }).input,
    );
    assertEquals(fakeDocumentClient.sendCalledWithArgs?.[1], undefined);
    assertEquals(result, {
      error: {
        message: "CREATION_FAILED",
        errorObject: error,
      },
    });
  });
});
