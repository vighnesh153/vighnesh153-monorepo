import { DynamoTypeMap, TableMetadata } from './TableMetadata.ts';

export type OptionalGetOne<T> =
  | { data: T; error: null }
  | { data: null; error: { message: 'OBJECT_NOT_FOUND' | 'ERROR_WHILE_FETCHING'; errorObject: unknown } };

export type OptionalCreateOne = { error: null } | { error: { message: 'CREATION_FAILED'; errorObject: unknown } };

export interface DynamoDBTable<T extends TableMetadata> {
  queryOne: <TKey extends keyof T['fields'], TFilterBy extends keyof T['fields']>(params: {
    filterBy: {
      [key in TFilterBy]: {
        value: DynamoTypeMap[T['fields'][key]];
        filterExpression?: (key: string) => string;
      };
    };
  }) => Promise<OptionalGetOne<{ [key in TKey]: DynamoTypeMap[T['fields'][key]] }>>;

  createOne<TField extends keyof T['fields']>(params: {
    data: { [key in TField]: DynamoTypeMap[T['fields'][key]] };
  }): Promise<OptionalCreateOne>;

  scanOne: <TKey extends keyof T['fields'], TFilterBy extends keyof T['fields']>(params: {
    filterBy: {
      [key in TFilterBy]: {
        value: DynamoTypeMap[T['fields'][key]];
        filterExpression?: (key: string) => string;
      };
    };
  }) => Promise<OptionalGetOne<{ [key in TKey]: DynamoTypeMap[T['fields'][key]] }>>;
}
