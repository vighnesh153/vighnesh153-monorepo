import { AuditLogActionType } from './AuditLogActionType';

export interface IAuditLog {
  /**
   * What action was performed
   */
  action: AuditLogActionType;

  /**
   * Who performed the action
   */
  actor: { email: string };

  /**
   * When was the action performed.
   *
   * Usage: `new Date()`
   */
  createdAt?: Date;

  /**
   * Additional fields to be logged in the audit log
   */
  fields?: Record<string | number, unknown>;

  /**
   * Human-readable message for more verbosity
   */
  message: string;
}
