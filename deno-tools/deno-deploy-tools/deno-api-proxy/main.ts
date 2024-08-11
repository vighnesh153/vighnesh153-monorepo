import { InvocationRequest, InvocationType, InvokeCommand, LambdaClient, LogType } from '@aws-sdk/client-lambda';

import express from 'npm:express@4';
import type { Express } from 'npm:@types/express@4';

import { DEFAULT_AWS_REGION } from './.local/aws_config.ts';

const client = new LambdaClient({
    credentials: {
        accessKeyId: Deno.env.get('AWS_ACCESS_KEY_ID') ?? '',
        secretAccessKey: Deno.env.get('AWS_SECRET_ACCESS_KEY') ?? '',
    },
    region: DEFAULT_AWS_REGION,
});

const app: Express = express();

// @ts-ignore: express.json type is not identified by Deno
app.use(express.json());

app.use(async (req, res) => {
    const data = {
        headers: req.headers,
        method: req.method,
        path: req.path,
        pathParams: req.params,
        searchParams: req.query,
        body: req.body,
    };

    console.log(`Data from request: ${JSON.stringify(data)}`);

    const encodedBody = new TextEncoder().encode(JSON.stringify(data));

    const input: InvocationRequest = {
        FunctionName: 'HttpApiGet-pikachu-dev',
        InvocationType: InvocationType.RequestResponse,
        LogType: LogType.Tail,
        Payload: encodedBody,
    };

    const command = new InvokeCommand(input);

    try {
        const response = await client.send(command);
        console.log(`Response from lambda: ${JSON.stringify(response)}`);

        const payload = JSON.parse(new TextDecoder().decode(response.Payload));
        res.json({
            ...payload,
            body: JSON.parse(payload.body),
        });
    } catch (e: unknown) {
        const err = e as { message?: string };
        console.log(`Error: ${err?.message}`, e);
        res.json({ errorOccurred: e });
    }
});

app.listen(8000);
