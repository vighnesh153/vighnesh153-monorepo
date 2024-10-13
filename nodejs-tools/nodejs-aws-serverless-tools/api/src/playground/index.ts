import * as http2 from 'node:http2';
import { type Handler } from 'aws-lambda';
import { HttpHeaderKeys, HttpHeaderValues, LambdaRequestPayload } from '@vighnesh153/tools-platform-independent';

export const handler: Handler<LambdaRequestPayload> = async (request) => {
  console.log('Playground request:', request);
  return {
    statusCode: http2.constants.HTTP_STATUS_TEMPORARY_REDIRECT,
    cookies: [],
    body: JSON.stringify({ request }),
    headers: {
      [HttpHeaderKeys.contentType]: HttpHeaderValues.contentType.applicationJson,
    },
  };
};
