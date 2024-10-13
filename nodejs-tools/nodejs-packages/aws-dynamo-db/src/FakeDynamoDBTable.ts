import { DynamoDBTable, OptionalCreateOne, OptionalGetOne } from './DynamoDBTable';
import { DynamoTypeMap, TableMetadata } from './TableMetadata';

export class FakeDynamoDBTable<T extends TableMetadata> implements DynamoDBTable<T> {
  scanOneResult: OptionalGetOne<{ [key in keyof T['fields']]: DynamoTypeMap[T['fields'][key]] }> =
    {} as OptionalGetOne<{ [key in keyof T['fields']]: DynamoTypeMap[T['fields'][key]] }>;
  scanOneCalledTimes = 0;

  queryOneResult: OptionalGetOne<{ [key in keyof T['fields']]: DynamoTypeMap[T['fields'][key]] }> =
    {} as OptionalGetOne<{ [key in keyof T['fields']]: DynamoTypeMap[T['fields'][key]] }>;
  queryOneCalledTimes = 0;

  createOneResult: OptionalCreateOne = { error: null };
  createOneCalledTimes = 0;

  async queryOne<TKey extends keyof T['fields']>(): Promise<
    OptionalGetOne<{ [key in TKey]: DynamoTypeMap[T['fields'][key]] }>
  > {
    this.queryOneCalledTimes += 1;
    return this.queryOneResult;
  }

  async scanOne<TKey extends keyof T['fields']>(): Promise<
    OptionalGetOne<{ [key in TKey]: DynamoTypeMap[T['fields'][key]] }>
  > {
    this.scanOneCalledTimes += 1;
    return this.scanOneResult;
  }

  async createOne(): Promise<OptionalCreateOne> {
    this.createOneCalledTimes += 1;
    return this.createOneResult;
  }
}
