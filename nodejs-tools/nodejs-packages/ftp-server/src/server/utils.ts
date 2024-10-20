import fs from "fs";
import path from "path";
import ip from "ip";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { not } from "@vighnesh153/tools";
import { Vighnesh153File } from "../types";

/**
 * __dirname
 */
export function getDirName(): string {
  return path.dirname(fileURLToPath(import.meta.url));
}

export function isPathValid(pathString: string): boolean {
  return fs.existsSync(pathString);
}

export function isDirectoryPath(pathString: string): boolean {
  return fs.existsSync(pathString) && fs.lstatSync(pathString).isDirectory();
}

export function getDirectoryInformation(
  requestedPath: string,
): Vighnesh153File[] {
  if (not(isDirectoryPath(requestedPath))) {
    return [];
  }
  const dirInfo = fs.readdirSync(requestedPath);
  return dirInfo.map((fileName: string) => {
    const filePath = path.resolve(requestedPath, fileName);
    return {
      name: fileName,
      type: isDirectoryPath(filePath) ? "directory" : "file",
    };
  });
}

export function serverIsListeningHandler(
  options: { directoryPath: string; port: number },
): () => void {
  const { directoryPath, port } = options;
  return () => {
    /* eslint-disable no-console */
    console.log(`Directory: ${path.resolve(directoryPath)}`);
    console.log(`Server is listening on port ${port}`);
    console.log(`On this machine: http://localhost:${port}/`);
    console.log(`On local network: http://${ip.address()}:${port}/`);
    /* eslint-enable no-console */
  };
}

export function serverFailedToStartHandler(
  options: { directoryPath: string; port: number },
) {
  const { port } = options;
  return (e: unknown) => {
    if ((e as { code: string }).code === "EADDRINUSE") {
      /* eslint-disable no-console */
      console.log();
      console.log(e);
      console.log();
      console.log(chalk.red(`Port ${port} already in use!`));
      console.log("Please try with a different port. eg. --port=4200");
      /* eslint-enable no-console */
      process.exit(1);
      return;
    }
    throw e;
  };
}
