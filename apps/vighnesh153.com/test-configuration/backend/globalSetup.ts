import { MongoMemoryReplSet } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { serverTestConfig } from './config';

export default async function globalSetup() {
  if (serverTestConfig.Memory) {
    // Config to decided if a mongodb-memory-server instance should be used
    // it's needed in global space, because we don't want to create a new instance every test-suite
    const replSet = await MongoMemoryReplSet.create({
      replSet: { count: 1 },
      instanceOpts: [{ port: parseInt(serverTestConfig.Port, 10) }],
    });
    const uri = replSet.getUri();
    // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-explicit-any
    (global as any).__MONGOINSTANCE = replSet;
    process.env.MONGODB_URI = uri.slice(0, uri.lastIndexOf('/'));
  } else {
    process.env.MONGODB_URI = `mongodb://${serverTestConfig.IP}:${serverTestConfig.Port}`;
  }

  // The following is to make sure the database is clean before a test starts
  const connection = await mongoose.createConnection(`${process.env.MONGODB_URI}/${serverTestConfig.Database}`);
  await connection.dropDatabase();
  await connection.close();
}
