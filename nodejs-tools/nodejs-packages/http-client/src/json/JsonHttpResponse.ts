import { not } from '@vighnesh153/utils';

export type JsonHttpResponseSuccessValue<T> = {
  type: 'success';
  statusCode: number;
  headers: Headers;
  data: T;
};

export type JsonHttpResponseErrorValue = {
  type: 'error';
  statusCode: number | null;
  error: unknown;
  errorMessage: string;
};

export type JsonHttpResponseValue<T> = JsonHttpResponseSuccessValue<T> | JsonHttpResponseErrorValue;

export class JsonHttpResponse<T> {
  constructor(private value: JsonHttpResponseValue<T>) {}

  isSuccess(): boolean {
    return this.value.type === 'success';
  }

  isError(): boolean {
    return this.value.type === 'error';
  }

  getSuccessResponse(): JsonHttpResponseSuccessValue<T> {
    if (not(this.isSuccess())) {
      throw new Error('Not a success response');
    }
    return this.value as JsonHttpResponseSuccessValue<T>;
  }

  getErrorResponse(): JsonHttpResponseErrorValue {
    if (not(this.isError())) {
      throw new Error('Not an error response');
    }
    return this.value as JsonHttpResponseErrorValue;
  }
}
