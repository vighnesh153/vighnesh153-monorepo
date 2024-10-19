import type { Logger } from "./logger.ts";

export class ConsoleLogger implements Logger {
  private static instance: ConsoleLogger | null = null;

  static getInstance(): ConsoleLogger {
    if (this.instance === null) {
      this.instance = new ConsoleLogger();
    }
    return this.instance;
  }

  private constructor() {
    // private constructor
  }

  log(message?: unknown, ...optionalParams: unknown[]): void {
    console.log(message, ...optionalParams);
  }
}
