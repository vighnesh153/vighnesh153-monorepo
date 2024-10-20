import express from "express";
import morgan from "morgan";
import { CLIENT_BASE_DIR } from "../constants";
import {
  frontendCodeHandler,
  handleDirectory,
  handleFileDownload,
  handleZip,
  methodNotAllowed,
  validateRequestPathExists,
} from "./middlewares";
import { serverFailedToStartHandler, serverIsListeningHandler } from "./utils";

export interface StartServerOptions {
  port: number;
  directoryPath: string;
}

export function startServer(options: StartServerOptions): void {
  const { port, directoryPath } = options;
  const app = express();
  app.use(morgan("tiny"));

  app.get(`/${CLIENT_BASE_DIR}*`, frontendCodeHandler());
  app.get("/zip", handleZip(directoryPath));
  app.get("*", validateRequestPathExists(directoryPath));
  app.get("*", handleDirectory(directoryPath));
  app.get("*", handleFileDownload(directoryPath));
  app.use(methodNotAllowed());

  app
    .listen(port, serverIsListeningHandler({ directoryPath, port }))
    .on("error", serverFailedToStartHandler({ directoryPath, port }));
}
