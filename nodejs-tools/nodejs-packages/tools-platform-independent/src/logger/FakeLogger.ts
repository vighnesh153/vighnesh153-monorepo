import { Logger } from './Logger';

export class FakeLogger implements Logger {
  logs: unknown[][] = [];

  log(message?: unknown, ...optionalParams: unknown[]): void {
    // do nothign
    this.logs.push([message, ...optionalParams]);
  }
}
