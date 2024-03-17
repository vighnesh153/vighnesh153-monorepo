import { JsonHttpClient, JsonHttpRequestExecutor } from './JsonHttpClient';
import { JsonHttpResponse } from './JsonHttpResponse';

export class FakeJsonHttpClient implements JsonHttpClient {
  private getRequestExecutor: JsonHttpRequestExecutor<unknown> | null = null;
  private postRequestExecutor: JsonHttpRequestExecutor<unknown> | null = null;

  get<TResponse>(): JsonHttpRequestExecutor<TResponse> {
    if (this.getRequestExecutor === null) {
      throw new Error('Not implemented');
    }
    return this.getRequestExecutor as JsonHttpRequestExecutor<TResponse>;
  }

  post<TResponse>(): JsonHttpRequestExecutor<TResponse> {
    if (this.postRequestExecutor === null) {
      throw new Error('Not implemented');
    }
    return this.postRequestExecutor as JsonHttpRequestExecutor<TResponse>;
  }

  // utils
  setGetRequestResponse<TResponse>(executeFn: () => Promise<JsonHttpResponse<TResponse>>) {
    this.getRequestExecutor = {
      abortController: new AbortController(),
      execute: executeFn,
    };
  }

  setPostRequestResponse<TResponse>(executeFn: () => Promise<JsonHttpResponse<TResponse>>) {
    this.postRequestExecutor = {
      abortController: new AbortController(),
      execute: executeFn,
    };
  }

  setGetRequestExecutor<TResponse>(response: JsonHttpRequestExecutor<TResponse>) {
    this.getRequestExecutor = response;
  }

  setPostRequestExecutor<TResponse>(response: JsonHttpRequestExecutor<TResponse>) {
    this.postRequestExecutor = response;
  }
}
