import { DynamoDB } from 'aws-sdk';
import { DynamoTypeMap, TableMetadata } from './TableMetadata';
import { DynamoDBTable, OptionalQueryOne, OptionalCreateOne } from './DynamoDBTable';

export class DynamoDBTableImpl<T extends TableMetadata> implements DynamoDBTable<T> {
  constructor(
    private client: DynamoDB.DocumentClient,
    private tableMetadata: T
  ) {}

  async queryOne<TKey extends keyof T['fields'], TFilterBy extends keyof T['fields']>(params: {
    filterBy: { [key in TFilterBy]: DynamoTypeMap[T['fields'][key]] };
  }): Promise<OptionalQueryOne<{ [key in TKey]: DynamoTypeMap[T['fields'][key]] }>> {
    const keys = Object.keys(params.filterBy) as Array<TFilterBy>;
    const expressionAttributeValues = keys
      // Expected attribute values format:
      // { ":email": { S: "email@email.com" }, ":age": { N: 25 } }
      .reduce(
        (exprAttrValues, key) => {
          const value = params.filterBy[key];
          const formattedKey = `:${String(key)}`;
          switch (typeof value) {
            case 'number':
            case 'string':
              exprAttrValues[formattedKey] = value;
              break;
            default:
              throw new Error(`Unknown value type: "${typeof value}"`);
          }
          return exprAttrValues;
        },
        {} as Record<string, unknown>
      );
    const keyConditionExpression = (keys as string[]).map((key) => `${key} = :${key}`).join(' and ');
    const processedParams: DynamoDB.DocumentClient.QueryInput = {
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      TableName: this.tableMetadata.tableName,
    };
    try {
      const result = await this.client.query(processedParams).promise();
      const item = result.Items?.[0] ?? null;
      if (item != null) {
        return {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: item as any,
          error: null,
        };
      }
      return {
        data: null,
        error: {
          message: 'OBJECT_NOT_FOUND',
          errorObject: result.$response.error,
        },
      };
    } catch (e) {
      return {
        data: null,
        error: {
          message: 'ERROR_WHILE_FETCHING',
          errorObject: e,
        },
      };
    }
  }

  async createOne<TField extends keyof T['fields']>(params: {
    data: { [key in TField]: DynamoTypeMap[T['fields'][key]] };
  }): Promise<OptionalCreateOne> {
    try {
      await this.client.put({ TableName: this.tableMetadata.tableName, Item: params.data }).promise();
      return { error: null };
    } catch (e) {
      return {
        error: {
          message: 'CREATION_FAILED',
          errorObject: e,
        },
      };
    }
  }
}
