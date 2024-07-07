import http2 from 'node:http2';
import { constructAuthRedirectUrl } from './constructAuthRedirectUrl';

type LambdaResponse = {
  statusCode: number;
  body?: string;
  headers?: Record<string, string>;
};

export function controller(authRedirectUrlConstructor: () => string | null = constructAuthRedirectUrl): LambdaResponse {
  const authRedirectUrl = authRedirectUrlConstructor();
  if (authRedirectUrl === null) {
    return {
      statusCode: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      body: 'Auth redirect url is empty',
    };
  }
  return {
    statusCode: http2.constants.HTTP_STATUS_TEMPORARY_REDIRECT,
    headers: {
      Location: authRedirectUrl,
    },
  };
}
