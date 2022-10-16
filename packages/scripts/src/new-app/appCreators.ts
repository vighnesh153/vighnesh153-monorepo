import { ApplicationType } from "./applicationTypes";
import { createNodeJsApplication } from "./createNodeJsApplication";
import { createNextJsApplication } from "./createNextJsApplication";

export const appCreators = {
  [ApplicationType.NodeJs]: createNodeJsApplication,
  [ApplicationType.NextJs]: createNextJsApplication
};
