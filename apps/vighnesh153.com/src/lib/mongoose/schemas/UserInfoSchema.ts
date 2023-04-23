import { Schema } from 'mongoose';
import { IUserInfo } from '@vighnesh153/types';

export const UserInfoSchema = new Schema<IUserInfo>(
  {
    _id: { type: Schema.Types.String, required: true },
    clientId: { type: Schema.Types.String, required: true, unique: true },
    userName: { type: Schema.Types.String, required: true, unique: true },
    permanentlyBanned: { type: Schema.Types.Boolean, default: false },
    name: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true, unique: true },
    image: { type: Schema.Types.String, required: true },
  },
  {
    collection: 'user_info',
    optimisticConcurrency: true,
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);
