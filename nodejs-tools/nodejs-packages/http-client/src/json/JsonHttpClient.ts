import { JsonHttpResponse } from './JsonHttpResponse';
import { HttpQueryParameters } from '../common';

export interface JsonHttpRequest<T> {
  method?: 'get' | 'post';
  path: string;
  data?: T;
  queryParameters?: HttpQueryParameters | null;
  headers?: Record<string, string> | null;
  mode?: RequestMode;
  credentials?: RequestCredentials;
}

export type JsonHttpGetRequest = Omit<JsonHttpRequest<unknown>, 'data' | 'method'>;

export type JsonHttpPostRequest<T> = Omit<JsonHttpRequest<T> & Required<Pick<JsonHttpRequest<T>, 'data'>>, 'method'>;

export interface JsonHttpRequestExecutor<T> {
  abortController: AbortController;
  execute(): Promise<JsonHttpResponse<T>>;
}

export type JsonHttpResponseMiddleware<T> = (response: Response) => JsonHttpResponse<T>;

export interface JsonHttpClient {
  get<TResponse>(
    request: JsonHttpGetRequest,
    responseMiddleWare?: JsonHttpResponseMiddleware<TResponse>
  ): JsonHttpRequestExecutor<TResponse>;
  post<TRequest, TResponse>(
    request: JsonHttpPostRequest<TRequest>,
    responseMiddleWare?: JsonHttpResponseMiddleware<TResponse>
  ): JsonHttpRequestExecutor<TResponse>;
}
