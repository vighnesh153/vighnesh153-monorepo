import mongoose from 'mongoose';
import { serverConfig } from '@modules/common/config/server-config';

// const isTestEnvironment = process.env.NODE_ENV === 'test';

// export const mainDbConnection = isTestEnvironment
//   ? mongoose.connection
//   : mongoose.createConnection(serverConfig.db.mongodb.connectionUri);
export const mainDbConnection = mongoose.createConnection(serverConfig.db.mongodb.connectionUri);
