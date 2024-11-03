import {
  ConsoleLogger,
  createSingletonFactory,
  Logger,
} from "@vighnesh153/tools";

export const loggerSingletonFactory = createSingletonFactory<Logger>(() => {
  return ConsoleLogger.getInstance();
});
