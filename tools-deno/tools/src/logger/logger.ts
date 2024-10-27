export interface Logger {
  log(message?: unknown, ...optionalParams: unknown[]): void;
}
