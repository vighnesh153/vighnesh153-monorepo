const AuditLogActions = ['user/sign-up', 'user/log-in', 'user/update-info'] as const;
export type AuditLogActionType = (typeof AuditLogActions)[number];
