#!/usr/bin/env node

import { Command } from "commander";
import { startServer } from "./server";
import packageInfo from "../package.json";
import { DEFAULT_PORT, DEFAULT_SERVE_DIRECTORY } from "./constants";

const program = new Command();

program
  .name(packageInfo.name)
  .description(packageInfo.description)
  .version(packageInfo.version)
  .option(
    "-p, --port <port>",
    "port number for the ftp server",
    `${DEFAULT_PORT}`,
  )
  .option(
    "-d, --directory <path-to-directory>",
    "directory to be served",
    `${DEFAULT_SERVE_DIRECTORY}`,
  )
  .parse();

interface Options {
  port: string;
  directory: string;
}

const options = program.opts<Options>();
const { port, directory } = options;
const parsedPort = parseInt(`${port}`, 10);

startServer({
  port: parsedPort,
  directoryPath: directory,
});
