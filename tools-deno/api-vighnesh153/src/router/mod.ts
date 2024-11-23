import { Hono } from "hono";

import { authRouter } from "@/router/auth.ts";

const router = new Hono();

router.route("/", authRouter);

export { router };
