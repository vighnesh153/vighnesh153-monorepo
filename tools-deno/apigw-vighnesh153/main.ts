import {
    InvocationRequest,
    InvocationType,
    InvokeCommand,
    LambdaClient,
    LogType,
} from "@aws-sdk/client-lambda";

import { HttpHeaderKeys, HttpHeaderValues, not } from "@vighnesh153/tools";
import {
    DEFAULT_AWS_REGION,
    LambdaFunctionConfig,
    type LambdaFunctionName,
    LambdaFunctionNames,
    type LambdaRequestPayload,
    type LambdaResponsePayload,
} from "@vighnesh153/tools/vighnesh153";

const acceptableOriginsForOptions = [
    "http://localhost:4321",
    "https://staging.vighnesh153.dev",
    "https://vighnesh153.dev",
];

const client = new LambdaClient({
    credentials: {
        accessKeyId: Deno.env.get("AWS_ACCESS_KEY_ID") ?? "",
        secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY") ?? "",
    },
    region: DEFAULT_AWS_REGION,
});

const MAX_CONTENT_LENGTH = 10_000; // 20 KB

function isJsonRequest(req: Request): boolean {
    return req.headers.get(HttpHeaderKeys.contentType) ===
        HttpHeaderValues.contentType.applicationJson;
}

function isContentLengthValid(headers: Record<string, string>): boolean {
    return parseInt(headers[HttpHeaderKeys.contentLength] ?? "0") <=
        MAX_CONTENT_LENGTH;
}

function convertHeaders(req: Request): Record<string, string> {
    const headers: Record<string, string> = {};

    Array.from(req.headers.keys()).forEach((key) => {
        headers[key] = req.headers.get(key)!;
    });

    return headers;
}

function convertUrlSearchParams(
    urlSearchParams: URLSearchParams,
): Record<string, string> {
    const params: Record<string, string> = {};

    for (const [key, value] of urlSearchParams.entries()) {
        params[key] = value;
    }

    return params;
}

function addCorsHeaders(
    _headers: Headers | Record<string, string>,
    req: Request,
): Headers {
    const headers = new Headers(_headers);
    const origin = req.headers.get("origin") ?? "";

    if (not(acceptableOriginsForOptions.includes(origin))) {
        console.log("options request denied");
        return headers;
    }

    headers.append("Access-Control-Allow-Origin", origin);
    headers.append(
        "Access-Control-Allow-Headers",
        req.headers.get("Access-Control-Request-Headers") ?? "*",
    );
    headers.append("Access-Control-Allow-Credentials", "true");
    headers.append("Access-Control-Allow-Methods", "GET,POST");

    console.log("Cors headers added:", headers);

    return headers;
}

