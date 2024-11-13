import type { CompleteUserInfo } from "../models/mod.ts";

export const DEFAULT_AWS_REGION = "ap-south-1" as const; // Mumbai

export type LambdaRequestPayload<T = unknown> = {
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
  "getUser",
  "googleAuthCallback",
  "initiateGoogleLogin",
  "initiateLogout",
  "playground",
  "privateS3BucketEventListener",
  "publicS3BucketEventListener",
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
    authRequired: boolean;
    /**
     * whether this function can be called using HTTP
     */
    callableByHttp: boolean;
  };
} = {
  createUploadPresignedUrl: {
    name: "createUploadPresignedUrl",
    authRequired: true,
    callableByHttp: true,
  },
  getUser: {
    name: "getUser",
    authRequired: false,
    callableByHttp: true,
  },
  googleAuthCallback: {
    name: "googleAuthCallback",
    authRequired: false,
    callableByHttp: true,
  },
  initiateGoogleLogin: {
    name: "initiateGoogleLogin",
    authRequired: false,
    callableByHttp: true,
  },
  initiateLogout: {
    name: "initiateLogout",
    authRequired: false,
    callableByHttp: true,
  },
  playground: {
    name: "playground",
    authRequired: false,
    callableByHttp: true,
  },
  privateS3BucketEventListener: {
    name: "privateS3BucketEventListener",
    authRequired: false,
    callableByHttp: false,
  },
  publicS3BucketEventListener: {
    name: "publicS3BucketEventListener",
    authRequired: false,
    callableByHttp: false,
  },
};
