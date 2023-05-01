import { ClientSession } from 'mongoose';
import { IAuditLog, SuccessOrFailureType } from '@vighnesh153/types';
import { log } from 'next-axiom';
import { AuditLogModel } from '@/lib/mongoose/models';

/**
 * Creates a new audit log and invokes the `save` method
 *
 * @param auditLog
 * @param session
 */
export async function createAuditLog(
  auditLog: Omit<IAuditLog, 'createdAt'>,
  session?: ClientSession
): Promise<SuccessOrFailureType> {
  try {
    await AuditLogModel.create([{ ...auditLog }], { session });
    log.info(auditLog.message, { action: auditLog.action, actor: auditLog.actor });
    return 'success';
  } catch (error) {
    log.error('Failed to save audit log', { error, auditLog });
    return 'failure';
  }
}
