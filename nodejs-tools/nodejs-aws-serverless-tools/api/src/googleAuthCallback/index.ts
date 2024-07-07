import { type Handler } from 'aws-lambda';
import { controller } from './controller';

export const handler: Handler<{ queryStringParameters: Record<string, string> }> = async (event) =>
  controller({ searchParameters: event.queryStringParameters });
