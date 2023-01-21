import { Schema } from 'mongoose';
import { IUserInfo } from '@vighnesh153/types';

export const UserInfoSchema = new Schema<IUserInfo>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
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
