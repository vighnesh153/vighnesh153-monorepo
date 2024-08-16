import { InvocationRequest, InvocationType, InvokeCommand, LambdaClient, LogType } from '@aws-sdk/client-lambda';

import {
    constructHttpApiLambdaName,
    DEFAULT_AWS_REGION,
    isValidLambdaMethod,
    isValidStageType,
    LambdaFunctionName,
    LambdaFunctionNames,
    LambdaRequestPayload,
    LambdaResponsePayload,
} from './.local/aws_config.ts';

const client = new LambdaClient({
    credentials: {
        accessKeyId: Deno.env.get('AWS_ACCESS_KEY_ID') ?? '',
        secretAccessKey: Deno.env.get('AWS_SECRET_ACCESS_KEY') ?? '',
    },
    region: DEFAULT_AWS_REGION,
});

const stage = Deno.env.get('STAGE') ?? 'dev';

// TODO: configure payload limit

// TODO: add rate limiting using KV db

function isJsonRequest(req: Request): boolean {
    return req.headers.get('content-type') === 'application/json';
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

async function handler(req: Request): Promise<Response> {
    if (!isValidStageType(stage)) {
        console.error(`Stage is not configured in the project.`);
        return new Response(JSON.stringify({ error: 'Stage is not configured.' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const method = req.method;
    const url = new URL(req.url);
    const headers = convertHeaders(req);

    const functionName =
        (Object.keys(LambdaFunctionNames) as LambdaFunctionName[]).find((functionName) =>
            url.pathname === `/${functionName}`
        ) ?? null;

    if (!isValidLambdaMethod(method)) {
        console.log(`Received request with unsupported http method:`, method, ` with headers:`, headers);
        return new Response(
            JSON.stringify({ error: 'Unsupported http method', method }),
            {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
    }

    if (functionName === null) {
        console.log('Received request for unrecognized function name:', functionName, ' with headers:', headers);
        return new Response(
            JSON.stringify({ error: 'No function found for the corresponding path', path: url.pathname }),
            {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
    }

    let body: unknown | null = null;
    if (isJsonRequest(req)) {
        body = await req.json();
    }

    const payload: LambdaRequestPayload = {
        method,
        headers,
        body,
        filterParams: convertUrlSearchParams(url.searchParams),
    };

    const encodedBody = new TextEncoder().encode(JSON.stringify(payload));

    const input: InvocationRequest = {
        FunctionName: constructHttpApiLambdaName({
            functionIdentifier: functionName,
            method,
            stage,
        }),
        InvocationType: InvocationType.RequestResponse,
        LogType: LogType.Tail,
        Payload: encodedBody,
    };

    try {
        const lambdaResponse = await client.send(new InvokeCommand(input));

        const payload: LambdaResponsePayload = JSON.parse(new TextDecoder().decode(lambdaResponse.Payload));

        return new Response(payload.body, {
            status: payload.statusCode,
            headers: payload.headers ?? {},
        });
    } catch (e: unknown) {
        const err = e as { message?: string };
        console.error(`Some error occurred while processing a request:`, err?.message, e);
        console.log('method=', method, ' path=', req.url, ' headers=', headers, ' body=', body);

        return new Response(JSON.stringify({ error: err?.message ?? 'Some error occurred' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export default { fetch: handler };
