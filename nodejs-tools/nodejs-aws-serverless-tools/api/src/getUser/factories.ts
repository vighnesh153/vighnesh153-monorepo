import { ConsoleLogger, createFactory, createSingletonFactory, Logger } from '@vighnesh153/tools-platform-independent';
import { CookieSerializer, CookieSerializerImpl } from '../common/CookieSerializer';

export const cookieSerializerFactory = createFactory<CookieSerializer>(() => {
  return new CookieSerializerImpl();
});

export const loggerSingletonFactory = createSingletonFactory<Logger>(() => {
  return ConsoleLogger.getInstance();
});
