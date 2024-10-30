export const permissions = [
  "admin",
  "file_upload",
  "private_file_view",
] as const;

export type Permission = (typeof permissions)[number];

export function hasPermission(userId: string, permission: Permission): boolean {
  if (isAdmin(userId)) {
    return true;
  }
  if (userId in userPermissions) {
    const key = userId as keyof typeof userPermissions;
    return userPermissions[key].includes(permission);
  }
  return false;
}

function isAdmin(userId: string): boolean {
  if (userId in userPermissions) {
    const key = userId as keyof typeof userPermissions;
    return userPermissions[key].includes("admin");
  }
  return false;
}

const userPermissions: Record<string, Permission[]> = {
  vighnesh153: ["admin", "file_upload", "private_file_view"],
};
