import { type Handler } from "aws-lambda";
import { constructAuthRedirectUrl } from "./constructAuthRedirectUrl.ts";
import { controller } from "./controller.ts";

export const handler: Handler = () =>
  Promise.resolve(controller(constructAuthRedirectUrl));
