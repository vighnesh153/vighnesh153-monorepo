import { isStringEmpty, not } from "@vighnesh153/tools";

export const isProduction = not(
  isStringEmpty(Deno.env.get("DENO_DEPLOYMENT_ID")),
);
