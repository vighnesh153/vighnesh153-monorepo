import { Types, Document as MongooseDocument } from 'mongoose';
import { IAuditLog } from '@vighnesh153/types';
import { AuditLogModel } from '@lib/mongoose/models';

type AuditLogReturnType = MongooseDocument<unknown, unknown, IAuditLog> & IAuditLog & { _id: Types.ObjectId };

/**
 * Creates a new audit log and invokes the `save` method
 *
 * @param log
 */
export async function createAuditLog(log: Omit<IAuditLog, 'createdAt'>): Promise<AuditLogReturnType> {
  const auditLog = new AuditLogModel({ ...log });
  await auditLog.save();
  return auditLog;
}
