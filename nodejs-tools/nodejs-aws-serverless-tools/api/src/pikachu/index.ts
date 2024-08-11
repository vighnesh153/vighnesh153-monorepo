import { type Handler } from 'aws-lambda';

type LambdaResponse = {
  statusCode: number;
  body?: string;
  headers?: Record<string, string>;
};

export const handler: Handler = (request: unknown) =>
  Promise.resolve({
    statusCode: 201,
    body: JSON.stringify({ requestData: request, env: process.env }),
    headers: {
      pikachu: 'pika-cookie',
    },
  } satisfies LambdaResponse);
