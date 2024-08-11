export const DEFAULT_AWS_REGION = 'ap-south-1'; // Mumbai

export type LambdaNameOptions = {
  stage: 'dev' | 'prod';
  method: 'Get' | 'Post';
  functionIdentifier: string;
};
export function constructHttpApiLambdaName(options: LambdaNameOptions): string {
  return `HttpApi${options.method}-${options.functionIdentifier}-${options.stage}`;
}
