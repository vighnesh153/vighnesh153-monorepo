import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";

import { isProduction } from "@/is_production.ts";
import { uiDomains } from "@/constants.ts";
import { router } from "@/router/mod.ts";

const app = new Hono({ strict: false });

app.use(cors({
  origin: isProduction ? uiDomains.prod : uiDomains.local,
  allowHeaders: ["content-type", "x-vighnesh153-xsrf"],
  credentials: true,
  allowMethods: ["GET", "POST", "PUT", "DELETE"],
  maxAge: 24 * 3600,
}));

app.route("/", router);

app.notFound((c) => {
  return c.json({
    message: "Path not found!",
  }, 404);
});

app.onError((err, c) => {
  console.error(`Error: "${err.message}"`, err);

  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return c.json({
    message: "Unhandled error!",
  }, 500);
});

Deno.serve(app.fetch);
