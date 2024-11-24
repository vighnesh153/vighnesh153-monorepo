import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import type { CookieOptions } from "hono/utils/cookie";
import { assert } from "@std/assert";

import { isStringEmpty, milliseconds, not } from "@vighnesh153/tools";
import { cookieKeys } from "@vighnesh153/tools/vighnesh153";

import { apexDomain, uiAuthCompleteUrl } from "@/constants.ts";

import { initiateGoogleLoginController } from "@/api/initiate_google_login/controller.ts";
import { googleAuthCallbackController } from "@/api/google_auth_callback/controller.ts";

const authRouter = new Hono();

const commonCookieOpts: CookieOptions = {
  path: "/",
  // prefix "." is only needed to support old browsers (https://stackoverflow.com/questions/9618217/what-does-the-dot-prefix-in-the-cookie-domain-mean)
  domain: "." + apexDomain,
};
const secureCookieOpts: CookieOptions = {
  secure: true,
  httpOnly: true,
};

// login / logout
authRouter.all("/initiateGoogleLogin", (c) => {
  const initiateGoogleLoginUrl = initiateGoogleLoginController();
  if (initiateGoogleLoginUrl == null) {
    return c.text(
      "Initiate google login url is empty. Please inform Vighnesh about this issue.",
      500,
    );
  }
  return c.redirect(initiateGoogleLoginUrl);
});

authRouter.all("/googleAuthCallback", async (c) => {
  const code = c.req.query("code");
  if (isStringEmpty(code)) {
    return c.text("Request is invalid...", 400);
  }

  const result = await googleAuthCallbackController({ authCallbackCode: code });
  if (not(result.success)) {
    return c.text("Failed to log in user.", 500);
  }

  assert(result.success);

  const cookieOpts: CookieOptions = {
    ...commonCookieOpts,
    maxAge: milliseconds({ years: 1 }) / 1000,
  };

  setCookie(
    c,
    cookieKeys.userInfo,
    btoa(JSON.stringify(result.user)),
    cookieOpts,
  );
  setCookie(
    c,
    cookieKeys.authToken,
    result.authToken,
    { ...cookieOpts, ...secureCookieOpts },
  );

  return c.json({});
});

authRouter.all("/initiateLogout", (c) => {
  const cookieOpts: CookieOptions = {
    ...commonCookieOpts,
    maxAge: 0,
  };

  setCookie(c, cookieKeys.userInfo, "", cookieOpts);
  setCookie(c, cookieKeys.authToken, "", {
    ...cookieOpts,
    ...secureCookieOpts,
  });

  return c.redirect(uiAuthCompleteUrl);
});

export { authRouter };
