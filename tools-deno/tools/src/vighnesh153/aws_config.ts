import type { CompleteUserInfo } from "../models/mod.ts";

export const DEFAULT_AWS_REGION = "ap-south-1" as const; // Mumbai

const StageTypes = ["dev", "prod"] as const;

export type StageType = (typeof StageTypes)[number];

export function isValidStageType(stage: string): stage is StageType {
  return (StageTypes as readonly string[]).includes(stage);
}

const LambdaMethodTypeList = ["get", "post"] as const;

export type LambdaMethodType = (typeof LambdaMethodTypeList)[number];

export function isValidLambdaMethod(
  method: string,
): method is LambdaMethodType {
  return (LambdaMethodTypeList as readonly string[]).includes(
    method.toLowerCase(),
  );
}

export type LambdaRequestPayload<T = unknown> = {
  method: LambdaMethodType;
  headers: Record<string, string>;
  body: T;
  filterParams: Record<string, string>;
  /**
   * Current logged in user
   */
  user: CompleteUserInfo | null;
};

export type LambdaResponsePayload = {
  statusCode: number;
  body: string | null;
  headers: LambdaRequestPayload["headers"] | null;
  cookies: string[];
};

const LambdaFunctionNameList = [
  "createUploadPresignedUrl",
  "initiateGoogleLogin",
  "initiateLogout",
  "googleAuthCallback",
  "getUser",
  "playground",
] as const;

export type LambdaFunctionName = (typeof LambdaFunctionNameList)[number];

export const LambdaFunctionNames: { [key in LambdaFunctionName]: key } =
  /* @__PURE__ */ LambdaFunctionNameList.reduce(
    (acc, curr) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: some
      acc[curr] = curr;
      return acc;
    },
    {} as { [key in LambdaFunctionName]: key },
  );

export const LambdaFunctionConfig: {
  [key in LambdaFunctionName]: {
    name: key;
    method: LambdaMethodType;
    authRequired: boolean;
  };
} = {
  createUploadPresignedUrl: {
    name: "createUploadPresignedUrl",
    method: "post",
    authRequired: true,
  },
  getUser: {
    name: "getUser",
    method: "get",
    authRequired: false,
  },
  googleAuthCallback: {
    name: "googleAuthCallback",
    method: "get",
    authRequired: false,
  },
  initiateGoogleLogin: {
    name: "initiateGoogleLogin",
    method: "get",
    authRequired: false,
  },
  initiateLogout: {
    name: "initiateLogout",
    method: "get",
    authRequired: false,
  },
  playground: {
    name: "playground",
    method: "get",
    authRequired: false,
  },
};

export function constructHttpApiLambdaName(options: {
  stage: StageType;
  method: LambdaMethodType;
  functionIdentifier: LambdaFunctionName;
}): string {
  const method = options.method[0].toUpperCase() +
    options.method.slice(1).toLowerCase();
  return `HttpApi${method}-${options.functionIdentifier}-${options.stage}`;
}
