import { afterAll, beforeAll, test } from "@std/testing/bdd";
import { assertEquals, assertThrows } from "@std/assert";
import type { Server } from "npm:http";

import { milliseconds } from "@/utils/mod.ts";

import { app } from "./test_server.ts";
import { JsonHttpClientImpl } from "../json_http_client_impl.ts";

let server: Server;
let serverAddress: string = "";

const headers = {
  pokemon1: "pikachu",
  pokemon2: "greninja",
};

const queryParameters = {
  message: ["i am the very best"],
  pokemon: ["pikachu", "greninja"],
};

const receivedSearchParams = {
  message: "i am the very best",
  pokemon: ["pikachu", "greninja"],
};

const postData = {
  name: "Pikachu",
  types: ["thunder", "normal"],
};

const formData = new FormData();
formData.append("pokemon", "pikachu");

const getCommonReceivedHeaders = () => ({
  accept: "application/json",
  "accept-encoding": "gzip,br",
  "accept-language": "*",
  host: serverAddress.slice("http://".length),
  "user-agent": `Deno/${Deno.version.deno}`,
});

const getPostRequestReceivedHeaders = (contentLength = 47) => ({
  "content-length": contentLength.toString(),
  "content-type": "application/json",
});

beforeAll(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, () => {
      const address = server.address();
      if (address == null || typeof address === "string") {
        console.error("Server address is not of type: AddressInfo");
        Deno.exit(1);
      } else {
        serverAddress = `http://localhost:${address.port}`;
      }
      resolve(null);
    });
  });
});

afterAll(async () => {
  await new Promise((resolve) => {
    server.close(() => {
      resolve(null);
    });
  });
});

test("jsonHttpClient: for GET Request, send headers and query parameters through the request", async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.get({ path: "/200", headers, queryParameters });

  const response = await executor.execute();

  assertEquals(response.isSuccess(), true);
  assertEquals(response.isError(), false);
  assertEquals(response.isAbort(), false);
  assertThrows(
    () => response.getErrorResponse(),
    Error,
    "Not an error response",
  );
  assertThrows(
    () => response.getAbortResponse(),
    Error,
    "Request is not aborted",
  );

  const successResponse = response.getSuccessResponse();
  assertEquals(successResponse.type, "success");
  assertEquals(successResponse.statusCode, 200);
  assertEquals(successResponse.data, {
    message: "200",
    receivedHeaders: {
      ...getCommonReceivedHeaders(),
      ...headers,
    },
    receivedSearchParams,
  });
});

test("jsonHttpClient: for GET Request, abort the request if it takes longer than timeout.", async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.get({
    path: `/delay/${milliseconds({ seconds: 3 })}`,
    timeoutMillis: 500,
    headers,
    queryParameters,
  });

  const response = await executor.execute();

  assertEquals(response.isSuccess(), false);
  assertEquals(response.isError(), false);
  assertEquals(response.isAbort(), true);
  assertThrows(
    () => response.getSuccessResponse(),
    Error,
    "Not a success response",
  );
  assertThrows(
    () => response.getErrorResponse(),
    Error,
    "Not an error response",
  );

  const abortResponse = response.getAbortResponse();
  assertEquals(abortResponse.type, "abort");
  assertEquals(
    abortResponse.reasonMessage,
    "Request timed out after 500 milliseconds.",
  );
  assertEquals(
    abortResponse.reason.message,
    new Error("Request timed out after 500 milliseconds.").message,
  );
});

