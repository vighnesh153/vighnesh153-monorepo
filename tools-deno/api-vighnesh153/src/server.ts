import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";

import { isProduction } from "@/is_production.ts";
import { router } from "@/routes.ts";

const app = new Hono({ strict: false });

app.use(cors({
  origin: isProduction ? "https://vighnesh153.dev" : "http://localhost:4321",
  allowHeaders: ["content-type"],
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
