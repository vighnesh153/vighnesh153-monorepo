import { DynamoDBTable, OptionalCreateOne, OptionalQueryOne } from './DynamoDBTable';
import { DynamoTypeMap, TableMetadata } from './TableMetadata';

export class FakeDynamoDBTable<T extends TableMetadata> implements DynamoDBTable<T> {
  queryOneResult: OptionalQueryOne<{ [key in keyof T['fields']]: DynamoTypeMap[T['fields'][key]] }> =
    {} as OptionalQueryOne<{ [key in keyof T['fields']]: DynamoTypeMap[T['fields'][key]] }>;

  createOneResult: OptionalCreateOne = { error: null };

  async queryOne<TKey extends keyof T['fields']>(): Promise<
    OptionalQueryOne<{ [key in TKey]: DynamoTypeMap[T['fields'][key]] }>
  > {
    return this.queryOneResult;
  }

  async createOne(): Promise<OptionalCreateOne> {
    return this.createOneResult;
  }
}
