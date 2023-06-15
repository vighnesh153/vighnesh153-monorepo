const AuditLogActions = [
  'user/sign-up',
  'user/log-in',
  'user/update-info',
  'user-permissions/create',
  'user-permissions/update',
] as const;
export type AuditLogActionType = (typeof AuditLogActions)[number];
