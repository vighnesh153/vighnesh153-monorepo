/**
 * Scripts logger for console
 */
export class Logger {
  static debug(message?: unknown, ...optionalParams: unknown[]) {
    console.debug(`\x1b[37m [DEBUG] ${message}`, ...optionalParams);
  }

  static error(message?: unknown, ...optionalParams: unknown[]) {
    console.error(`\x1b[31m [ERROR] ${message}`, ...optionalParams);
  }

  static warn(message?: unknown, ...optionalParams: unknown[]) {
    console.warn(`\x1b[33m [WARN] ${message}`, ...optionalParams);
  }

  static info(message?: unknown, ...optionalParams: unknown[]) {
    console.info(`\x1b[35m [INFO] ${message}`, ...optionalParams);
  }

  static success(message?: unknown, ...optionalParams: unknown[]) {
    console.log(`\x1b[32m [SUCCESS] ${message}`, ...optionalParams);
  }
}
