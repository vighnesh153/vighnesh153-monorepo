import { type Handler } from "aws-lambda";
import { constructAuthRedirectUrl } from "./construct_auth_redirect_url.ts";
import { controller } from "./controller.ts";

export const handler: Handler = () =>
  Promise.resolve(controller(constructAuthRedirectUrl));
