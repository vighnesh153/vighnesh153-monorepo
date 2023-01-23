const AuditLogActions = ['user/sign-up', 'user/log-in'] as const;
export type AuditLogActionType = (typeof AuditLogActions)[number];
