export const Permissions = ['bla read'] as const;

export type IPermission = (typeof Permissions)[number];