test("jsonHttpClient: for GET Request, send headers and query parameters through the request using absolute url", async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.get({
    path: `${serverAddress}/200`,
    headers,
    queryParameters,
  });

  const response = await executor.execute();

  assertEquals(response.isSuccess(), true);
  assertEquals(response.isError(), false);
  assertEquals(response.isAbort(), false);
  assertThrows(
    () => response.getErrorResponse(),
    Error,
    "Not an error response",
  );
  assertThrows(
    () => response.getAbortResponse(),
    Error,
    "Request is not aborted",
  );

  const successResponse = response.getSuccessResponse();
  assertEquals(successResponse.type, "success");
  assertEquals(successResponse.statusCode, 200);
  assertEquals(successResponse.data, {
    message: "200",
    receivedHeaders: {
      ...getCommonReceivedHeaders(),
      ...headers,
    },
    receivedSearchParams,
  });
});

test("jsonHttpClient: for GET Request, should abort the request", async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.get({ path: "/201", headers, queryParameters });

  const [response] = await Promise.all([
    // actual request (takes 1 second)
    executor.execute(),
    // simulate abort after 100 milliseconds
    new Promise((resolve) => {
      executor.abort(new Error(`Aborting because user changed page.`));
      resolve(null);
    }),
  ]);

  assertEquals(response.isSuccess(), false);
  assertEquals(response.isError(), false);
  assertEquals(response.isAbort(), true);
  assertThrows(
    () => response.getSuccessResponse(),
    Error,
    "Not a success response",
  );
  assertThrows(
    () => response.getErrorResponse(),
    Error,
    "Not an error response",
  );

  const abortResponse = response.getAbortResponse();
  assertEquals(abortResponse.type, "abort");
  assertEquals(
    abortResponse.reasonMessage,
    `Aborting because user changed page.`,
  );
  assertEquals(
    abortResponse.reason.message,
    new Error(`Aborting because user changed page.`).message,
  );
});

test("jsonHttpClient: for GET Request, parse the 4xx response as text error", async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.get({ path: "/401", headers, queryParameters });

  const response = await executor.execute();

  assertEquals(response.isSuccess(), false);
  assertEquals(response.isError(), true);
  assertEquals(response.isAbort(), false);
  assertThrows(
    () => response.getSuccessResponse(),
    Error,
    "Not a success response",
  );
  assertThrows(
    () => response.getAbortResponse(),
    Error,
    "Request is not aborted",
  );

  const errorResponse = response.getErrorResponse();
  assertEquals(errorResponse.type, "error");
  assertEquals(errorResponse.errorMessage, "You are not authenticated");
  assertEquals(errorResponse.error, null);
});

test("jsonHttpClient: for GET Request, parse the 4xx response as json error", async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.get({ path: "/403", headers, queryParameters });

  const response = await executor.execute();

  assertEquals(response.isSuccess(), false);
  assertEquals(response.isError(), true);
  assertEquals(response.isAbort(), false);
  assertThrows(
    () => response.getSuccessResponse(),
    Error,
    "Not a success response",
  );
  assertThrows(
    () => response.getAbortResponse(),
    Error,
    "Request is not aborted",
  );

  const errorResponse = response.getErrorResponse();
  assertEquals(errorResponse.type, "error");
  assertEquals(errorResponse.errorMessage, "Bad request");
  assertEquals(errorResponse.error, {
    message: "You are not authorized",
    receivedHeaders: {
      ...getCommonReceivedHeaders(),
      ...headers,
    },
    receivedSearchParams,
  });
});

test("jsonHttpClient: for GET Request, parse the 5xx response as error", async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.get({ path: "/500", headers, queryParameters });

  const response = await executor.execute();

  assertEquals(response.isSuccess(), false);
  assertEquals(response.isError(), true);
  assertEquals(response.isAbort(), false);
  assertThrows(
    () => response.getSuccessResponse(),
    Error,
    "Not a success response",
  );
  assertThrows(
    () => response.getAbortResponse(),
    Error,
    "Request is not aborted",
  );

  const errorResponse = response.getErrorResponse();
  assertEquals(errorResponse.type, "error");
  assertEquals(
    errorResponse.errorMessage,
    "Something went wrong on the server",
  );
  assertEquals(errorResponse.error, "Oh crap! Something went wrong...");
});

