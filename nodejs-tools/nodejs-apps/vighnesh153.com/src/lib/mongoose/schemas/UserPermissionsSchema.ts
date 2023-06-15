import { Schema } from 'mongoose';
import { AppPermissions, IUserPermissions } from '@vighnesh153/types';

export const UserPermissionsSchema = new Schema<IUserPermissions>(
  {
    _id: { type: Schema.Types.String, required: true },
    permissions: [{ type: String, enum: AppPermissions }],
    softBan: { type: Schema.Types.Boolean, default: false },
  },
  {
    collection: 'user_permissions',
    optimisticConcurrency: true,
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);
