import { type Handler } from "aws-lambda";
import { LambdaRequestPayload } from "@vighnesh153/tools/vighnesh153";
import { controller } from "./controller.ts";

export const handler: Handler<LambdaRequestPayload> = async (request) =>
  controller({ headers: request.headers, filterParams: request.filterParams });
