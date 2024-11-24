import { apiDomains, uiHosts } from "@/constants.ts";

export function getClientStage(): "local" | "prod" {
  return location.host === uiHosts.local ? "local" : "prod";
}

export function getClientApiDomain(): string {
  return apiDomains[getClientStage()];
}
