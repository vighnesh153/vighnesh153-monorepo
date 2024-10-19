import type { JsonHttpResponse } from "./json_http_response.ts";
import type { HttpQueryParameters } from "../common.ts";

export interface JsonHttpRequest<T> {
  method?: "get" | "post";
  path: string;
  data?: T;
  queryParameters?: HttpQueryParameters | null;
  headers?: Record<string, string> | null;
  mode?: RequestMode;
  credentials?: RequestCredentials;
  timeoutMillis?: number;
}

export type JsonHttpGetRequest = Omit<
  JsonHttpRequest<unknown>,
  "data" | "method"
>;

export type JsonHttpPostRequest<T> = Omit<
  JsonHttpRequest<T> & Required<Pick<JsonHttpRequest<T>, "data">>,
  "method"
>;

export interface JsonHttpRequestExecutor<T> {
  abort: (reason: Error) => void;
  execute(): Promise<JsonHttpResponse<T>>;
}

export type JsonHttpResponseMiddleware<T> = (
  response: Response,
) => JsonHttpResponse<T>;

export interface JsonHttpClient {
  get<TResponse>(
    request: JsonHttpGetRequest,
    responseMiddleWare?: JsonHttpResponseMiddleware<TResponse>,
  ): JsonHttpRequestExecutor<TResponse>;
  post<TRequest, TResponse>(
    request: JsonHttpPostRequest<TRequest>,
    responseMiddleWare?: JsonHttpResponseMiddleware<TResponse>,
  ): JsonHttpRequestExecutor<TResponse>;
}
