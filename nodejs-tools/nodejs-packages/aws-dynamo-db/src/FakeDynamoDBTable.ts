import { DynamoDBTable, OptionalCreateOne, OptionalQueryOne } from './DynamoDBTable';
import { DynamoTypeMap, TableMetadata } from './TableMetadata';

export class FakeDynamoDBTable<T extends TableMetadata> implements DynamoDBTable<T> {
  queryOneResult: OptionalQueryOne<{ [key in keyof T['fields']]: DynamoTypeMap[T['fields'][key]] }> =
    {} as OptionalQueryOne<{ [key in keyof T['fields']]: DynamoTypeMap[T['fields'][key]] }>;
  queryOneCalledTimes = 0;

  createOneResult: OptionalCreateOne = { error: null };
  createOneCalledTimes = 0;

  async queryOne<TKey extends keyof T['fields']>(): Promise<
    OptionalQueryOne<{ [key in TKey]: DynamoTypeMap[T['fields'][key]] }>
  > {
    this.queryOneCalledTimes += 1;
    return this.queryOneResult;
  }

  async createOne(): Promise<OptionalCreateOne> {
    this.createOneCalledTimes += 1;
    return this.createOneResult;
  }
}
