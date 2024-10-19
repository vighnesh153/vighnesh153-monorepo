import { not } from "@/utils/mod.ts";

export type JsonHttpResponseSuccessValue<T> = {
  type: "success";
  statusCode: number;
  headers: Headers;
  data: T;
};

export type JsonHttpResponseErrorValue = {
  type: "error";
  statusCode: number | null;
  error: unknown;
  errorMessage: string;
};

export type JsonHttpResponseAbortValue = {
  type: "abort";
  reasonMessage: string;
  reason: Error;
};

export type JsonHttpResponseValue<T> =
  | JsonHttpResponseSuccessValue<T>
  | JsonHttpResponseErrorValue
  | JsonHttpResponseAbortValue;

export class JsonHttpResponse<T> {
  constructor(private value: JsonHttpResponseValue<T>) {}

  isSuccess(): boolean {
    return this.value.type === "success";
  }

  isError(): boolean {
    return this.value.type === "error";
  }

  isAbort(): boolean {
    return this.value.type === "abort";
  }

  getSuccessResponse(): JsonHttpResponseSuccessValue<T> {
    if (not(this.isSuccess())) {
      throw new Error("Not a success response");
    }
    return this.value as JsonHttpResponseSuccessValue<T>;
  }

  getErrorResponse(): JsonHttpResponseErrorValue {
    if (not(this.isError())) {
      throw new Error("Not an error response");
    }
    return this.value as JsonHttpResponseErrorValue;
  }

  getAbortResponse(): JsonHttpResponseAbortValue {
    if (not(this.isAbort())) {
      throw new Error("Request is not aborted");
    }
    return this.value as JsonHttpResponseAbortValue;
  }
}
