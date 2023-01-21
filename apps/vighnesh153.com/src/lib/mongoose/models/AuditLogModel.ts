import { mainDbConnection } from '@lib/mongoose/connection';
import { AuditLogSchema } from '@lib/mongoose/schemas';
import { ModelNames } from '@lib/mongoose/model-names';

export const AuditLogModel = mainDbConnection.model(ModelNames.AuditLog, AuditLogSchema);
