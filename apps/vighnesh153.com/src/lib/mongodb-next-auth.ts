/* eslint-disable @typescript-eslint/ban-ts-comment */

// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, MongoClientOptions } from 'mongodb';
import { serverConfig } from '@/modules/common/config/server-config';

const uri = serverConfig.db.mongodb.connectionUri;
const options: MongoClientOptions = {};

let client: MongoClient;
const mongoGlobalVariable = '_mongoClientPromise';
// eslint-disable-next-line import/no-mutable-exports
let nextAuthMongoDbClientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  // @ts-ignore
  if (!global[mongoGlobalVariable]) {
    client = new MongoClient(uri, options);
    // @ts-ignore
    global[mongoGlobalVariable] = client.connect();
  }
  // @ts-ignore
  nextAuthMongoDbClientPromise = global[mongoGlobalVariable];
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  nextAuthMongoDbClientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export { nextAuthMongoDbClientPromise };
