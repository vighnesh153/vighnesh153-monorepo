import { InvocationRequest, InvocationType, InvokeCommand, LambdaClient, LogType } from "@aws-sdk/client-lambda";

import {
    constructHttpApiLambdaName,
    DEFAULT_AWS_REGION,
    isValidLambdaMethod,
    isValidStageType,
    type LambdaFunctionName,
    LambdaFunctionNames,
    type LambdaRequestPayload,
    type LambdaResponsePayload,
} from "./.local/tools-platform-independent/aws_config.ts";
import { HttpHeaderKeys, HttpHeaderValues } from "./.local/tools-platform-independent/http_client_common.ts";

const client = new LambdaClient({
    credentials: {
        accessKeyId: Deno.env.get("AWS_ACCESS_KEY_ID") ?? "",
        secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY") ?? "",
    },
    region: DEFAULT_AWS_REGION,
});

const STAGE = Deno.env.get("STAGE") ?? "dev";

const MAX_CONTENT_LENGTH = 10_000; // 20 KB

function isJsonRequest(req: Request): boolean {
    return req.headers.get(HttpHeaderKeys.contentType) === HttpHeaderValues.contentType.applicationJson;
}

function isContentLengthValid(headers: Record<string, string>): boolean {
    return parseInt(headers[HttpHeaderKeys.contentLength] ?? "0") <= MAX_CONTENT_LENGTH;
}

function convertHeaders(req: Request): Record<string, string> {
    const headers: Record<string, string> = {};

    Array.from(req.headers.keys()).forEach((key) => {
        headers[key] = req.headers.get(key)!;
    });

    return headers;
}

function convertUrlSearchParams(urlSearchParams: URLSearchParams): Record<string, string> {
    const params: Record<string, string> = {};

    for (const [key, value] of urlSearchParams.entries()) {
        params[key] = value;
    }

    return params;
}

Deno.serve(async (req, _connInfo) => {
    // TODO: add rate limiting using KV db
    // Use `connInfo.remoteAddr.hostname` to rate limit

    if (!isValidStageType(STAGE)) {
        console.error(`Stage is not configured in the project.`);
        return new Response(JSON.stringify({ error: "Stage is not configured." }), {
            status: 500,
            headers: {
                [HttpHeaderKeys.contentType]: HttpHeaderValues.contentType.applicationJson,
            },
        });
    }

    const method = req.method;
    const url = new URL(req.url);
    const headers = convertHeaders(req);

    const functionName = (Object.keys(LambdaFunctionNames) as LambdaFunctionName[]).find((functionName) =>
        url.pathname === `/${functionName}`
    ) ?? null;

    if (!isValidLambdaMethod(method)) {
        console.log(`Received request with unsupported http method:`, method, ` with headers:`, headers);
        return new Response(
            JSON.stringify({ error: "Unsupported http method", method }),
            {
                status: 400,
                headers: {
                    [HttpHeaderKeys.contentType]: HttpHeaderValues.contentType.applicationJson,
                },
            },
        );
    }

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
            JSON.stringify({ error: "No function found for the corresponding path", path: url.pathname }),
            {
                status: 400,
                headers: {
                    [HttpHeaderKeys.contentType]: HttpHeaderValues.contentType.applicationJson,
                },
            },
        );
    }

    if (!isContentLengthValid(headers)) {
        console.log("Request payload too large for function:", functionName, " with headers:", headers);
        return new Response(
            JSON.stringify({ error: "Request payload too large", contentLength: headers["Content-Length"] }),
            {
                status: 400,
                headers: {
                    [HttpHeaderKeys.contentType]: HttpHeaderValues.contentType.applicationJson,
                },
            },
        );
    }

    let body: unknown | null = null;
    if (isJsonRequest(req)) {
        body = await req.json();
    }

    const payload: LambdaRequestPayload = {
        method: method,
        headers,
        body,
        filterParams: convertUrlSearchParams(url.searchParams),
        user: null,
    };

    const encodedBody = new TextEncoder().encode(JSON.stringify(payload));

    const input: InvocationRequest = {
        FunctionName: constructHttpApiLambdaName({
            functionIdentifier: functionName,
            method,
            stage: STAGE,
        }),
        InvocationType: InvocationType.RequestResponse,
        LogType: LogType.Tail,
        Payload: encodedBody,
    };

    try {
        const lambdaResponse = await client.send(new InvokeCommand(input));

        const payload: LambdaResponsePayload = JSON.parse(new TextDecoder().decode(lambdaResponse.Payload));

        const headers = new Headers();
        payload.cookies.forEach((cookie) => {
            headers.append(HttpHeaderKeys.setCookie, cookie);
        });
        Object.keys(payload.headers ?? {}).forEach((header) => {
            headers.append(header, payload.headers![header]);
        });

        return new Response(payload.body, {
            status: payload.statusCode,
            headers,
        });
    } catch (e: unknown) {
        const err = e as { message?: string };
        console.error(`Some error occurred while processing a request:`, err?.message, e);
        console.log("method=", method, " path=", req.url, " headers=", headers, " body=", body);

        return new Response(JSON.stringify({ error: err?.message ?? "Some error occurred" }), {
            status: 500,
            headers: {
                [HttpHeaderKeys.contentType]: HttpHeaderValues.contentType.applicationJson,
            },
        });
    }
});
