import mongoose from 'mongoose';
import { serverConfig } from '@modules/common/config/server-config';

export const mainDbConnection = mongoose.createConnection(serverConfig.db.mongodb.connectionUri);
