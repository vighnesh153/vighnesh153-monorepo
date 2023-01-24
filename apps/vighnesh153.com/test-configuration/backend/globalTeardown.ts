import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { serverTestConfig } from './config';

export default async function globalTeardown() {
  if (serverTestConfig.Memory) {
    // Config to decided if a mongodb-memory-server instance should be used
    // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-explicit-any
    const replSet: MongoMemoryReplSet = (global as any).__MONGOINSTANCE;
    await replSet.stop();
  }
}
