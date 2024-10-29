import * as http2 from "node:http2";

import { type Handler } from "aws-lambda";
import type { SerializeOptions } from "cookie";

import { type Logger } from "@vighnesh153/tools";
import {
  cookieKeys,
  type LambdaResponsePayload,
} from "@vighnesh153/tools/vighnesh153";

import { CookieSerializer } from "../common/cookie_serializer.ts";
import {
  cookieSerializerFactory,
  loggerSingletonFactory,
} from "../common/factories.ts";

export async function controller({
  environmentStage = process.env.STAGE as "dev" | "prod" | undefined,
  uiAuthCompleteUrl = process.env.UI_AUTH_COMPLETE_URL,

  // tools
  cookieSerializer = cookieSerializerFactory(),
  logger = loggerSingletonFactory(),
}: {
  uiAuthCompleteUrl?: string;
  environmentStage?: "dev" | "prod";

  cookieSerializer?: CookieSerializer;
  logger?: Logger;
} = {}): Promise<LambdaResponsePayload> {
  const commonCookieOptions: SerializeOptions = {
    path: "/",
    domain: ".vighnesh153.dev",
    maxAge: 0,
  };

  const response: LambdaResponsePayload = {
    statusCode: http2.constants.HTTP_STATUS_TEMPORARY_REDIRECT,
    cookies: [
      cookieSerializer.serialize(cookieKeys.userInfo(environmentStage!), "", {
        ...commonCookieOptions,
      }),
      cookieSerializer.serialize(cookieKeys.authToken(environmentStage!), "", {
        ...commonCookieOptions,

        httpOnly: true,
        secure: true,
      }),
    ],
    headers: {
      Location: uiAuthCompleteUrl!,
    },
    body: null,
  };

  logger.log("User logout process completed. Sending response...");
  logger.log(response);

  return response;
}

export const handler: Handler = () => Promise.resolve(controller());
