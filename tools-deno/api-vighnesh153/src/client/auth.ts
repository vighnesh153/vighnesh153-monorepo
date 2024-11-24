import { clientApiDomain } from "./client_stage.ts";

export function initiateGoogleLogin(): void {
  location.assign(clientApiDomain + "/initiateGoogleLogin");
}

export function initiateLogout(): void {
  location.assign(clientApiDomain + "/initiateLogout");
}
