export const AppPermissions = ['admin:read', 'admin:write'] as const;

export type IAppPermission = (typeof AppPermissions)[number];
