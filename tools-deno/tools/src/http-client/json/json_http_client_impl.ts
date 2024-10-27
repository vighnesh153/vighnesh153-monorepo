import { milliseconds } from "@/utils/mod.ts";
import type {
  JsonHttpClient,
  JsonHttpGetRequest,
  JsonHttpPostRequest,
  JsonHttpRequest,
  JsonHttpRequestExecutor,
  JsonHttpResponseMiddleware,
} from "./json_http_client.ts";
import { JsonHttpResponse } from "./json_http_response.ts";
import type { HttpQueryParameters } from "../common.ts";

export const JSON_HTTP_CLIENT_TIMEOUT: number = milliseconds({ seconds: 10 });

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
    responseMiddleWare?: JsonHttpResponseMiddleware<TResponse>,
  ): JsonHttpRequestExecutor<TResponse> {
    return this.makeRequestExecutor(
      { timeoutMillis: JSON_HTTP_CLIENT_TIMEOUT, method: "get", ...request },
      responseMiddleWare,
    );
  }

  post<TRequest, TResponse>(
    request: JsonHttpPostRequest<TRequest>,
    responseMiddleWare?: JsonHttpResponseMiddleware<TResponse>,
  ): JsonHttpRequestExecutor<TResponse> {
    return this.makeRequestExecutor(
      { timeoutMillis: JSON_HTTP_CLIENT_TIMEOUT, method: "post", ...request },
      responseMiddleWare,
    );
  }

  private makeRequestExecutor<TRequest, TResponse>(
    request: JsonHttpRequest<TRequest>,
    responseMiddleWare?: JsonHttpResponseMiddleware<TResponse>,
  ): JsonHttpRequestExecutor<TResponse> {
    const params = this.constructUrlSearchParams(request.queryParameters);
    const abortController = new AbortController();
    const { timeoutMillis } = request;
    const timeout = setTimeout(
      () =>
        abortController.abort(
          new Error(`Request timed out after ${timeoutMillis} milliseconds.`),
        ),
      timeoutMillis,
    );
    const cancelTimeoutAbort = () => clearTimeout(timeout);
    return {
      abort(reason) {
        cancelTimeoutAbort();
        abortController.abort(reason);
      },
      execute: async () => {
        try {
          const requestOptions = this.constructRequestOptions(
            request,
            abortController,
          );
          const response = await fetch(
            this.constructUrl(request.path, params).toString(),
            requestOptions,
          );
          cancelTimeoutAbort();

          // custom response middleware
          if (responseMiddleWare) {
            return responseMiddleWare(response);
          }

          return this.constructPromiseResolutionResponse(response);
        } catch (e) {
          return this.constructPromiseRejectionResponse<TResponse>(
            e,
            abortController.signal,
          );
        }
      },
    };
  }

  private constructUrl(
    path: string,
    searchParams: URLSearchParams = new URLSearchParams(),
  ): URL {
    // absolute path
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return new URL(`${path}?${searchParams}`);
    }
    return new URL(`${this.baseUrl}${path}?${searchParams}`);
  }

  private constructUrlSearchParams(
    queryParameters?: HttpQueryParameters | null,
  ): URLSearchParams {
    const queryParametersProcessed = queryParameters ?? {};
    return Object.keys(queryParametersProcessed).reduce(
      (allParams, paramKey) => {
        for (const paramValue of queryParametersProcessed[paramKey] ?? []) {
          allParams.append(paramKey, paramValue);
        }
        return allParams;
      },
      new URLSearchParams(),
    );
  }

  private constructRequestOptions<T>(
    userRequest: JsonHttpRequest<T>,
    abortController: AbortController,
  ): RequestInit {
    const requestConfig: RequestInit = {
      method: userRequest.method,
      headers: userRequest.headers ?? {},
      mode: userRequest.mode,
      credentials: userRequest.credentials,
      signal: abortController.signal,
    };
    requestConfig.headers = {
      accept: "application/json",
      ...requestConfig.headers,
    };
    // no data
    if (userRequest.data == null) {
      return requestConfig;
    }
    // form data
    if (userRequest.data instanceof FormData) {
      // if we set body as FormData, browser will automatically set the content-type header as multipart/form-data
      requestConfig.body = userRequest.data;
      return requestConfig;
    }
    // json data
    requestConfig.body = JSON.stringify(userRequest.data);
    requestConfig.headers = {
      "content-type": "application/json",
      ...requestConfig.headers,
    };
    return requestConfig;
  }

  private async constructPromiseResolutionResponse<T>(
    response: Response,
  ): Promise<JsonHttpResponse<T>> {
    const statusCode = response.status;
    if (response.ok) {
      const jsonResponse = await response.json();
      return new JsonHttpResponse({
        type: "success",
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
          type: "error",
          statusCode,
          errorMessage: "Bad request",
          error: jsonResponse,
        });
      } catch (_e) {
        return new JsonHttpResponse({
          type: "error",
          statusCode,
          errorMessage: textResponse,
          error: null,
        });
      }
    }
    const textResponse = await response.text();
    return new JsonHttpResponse({
      type: "error",
      statusCode,
      errorMessage: "Something went wrong on the server",
      error: textResponse,
    });
  }

  private constructPromiseRejectionResponse<T>(
    error: unknown,
    signal: AbortSignal,
  ): JsonHttpResponse<T> {
    // deno-lint-ignore no-explicit-any
    const errorMessage = (error as any)?.message;

    if (signal.aborted) {
      return new JsonHttpResponse({
        type: "abort",
        reason: error as Error,
        reasonMessage: errorMessage ?? "Aborted with unknown reason.",
      });
    }

    return new JsonHttpResponse({
      type: "error",
      error,
      statusCode: null,
      errorMessage: errorMessage ?? "Some unknown error occurred",
    });
  }
}
