import type {
  DynamoDBTable,
  OptionalCreateMany,
  OptionalCreateOne,
  OptionalGetOne,
} from "./dynamodb_table.ts";
import type { DynamoTypeMap, TableMetadata } from "./table_metadata.ts";

export class FakeDynamoDBTable<T extends TableMetadata>
  implements DynamoDBTable<T> {
  scanOneResult: OptionalGetOne<
    { [key in keyof T["fields"]]: DynamoTypeMap[T["fields"][key]] }
  > = {} as OptionalGetOne<
    { [key in keyof T["fields"]]: DynamoTypeMap[T["fields"][key]] }
  >;
  scanOneCalledTimes = 0;

  queryOneResult: OptionalGetOne<
    { [key in keyof T["fields"]]: DynamoTypeMap[T["fields"][key]] }
  > = {} as OptionalGetOne<
    { [key in keyof T["fields"]]: DynamoTypeMap[T["fields"][key]] }
  >;
  queryOneCalledTimes = 0;

  createOneResult: OptionalCreateOne = { error: null };
  createOneCalledTimes = 0;

  createManyResult: OptionalCreateMany = { error: null };
  createManyCalledTimes = 0;

  // deno-lint-ignore require-await
  async queryOne<TKey extends keyof T["fields"]>(): Promise<
    OptionalGetOne<{ [key in TKey]: DynamoTypeMap[T["fields"][key]] }>
  > {
    this.queryOneCalledTimes += 1;
    return this.queryOneResult;
  }

  // deno-lint-ignore require-await
  async scanOne<TKey extends keyof T["fields"]>(): Promise<
    OptionalGetOne<{ [key in TKey]: DynamoTypeMap[T["fields"][key]] }>
  > {
    this.scanOneCalledTimes += 1;
    return this.scanOneResult;
  }

  // deno-lint-ignore require-await
  async createOne(): Promise<OptionalCreateOne> {
    this.createOneCalledTimes += 1;
    return this.createOneResult;
  }

  // deno-lint-ignore require-await
  async createMany(): Promise<OptionalCreateMany> {
    this.createManyCalledTimes += 1;
    return this.createManyResult;
  }
}
