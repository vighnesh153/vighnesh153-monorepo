import { MongooseDuplicateErrorCode } from '@lib/mongoose/constants';

export function isDuplicateMongooseDocument(e: unknown): boolean {
  const error = e as { code: number } | undefined;
  return error?.code === MongooseDuplicateErrorCode;
}
