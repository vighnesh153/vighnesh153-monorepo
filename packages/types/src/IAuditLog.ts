import { AuditLogActionType } from './AuditLogActionType';

export interface IAuditLog {
  /**
   * What action was performed
   */
  action: AuditLogActionType;

  /**
   * Who performed the action
   */
  actor: {
    emailId: string;
    name: string;
  };

  /**
   * When was the action performed.
   *
   * Usage: `new Date()`
   */
  createdAt?: Date;

  /**
   * Human-readable message for more verbosity
   */
  message: string;
}
