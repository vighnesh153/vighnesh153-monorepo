import { DynamoTypeMap, TableMetadata } from './TableMetadata';

export type Optional<T> =
  | { data: T; error: null }
  | { data: null; error: { message: 'OBJECT_NOT_FOUND' | 'ERROR_WHILE_FETCHING'; errorObject: unknown } };

export interface DynamoDBTable<T extends TableMetadata> {
  getOne: <TKey extends keyof T['fields'], TFilterBy extends keyof T['fields']>(params: {
    filterBy: { [key in TFilterBy]: DynamoTypeMap[T['fields'][key]] };
  }) => Promise<Optional<{ [key in TKey]: DynamoTypeMap[T['fields'][key]] }>>;
}
