export const DEFAULT_AWS_REGION = 'ap-south-1'; // Mumbai

const StageTypes = ['dev', 'prod'] as const;

export type StageType = (typeof StageTypes)[number];

export function isValidStageType(stage: string): stage is StageType {
  return (StageTypes as readonly string[]).includes(stage);
}

const LambdaMethodTypes = ['get', 'post'] as const;

export type LambdaMethodType = (typeof LambdaMethodTypes)[number];

export function isValidLambdaMethod(method: string): method is LambdaMethodType {
  return (LambdaMethodTypes as readonly string[]).includes(method.toLowerCase());
}

export type LambdaRequestPayload<T = unknown> = {
  method: LambdaMethodType;
  headers: Record<string, string>;
  body: T;
  filterParams: Record<string, string>;
};

export type LambdaResponsePayload = {
  statusCode: number;
  body: string | null;
  headers: LambdaRequestPayload['headers'] | null;
};

const LambdaFunctionNameList = ['initiateGoogleLogin', 'initiateLogout', 'googleAuthCallback', 'pikachu'] as const;

export type LambdaFunctionName = (typeof LambdaFunctionNameList)[number];

export const LambdaFunctionNames = LambdaFunctionNameList.reduce(
  (acc, curr) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: some
    acc[curr] = curr;
    return acc;
  },
  {} as { [key in LambdaFunctionName]: key }
);

export const LambdaFunctionConfig = {
  initiateGoogleLogin: {
    name: 'initiateGoogleLogin',
    method: 'get',
  },
  initiateLogout: {
    name: 'initiateLogout',
    method: 'get',
  },
  googleAuthCallback: {
    name: 'googleAuthCallback',
    method: 'get',
  },
  pikachu: {
    name: 'pikachu',
    method: 'get',
  },
} satisfies { [key in LambdaFunctionName]: { name: key; method: LambdaMethodType } };

export function constructHttpApiLambdaName(options: {
  stage: 'dev' | 'prod';
  method: LambdaMethodType;
  functionIdentifier: LambdaFunctionName;
}): string {
  const method = options.method[0].toUpperCase() + options.method.slice(1).toLowerCase();
  return `HttpApi${method}-${options.functionIdentifier}-${options.stage}`;
}
