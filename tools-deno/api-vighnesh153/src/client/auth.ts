import { getClientApiDomain } from "./client_stage.ts";

export function initiateGoogleLogin(): void {
  location.assign(getClientApiDomain() + "/initiateGoogleLogin");
}

export function initiateLogout(): void {
  location.assign(getClientApiDomain() + "/initiateLogout");
}
