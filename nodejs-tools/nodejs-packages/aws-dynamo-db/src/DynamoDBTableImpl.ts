import { DynamoDB } from 'aws-sdk';
import { DynamoTypeMap, TableMetadata } from './TableMetadata';
import { DynamoDBTable, Optional } from './DynamoDBTable';

export class DynamoDBTableImpl<T extends TableMetadata> implements DynamoDBTable<T> {
  constructor(
    private client: DynamoDB.DocumentClient,
    private tableMetadata: T
  ) {}

  async getOne<TKey extends keyof T['fields'], TFilterBy extends keyof T['fields']>(params: {
    filterBy: { [key in TFilterBy]: DynamoTypeMap[T['fields'][key]] };
  }): Promise<Optional<{ [key in TKey]: DynamoTypeMap[T['fields'][key]] }>> {
    const processedParams: DynamoDB.DocumentClient.GetItemInput = {
      Key: params.filterBy,
      TableName: this.tableMetadata.tableName,
    };
    try {
      const result = await this.client.get(processedParams).promise();
      if (result.Item) {
        return {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: result.Item as any,
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

  async createOne(): Promise<void> {
    // const result = await this.client.query()
  }
}
