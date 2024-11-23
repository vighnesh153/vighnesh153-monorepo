import { Hono } from "hono";

import { initiateGoogleLoginController } from "@/api/initiateGoogleLogin/controller.ts";
import { isProduction } from "@/is_production.ts";
import { apiDomains } from "@/constants.ts";

const router = new Hono();

// login / logout
router.all("/initiateGoogleLogin", (c) => {
  const initiateGoogleLoginUrl = initiateGoogleLoginController({
    domain: isProduction ? apiDomains.deno : apiDomains.local,
  });
  if (initiateGoogleLoginUrl == null) {
    return c.text(
      "Initiate google login url is empty. Please inform Vighnesh about this issue.",
      500,
    );
  }
  return c.redirect(initiateGoogleLoginUrl);
});

router.all("/googleAuthCallback", (c) => {
  return c.json({});
});
router.all("/initiateLogout", (c) => {
  return c.json({});
});

export { router };
