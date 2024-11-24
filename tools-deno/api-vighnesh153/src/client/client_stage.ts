import { apiDomains, uiHosts } from "@/constants.ts";

export const clientStage = location.host === uiHosts.local ? "local" : "prod";

export const clientApiDomain = apiDomains[clientStage];
