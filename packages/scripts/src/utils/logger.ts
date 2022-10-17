/**
 * Scripts logger for console
 */
export class Logger {
  static debug(message?: any, ...optionalParams: any[]) {
    console.debug(`\x1b[37m [DEBUG] ${message}`, ...optionalParams)
  }

  static error(message?: any, ...optionalParams: any[]) {
    console.error(`\x1b[31m [ERROR] ${message}`, ...optionalParams)
  }

  static warn(message?: any, ...optionalParams: any[]) {
    console.error(`\x1b[33m [WARN] ${message}`, ...optionalParams)
  }

  static info(message?: any, ...optionalParams: any[]) {
    console.info(`\x1b[35m [INFO] ${message}`, ...optionalParams);
  }

  static success(message?: any, ...optionalParams: any[]) {
    console.log(`\x1b[32m [SUCCESS] ${message}`, ...optionalParams);
  }
}
