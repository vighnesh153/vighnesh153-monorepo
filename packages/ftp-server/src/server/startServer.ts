import express from 'express';
import { DEFAULT_PORT, DEFAULT_SERVE_DIRECTORY } from '../constants';
import {
  frontendCodeHandler,
  handleDirectory,
  handleFileDownload,
  handleZip,
  methodNotAllowed,
  validateRequestPathExists,
} from './middlewares';
import { serverFailedToStartHandler, serverIsListeningHandler } from './utils';

export interface StartServerOptions {
  port?: number;
  directoryPath?: string;
}

export function startServer(options: StartServerOptions = {}): void {
  const { port = DEFAULT_PORT, directoryPath = DEFAULT_SERVE_DIRECTORY } = options;
  const app = express();

  app.use(frontendCodeHandler());
  app.get('/zip', handleZip(directoryPath));
  app.get('*', validateRequestPathExists(directoryPath));
  app.get('*', handleDirectory(directoryPath));
  app.get('*', handleFileDownload(directoryPath));
  app.use(methodNotAllowed());

  app
    .listen(port, serverIsListeningHandler({ directoryPath, port }))
    .on('error', serverFailedToStartHandler({ directoryPath, port }));
}
