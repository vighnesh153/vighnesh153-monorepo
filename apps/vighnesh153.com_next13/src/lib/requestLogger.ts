/* eslint-disable no-console */
import { Logger, log as nextAxiomLog } from 'next-axiom';
import { v4 as uuidv4 } from 'uuid';

export function createRequestLogger(): Logger {
  if (process.env.NODE_ENV === 'development') {
    return {
      info: console.info,
      error: console.error,
      debug: console.debug,
      warn: console.warn,
    } as unknown as Logger;
  }
  return nextAxiomLog.with({ requestId: uuidv4() });
}
