#!/usr/bin/env node

import { Command } from 'commander';
import { startServer } from './server';
import packageInfo from '../package.json';

const program = new Command();

program
  .name(packageInfo.name)
  .description(packageInfo.description)
  .version(packageInfo.version)
  .option('-t, --target-url <target-url>', 'url to be CORS enabled')
  .option('-p, --port <port>', 'port number for the proxy server', '8080')
  .parse();

interface Options {
  targetUrl: string;
  port: string;
}

const options = program.opts<Options>();
const { targetUrl, port } = options;
const parsedPort = parseInt(`${port}`, 10);

startServer({ targetUrl, port: parsedPort });
