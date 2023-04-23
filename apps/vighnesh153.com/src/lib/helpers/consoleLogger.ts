export function consoleLogger(message: string, ...args: unknown[]): void {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(message, ...args);
  }
}
