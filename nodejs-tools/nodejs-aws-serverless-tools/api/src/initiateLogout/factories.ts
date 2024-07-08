import {
  createFactory,
  createSingletonFactory,
  ConsoleLogger,
  type Logger,
} from '@vighnesh153/tools-platform-independent';

import { CookieSerializer, CookieSerializerImpl } from '../common/CookieSerializer';

export const loggerSingletonFactory = createSingletonFactory<Logger>(() => {
  return ConsoleLogger.getInstance();
});

export const cookieSerializerFactory = createFactory<CookieSerializer>(() => {
  return new CookieSerializerImpl();
});
