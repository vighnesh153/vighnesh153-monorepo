import { Schema } from 'mongoose';
import { IAuditLog } from '@vighnesh153/types';

export const AuditLogSchema = new Schema<IAuditLog>(
  {
    action: { type: String, required: true },
    actor: {
      email: { type: String, required: true },
      name: { type: String, required: true },
    },
    message: { type: String, required: true },
  },
  {
    collection: 'audit_logs',
    optimisticConcurrency: true,
    timestamps: {
      createdAt: 'createdAt',
    },
  }
);