Deno.serve(async (req, _connInfo) => {
    // TODO: add rate limiting using KV db
    // Use `connInfo.remoteAddr.hostname` to rate limit

    if (req.method === "OPTIONS") {
        console.log("Options request:", req);
        return new Response("", {
            status: 201,
            headers: addCorsHeaders(new Headers(), req),
        });
    }

    const method = req.method;
    const url = new URL(req.url);
    const headers = convertHeaders(req);

    console.log(
        "Incoming request: method=",
        method,
        " path=",
        req.url,
        " headers=",
        headers,
    );

    const functionName =
        (Object.keys(LambdaFunctionNames) as LambdaFunctionName[]).find((
            functionName,
        ) => url.pathname === `/${functionName}`) ?? null;

    if (functionName === null) {
        console.log(
            "Received request for unrecognized function name:",
            functionName,
            " with headers:",
            headers,
            " request.url:",
            req.url,
            " pathName:",
            url.pathname,
        );
        return new Response(
            JSON.stringify({
                error: "No function found for the corresponding path",
                path: url.pathname,
            }),
            {
                status: 400,
                headers: addCorsHeaders({
                    [HttpHeaderKeys.contentType]:
                        HttpHeaderValues.contentType.applicationJson,
                }, req),
            },
        );
    }

    if (!isContentLengthValid(headers)) {
        console.log(
            "Request payload too large for function:",
            functionName,
            " with headers:",
            headers,
        );
        return new Response(
            JSON.stringify({
                error: "Request payload too large",
                contentLength: headers["Content-Length"],
            }),
            {
                status: 400,
                headers: addCorsHeaders({
                    [HttpHeaderKeys.contentType]:
                        HttpHeaderValues.contentType.applicationJson,
                }, req),
            },
        );
    }

    console.log("Request validation success...");

    let body: unknown | null = null;
    if (isJsonRequest(req)) {
        body = await req.json();
    }

    const payload: LambdaRequestPayload = {
        headers,
        body,
        filterParams: convertUrlSearchParams(url.searchParams),
        user: null,
    };

    if (not(LambdaFunctionConfig[functionName].callableByHttp)) {
        console.log(functionName, "is not exposed to http");
        return new Response(
            JSON.stringify({
                message: `"${functionName}" is not exposed to http`,
            }),
            {
                headers: addCorsHeaders({
                    [HttpHeaderKeys.contentType]:
                        HttpHeaderValues.contentType.applicationJson,
                }, req),
                status: 400,
            },
        );
    }

    if (LambdaFunctionConfig[functionName].authRequired) {
        console.log("Auth required for", functionName);
        const userInfoResponse = await invokeLambdaFunction({
            functionName: "getUser",
            payload: { headers },
        });

        if (userInfoResponse.status != 200 || userInfoResponse.data == null) {
            console.log(
                "Error occurred while fetching authenticated user:",
                userInfoResponse,
            );
            return new Response(
                JSON.stringify({
                    message:
                        `Some error occurred while fetching authenticated user.`,
                }),
                {
                    headers: addCorsHeaders(userInfoResponse.headers, req),
                    status: userInfoResponse.status,
                },
            );
        }

        console.log("Successfully fetched user info.");

        try {
            payload.user = JSON.parse(userInfoResponse.data);
            if (!payload.user?.userId?.trim()) {
                console.log(
                    `Authenticated user id is blank:`,
                    userInfoResponse.data,
                );
                throw new Error(`User id is blank`);
            }
            console.log("Parsed user:", payload.user);
        } catch (e) {
            console.error(
                "Error occurred while parsing logged in user info:",
                e,
            );
            return new Response(
                JSON.stringify({
                    message: "Failed to parse logged in user info",
                }),
                {
                    headers: addCorsHeaders({
                        [HttpHeaderKeys.contentType]:
                            HttpHeaderValues.contentType.applicationJson,
                    }, req),
                    status: 500,
                },
            );
        }
    }

    console.log("Invoking the actual requested function");

    // invoke the actual requested function
    const lambdaResponse = await invokeLambdaFunction({
        functionName,
        payload,
    });

    return new Response(lambdaResponse.data, {
        headers: addCorsHeaders(lambdaResponse.headers, req),
        status: lambdaResponse.status,
    });
});

async function invokeLambdaFunction<TReq>(
    { functionName, payload }: {
        functionName: LambdaFunctionName;
        payload: TReq;
    },
): Promise<{ headers: Headers; status: number; data: string | null }> {
    const encodedBody = new TextEncoder().encode(JSON.stringify(payload));

    const input: InvocationRequest = {
        FunctionName: functionName,
        InvocationType: InvocationType.RequestResponse,
        LogType: LogType.Tail,
        Payload: encodedBody,
    };

    try {
        const lambdaResponse = await client.send(new InvokeCommand(input));

        const responsePayload: LambdaResponsePayload = JSON.parse(
            new TextDecoder().decode(lambdaResponse.Payload),
        );

        const headers = new Headers();
        responsePayload.cookies.forEach((cookie) => {
            headers.append(HttpHeaderKeys.setCookie, cookie);
        });
        Object.keys(responsePayload.headers ?? {}).forEach((header) => {
            headers.append(header, responsePayload.headers![header]);
        });

        return {
            headers,
            status: responsePayload.statusCode,
            data: responsePayload.body,
        };
    } catch (e: unknown) {
        const err = e as { message?: string };
        console.error(
            `Some error occurred while processing a request:`,
            err?.message,
            e,
        );

        const headers = new Headers();
        headers.append(
            HttpHeaderKeys.contentType,
            HttpHeaderValues.contentType.applicationJson,
        );

        return {
            status: 500,
            headers,
            data: JSON.stringify({
                error: err?.message ?? "Some error occurred",
            }),
        };
    }
}
