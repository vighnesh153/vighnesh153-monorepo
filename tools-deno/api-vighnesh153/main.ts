import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";

const app = new Hono({ strict: false });

app.use(cors({
  origin: Deno.env.get("LOCAL_ONLY_UI_ORIGIN") ?? "https://vighnesh153.dev",
  allowHeaders: ["content-type"],
  credentials: true,
  allowMethods: ["GET", "POST", "PUT", "DELETE"],
  maxAge: 24 * 3600,
}));

app.get("/", (c) => {
  return c.json({
    message: "Pikachu 123 456",
  });
});

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
