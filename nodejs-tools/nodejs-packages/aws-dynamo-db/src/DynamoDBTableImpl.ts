import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoTypeMap, TableMetadata } from './TableMetadata';
import { DynamoDBTable, OptionalQueryOne, OptionalCreateOne } from './DynamoDBTable';
import { IDynamoDBDocumentClient } from './IDynamoDBDocumentClient';

export class DynamoDBTableImpl<T extends TableMetadata> implements DynamoDBTable<T> {
  constructor(
    private client: IDynamoDBDocumentClient,
    private tableMetadata: T
  ) {}

  async queryOne<TKey extends keyof T['fields'], TFilterBy extends keyof T['fields']>(params: {
    filterBy: {
      [key in TFilterBy]: {
        value: DynamoTypeMap[T['fields'][key]];
        filterExpression?: (key: string) => string;
      };
    };
  }): Promise<OptionalQueryOne<{ [key in TKey]: DynamoTypeMap[T['fields'][key]] }>> {
    const keys = Object.keys(params.filterBy) as Array<TFilterBy>;
    const expressionAttributeValues = keys
      // Expected attribute values format:
      // { ":email": "email@email.com", ":age": 25 }
      .reduce(
        (exprAttrValues, key) => {
          const { value } = params.filterBy[key];
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
    const keyConditionExpression = (keys as string[])
      .map((key) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const { filterExpression = equalityFilterExpression } = params.filterBy[key as TFilterBy];
        return filterExpression(key);
      })
      .join(' and ');
    const queryCommand = new QueryCommand({
      TableName: this.tableMetadata.tableName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: expressionAttributeValues,
    });
    try {
      const result = await this.client.send(queryCommand);
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
          errorObject: null,
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
      await this.client.send(new PutCommand({ TableName: this.tableMetadata.tableName, Item: params.data }));
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

function equalityFilterExpression(key: string): string {
  return `${key} = :${key}`;
}
