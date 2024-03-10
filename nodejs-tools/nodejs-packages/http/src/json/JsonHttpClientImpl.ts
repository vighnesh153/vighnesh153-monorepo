import {
  JsonHttpClient,
  JsonHttpGetRequest,
  JsonHttpRequestExecutor,
  JsonHttpResponseMiddleware,
  JsonHttpPostRequest,
  JsonHttpRequest,
} from './JsonHttpClient';
import { JsonHttpResponse } from './JsonHttpResponse';
import { HttpQueryParameters } from '../common';

export interface JsonHttpClientImplProps {
  baseUrl: string;
}

export class JsonHttpClientImpl implements JsonHttpClient {
  private baseUrl: string;

  constructor(props: JsonHttpClientImplProps) {
    this.baseUrl = props.baseUrl;
  }

  get<TResponse>(
    request: JsonHttpGetRequest,
    responseMiddleWare?: JsonHttpResponseMiddleware<TResponse>
  ): JsonHttpRequestExecutor<TResponse> {
    return this.makeRequestExecutor({ ...request, method: 'get' }, responseMiddleWare);
  }

  post<TRequest, TResponse>(
    request: JsonHttpPostRequest<TRequest>,
    responseMiddleWare?: JsonHttpResponseMiddleware<TResponse>
  ): JsonHttpRequestExecutor<TResponse> {
    return this.makeRequestExecutor({ ...request, method: 'post' }, responseMiddleWare);
  }

  private makeRequestExecutor<TRequest, TResponse>(
    request: JsonHttpRequest<TRequest>,
    responseMiddleWare?: JsonHttpResponseMiddleware<TResponse>
  ): JsonHttpRequestExecutor<TResponse> {
    const params = this.constructUrlSearchParams(request.queryParameters);
    const abortController = new AbortController();
    return {
      abortController,
      execute: async () => {
        try {
          const requestOptions = this.constructRequestOptions(request, abortController);
          const response = await fetch(this.constructUrl(request.path, params).toString(), requestOptions);

          // custom response middleware
          if (responseMiddleWare) {
            return responseMiddleWare(response);
          }

          return this.constructPromiseResolutionResponse(response);
        } catch (e) {
          return this.constructPromiseRejectionResponse<TResponse>(e);
        }
      },
    };
  }

  private constructUrl(path: string, searchParams: URLSearchParams = new URLSearchParams()): URL {
    // absolute path
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return new URL(`${path}?${searchParams}`);
    }
    return new URL(`${this.baseUrl}${path}?${searchParams}`);
  }

  private constructUrlSearchParams(queryParameters?: HttpQueryParameters | null): URLSearchParams {
    const queryParametersProcessed = queryParameters ?? {};
    return Object.keys(queryParametersProcessed).reduce((allParams, paramKey) => {
      for (const paramValue of queryParametersProcessed[paramKey] ?? []) {
        allParams.append(paramKey, paramValue);
      }
      return allParams;
    }, new URLSearchParams());
  }

  private constructRequestOptions<T>(userRequest: JsonHttpRequest<T>, abortController: AbortController): RequestInit {
    const requestConfig: RequestInit = {
      method: userRequest.method,
      headers: userRequest.headers ?? {},
      mode: userRequest.mode,
      credentials: userRequest.credentials,
      signal: abortController.signal,
    };
    requestConfig.headers = {
      accept: 'application/json',
      ...requestConfig.headers,
    };
    if (userRequest.data != null) {
      requestConfig.body = JSON.stringify(userRequest.data);
      requestConfig.headers = {
        'content-type': 'application/json',
        ...requestConfig.headers,
      };
    }
    return requestConfig;
  }

  private async constructPromiseResolutionResponse<T>(response: Response): Promise<JsonHttpResponse<T>> {
    const statusCode = response.status;
    if (response.ok) {
      const jsonResponse = await response.json();
      return new JsonHttpResponse({
        type: 'success',
        statusCode: response.status,
        data: jsonResponse as T,
        headers: response.headers,
      });
    }
    if (400 <= statusCode && statusCode < 500) {
      const textResponse = await response.text();
      try {
        const jsonResponse = JSON.parse(textResponse);
        return new JsonHttpResponse({
          type: 'error',
          statusCode,
          errorMessage: 'Bad request',
          error: jsonResponse,
        });
      } catch (e) {
        return new JsonHttpResponse({
          type: 'error',
          statusCode,
          errorMessage: textResponse,
          error: null,
        });
      }
    }
    const textResponse = await response.text();
    return new JsonHttpResponse({
      type: 'error',
      statusCode,
      errorMessage: 'Something went wrong on the server',
      error: textResponse,
    });
  }

  private async constructPromiseRejectionResponse<T>(error: unknown): Promise<JsonHttpResponse<T>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorMessage = (error as any).message;
    return new JsonHttpResponse({
      type: 'error',
      error,
      statusCode: null,
      errorMessage: errorMessage ?? 'Some unknown error occurred',
    });
  }
}
