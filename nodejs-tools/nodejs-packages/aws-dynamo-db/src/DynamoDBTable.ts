import { DynamoTypeMap, TableMetadata } from './TableMetadata';

export type OptionalQueryOne<T> =
  | { data: T; error: null }
  | { data: null; error: { message: 'OBJECT_NOT_FOUND' | 'ERROR_WHILE_FETCHING'; errorObject: unknown } };

export type OptionalCreateOne = { error: null } | { error: { message: 'CREATION_FAILED'; errorObject: unknown } };

export interface DynamoDBTable<T extends TableMetadata> {
  queryOne: <TKey extends keyof T['fields'], TFilterBy extends keyof T['fields']>(params: {
    filterBy: { [key in TFilterBy]: DynamoTypeMap[T['fields'][key]] };
  }) => Promise<OptionalQueryOne<{ [key in TKey]: DynamoTypeMap[T['fields'][key]] }>>;

  createOne<TField extends keyof T['fields']>(params: {
    data: { [key in TField]: DynamoTypeMap[T['fields'][key]] };
  }): Promise<OptionalCreateOne>;
}
