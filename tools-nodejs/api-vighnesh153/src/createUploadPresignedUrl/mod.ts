import { type Handler } from "aws-lambda";
import type {
  CreateUploadPresignedUrlRequest,
  LambdaRequestPayload,
} from "@vighnesh153/tools/vighnesh153";
import { controller } from "./controller";

export const handler: Handler<
  LambdaRequestPayload<CreateUploadPresignedUrlRequest>
> = async (request) =>
  controller({
    method: request.method,
    user: request.user,
    body: request.body,
  });
