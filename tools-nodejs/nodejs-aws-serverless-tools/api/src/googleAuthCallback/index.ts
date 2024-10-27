import { type Handler } from "aws-lambda";
import { type LambdaRequestPayload } from "@vighnesh153/tools/vighnesh153";
import { controller } from "./controller.ts";

export const handler: Handler<LambdaRequestPayload> = async (request) =>
  controller({ searchParameters: request.filterParams });
