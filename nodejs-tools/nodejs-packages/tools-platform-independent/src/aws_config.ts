export const DEFAULT_AWS_REGION = 'ap-south-1'; // Mumbai

export type StageType = 'dev' | 'prod';

export function isValidStageType(stage: string): stage is StageType {
  return ['dev', 'prod'].includes(stage);
}

const LambdaFunctionNames = {
  initiateGoogleLogin: 'initiateGoogleLogin',
  initiateLogout: 'initiateLogout',
  googleAuthCallback: 'googleAuthCallback',
};

export type LambdaMethodType = 'get' | 'post';

export type LambdaFunctionName = keyof typeof LambdaFunctionNames;

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
} satisfies Record<LambdaFunctionName, { name: LambdaFunctionName; method: LambdaMethodType }>;

export type LambdaNameOptions = {
  stage: 'dev' | 'prod';
  method: LambdaMethodType;
  functionIdentifier: LambdaFunctionName;
};
export function constructHttpApiLambdaName(options: LambdaNameOptions): string {
  const method = options.method[0].toUpperCase() + options.method.slice(1);
  return `HttpApi${method}-${options.functionIdentifier}-${options.stage}`;
}
