import { type Handler } from 'aws-lambda';
import { LambdaRequestPayload } from '@vighnesh153/tools-platform-independent';
import { controller } from './controller';

export const handler: Handler<LambdaRequestPayload> = async (request) =>
  controller({ searchParameters: request.filterParams });