test("jsonHttpClient: for POST Request, send headers, query parameters and json data through the request", async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.post({
    path: "/200",
    headers,
    queryParameters,
    data: postData,
  });

  const response = await executor.execute();

  assertEquals(response.isSuccess(), true);
  assertEquals(response.isError(), false);
  assertEquals(response.isAbort(), false);
  assertThrows(
    () => response.getErrorResponse(),
    Error,
    "Not an error response",
  );
  assertThrows(
    () => response.getAbortResponse(),
    Error,
    "Request is not aborted",
  );

  const successResponse = response.getSuccessResponse();
  assertEquals(successResponse.type, "success");
  assertEquals(successResponse.statusCode, 200);
  assertEquals(successResponse.data, {
    message: "200",
    receivedHeaders: {
      ...getCommonReceivedHeaders(),
      ...headers,
      ...getPostRequestReceivedHeaders(),
    },
    receivedSearchParams,
    receivedData: postData,
  });
});

test("jsonHttpClient: for POST Request, abort the request if it takes longer than timeout.", async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.post({
    path: `/delay/${milliseconds({ seconds: 3 })}`,
    timeoutMillis: 500,
    data: {},
    headers,
    queryParameters,
  });

  const response = await executor.execute();

  assertEquals(response.isSuccess(), false);
  assertEquals(response.isError(), false);
  assertEquals(response.isAbort(), true);
  assertThrows(
    () => response.getSuccessResponse(),
    Error,
    "Not a success response",
  );
  assertThrows(
    () => response.getErrorResponse(),
    Error,
    "Not an error response",
  );

  const abortResponse = response.getAbortResponse();
  assertEquals(abortResponse.type, "abort");
  assertEquals(
    abortResponse.reasonMessage,
    "Request timed out after 500 milliseconds.",
  );
  assertEquals(
    abortResponse.reason.message,
    new Error("Request timed out after 500 milliseconds.").message,
  );
});

test("jsonHttpClient: for POST Request, send headers, query parameters and form data through the request", async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.post({
    path: "/200",
    headers,
    queryParameters,
    data: formData,
  });

  const response = await executor.execute();

  assertEquals(response.isSuccess(), true);
  assertEquals(response.isError(), false);
  assertEquals(response.isAbort(), false);
  assertThrows(
    () => response.getErrorResponse(),
    Error,
    "Not an error response",
  );
  assertThrows(
    () => response.getAbortResponse(),
    Error,
    "Request is not aborted",
  );

  const successResponse = response.getSuccessResponse();
  assertEquals(successResponse.type, "success");
  assertEquals(successResponse.statusCode, 200);

  const responseData = successResponse.data as {
    receivedHeaders: Record<string, string>;
  };
  assertEquals(
    responseData.receivedHeaders["content-type"].startsWith(
      "multipart/form-data;",
    ),
    true,
  );
  delete responseData.receivedHeaders["content-type"];

  assertEquals(successResponse.data, {
    message: "200",
    receivedHeaders: {
      ...getCommonReceivedHeaders(),
      ...headers,
      "content-length": "131",
    },
    receivedSearchParams,
  });
});

test("jsonHttpClient: for POST Request, send headers, query parameters and data through the request using absolute url", async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.post({
    path: `${serverAddress}/200`,
    headers,
    queryParameters,
    data: postData,
  });

  const response = await executor.execute();

  assertEquals(response.isSuccess(), true);
  assertEquals(response.isError(), false);
  assertEquals(response.isAbort(), false);
  assertThrows(
    () => response.getErrorResponse(),
    Error,
    "Not an error response",
  );
  assertThrows(
    () => response.getAbortResponse(),
    Error,
    "Request is not aborted",
  );

  const successResponse = response.getSuccessResponse();
  assertEquals(successResponse.type, "success");
  assertEquals(successResponse.statusCode, 200);
  assertEquals(successResponse.data, {
    message: "200",
    receivedHeaders: {
      ...getCommonReceivedHeaders(),
      ...headers,
      ...getPostRequestReceivedHeaders(),
    },
    receivedSearchParams,
    receivedData: postData,
  });
});

