import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";
import morgan from "morgan";

export function startServer(props: { targetUrl: string; port: number }) {
  const app = express();

  app.use(cors());
  app.use(morgan("dev"));

  app.use(
    createProxyMiddleware({ target: props.targetUrl, changeOrigin: true }),
  );

  app.listen(props.port, () => {
    // eslint-disable-next-line no-console
    console.log(
      `Proxy started for "${props.targetUrl}" at "http://localhost:${props.port}"`,
    );
  });
}
