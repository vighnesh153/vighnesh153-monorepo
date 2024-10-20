#!/usr/bin/env node
/* eslint-disable no-console */

import { execSync } from "node:child_process";
import path from "node:path";
import { AddressInfo } from "node:net";
import { fileURLToPath } from "node:url";
import express, {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import ip from "ip";
import morgan from "morgan";
import { Log } from "../types";

const app = express();
const logs: Log[] = [];

app.use(morgan("tiny"));

app.get("/api/devices", (req: ExpressRequest, res: ExpressResponse) => {
  try {
    const devices = execSync("adb devices")
      .toString()
      .split("\n")
      .filter((line) => Boolean(line))
      .slice(1)
      .map((device) => device.split("\t")[0]);
    return res.json({ devices });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Failed to fetch devices",
      error: e,
    });
  }
});

app.post("/api/execute", (req: ExpressRequest, res: ExpressResponse) => {
  // eslint-disable-next-line prefer-destructuring
  const device = req.query.device;
  const partialCommand = req.query.command;

  const command = `adb -s ${device} ${partialCommand}`;
  logs.push({ command, time: Date.now() });
  console.log(`Executing command: ${command}`);
  const result = execSync(command).toString();
  console.log(`Result: ${result}`);
  return res.json({ result });
});

app.get("/api/logs", (req: ExpressRequest, res: ExpressResponse) => {
  const response = { logs };
  return res.json(response);
});

app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), "client"),
  ),
);

const server = app.listen(0, () => {
  const { port } = server.address() as AddressInfo;
  console.log(`Server is listening on port ${port}`);
  console.log(`On this machine: http://localhost:${port}/`);
  console.log(`On local network: http://${ip.address()}:${port}/`);
});