test("jsonHttpClient: for POST Request, should abort the request", async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.post({
    path: "/201",
    headers,
    queryParameters,
    data: postData,
  });

  const [response] = await Promise.all([
    // actual request (takes 1 second)
    executor.execute(),
    // simulate abort after 100 milliseconds
    new Promise((resolve) => {
      executor.abort(new Error(`Aborting because user changed page.`));
      resolve(null);
    }),
  ]);

  assertEquals(response.isSuccess(), false);
  assertEquals(response.isError(), false);
  assertEquals(response.isAbort(), true);
  assertThrows(
    () => response.getSuccessResponse(),
    Error,
    "Not a success response",
  );
  assertThrows(
    () => response.getErrorResponse(),
    Error,
    "Not an error response",
  );

  const abortResponse = response.getAbortResponse();
  assertEquals(abortResponse.type, "abort");
  assertEquals(
    abortResponse.reasonMessage,
    "Aborting because user changed page.",
  );
  assertEquals(
    abortResponse.reason.message,
    new Error("Aborting because user changed page.").message,
  );
});

test("jsonHttpClient: for POST Request, parse the 4xx response as text error", async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.post({
    path: "/401",
    headers,
    queryParameters,
    data: postData,
  });

  const response = await executor.execute();

  assertEquals(response.isSuccess(), false);
  assertEquals(response.isError(), true);
  assertEquals(response.isAbort(), false);
  assertThrows(
    () => response.getSuccessResponse(),
    Error,
    "Not a success response",
  );
  assertThrows(
    () => response.getAbortResponse(),
    Error,
    "Request is not aborted",
  );

  const errorResponse = response.getErrorResponse();
  assertEquals(errorResponse.type, "error");
  assertEquals(errorResponse.errorMessage, "You are not authenticated");
  assertEquals(errorResponse.error, null);
});

test("jsonHttpClient: for POST Request, parse the 4xx response as json error", async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.post({
    path: "/403",
    headers,
    queryParameters,
    data: postData,
  });

  const response = await executor.execute();

  assertEquals(response.isSuccess(), false);
  assertEquals(response.isError(), true);
  assertEquals(response.isAbort(), false);
  assertThrows(
    () => response.getSuccessResponse(),
    Error,
    "Not a success response",
  );
  assertThrows(
    () => response.getAbortResponse(),
    Error,
    "Request is not aborted",
  );

  const errorResponse = response.getErrorResponse();
  assertEquals(errorResponse.type, "error");
  assertEquals(errorResponse.errorMessage, "Bad request");
  assertEquals(errorResponse.error, {
    message: "You are not authorized",
    receivedHeaders: {
      ...getCommonReceivedHeaders(),
      ...headers,
      ...getPostRequestReceivedHeaders(),
    },
    receivedSearchParams,
    receivedData: postData,
  });
});

test("jsonHttpClient: for POST Request, parse the 5xx response as error", async () => {
  const client = new JsonHttpClientImpl({ baseUrl: serverAddress });
  const executor = client.post({
    path: "/500",
    headers,
    queryParameters,
    data: postData,
  });

  const response = await executor.execute();

  assertEquals(response.isSuccess(), false);
  assertEquals(response.isError(), true);
  assertEquals(response.isAbort(), false);
  assertThrows(
    () => response.getSuccessResponse(),
    Error,
    "Not a success response",
  );
  assertThrows(
    () => response.getAbortResponse(),
    Error,
    "Request is not aborted",
  );

  const errorResponse = response.getErrorResponse();
  assertEquals(errorResponse.type, "error");
  assertEquals(
    errorResponse.errorMessage,
    "Something went wrong on the server",
  );
  assertEquals(errorResponse.error, "Oh crap! Something went wrong...");
});
