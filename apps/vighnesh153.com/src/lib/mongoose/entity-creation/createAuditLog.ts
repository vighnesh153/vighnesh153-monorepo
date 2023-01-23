import { ClientSession } from 'mongoose';
import { IAuditLog } from '@vighnesh153/types';
import { AuditLogModel } from '@lib/mongoose/models';
import { log } from 'next-axiom';

/**
 * Creates a new audit log and invokes the `save` method
 *
 * @param auditLog
 * @param session
 */
export async function createAuditLog(auditLog: Omit<IAuditLog, 'createdAt'>, session: ClientSession): Promise<void> {
  try {
    await AuditLogModel.create([{ ...auditLog }], { session });
    log.info(auditLog.message, { action: auditLog.action, actor: auditLog.actor });
  } catch (error) {
    log.error('Failed to save audit log', { error, auditLog });
  }
}
