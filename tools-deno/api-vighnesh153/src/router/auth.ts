import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import type { CookieOptions } from "hono/utils/cookie";

import { cookieKeys } from "@vighnesh153/tools/vighnesh153";

import { initiateGoogleLoginController } from "@/api/initiateGoogleLogin/controller.ts";
import { apexDomain, apiDomain, uiDomain } from "@/constants.ts";

const authRouter = new Hono();

// login / logout
authRouter.all("/initiateGoogleLogin", (c) => {
  const initiateGoogleLoginUrl = initiateGoogleLoginController({
    domain: apiDomain,
  });
  if (initiateGoogleLoginUrl == null) {
    return c.text(
      "Initiate google login url is empty. Please inform Vighnesh about this issue.",
      500,
    );
  }
  return c.redirect(initiateGoogleLoginUrl);
});

authRouter.all("/googleAuthCallback", (c) => {
  return c.json({});
});
authRouter.all("/initiateLogout", (c) => {
  const cookieOpts: CookieOptions = {
    maxAge: 0,
    path: "/",
    // prefix "." is only needed to support old browsers (https://stackoverflow.com/questions/9618217/what-does-the-dot-prefix-in-the-cookie-domain-mean)
    domain: "." + apexDomain,
  };

  setCookie(c, cookieKeys.userInfo, "", cookieOpts);
  setCookie(c, cookieKeys.authToken, "", {
    ...cookieOpts,
    httpOnly: true,
    secure: true,
  });

  return c.redirect(uiDomain + "/auth/callback");
});

export { authRouter };
