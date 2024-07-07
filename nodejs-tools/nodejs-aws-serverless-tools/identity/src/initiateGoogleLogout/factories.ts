import { createFactory, createSingletonFactory } from '@vighnesh153/factory';
import { ConsoleLogger, Logger } from '@vighnesh153/logger';

import { CookieSerializer, CookieSerializerImpl } from '../common/CookieSerializer';

export const loggerSingletonFactory = createSingletonFactory<Logger>(() => {
  return ConsoleLogger.getInstance();
});

export const cookieSerializerFactory = createFactory<CookieSerializer>(() => {
  return new CookieSerializerImpl();
});
