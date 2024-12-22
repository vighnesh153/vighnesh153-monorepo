import { type Permissions } from "./permissions";
import { vighnesh153Permissions } from "./vighnesh153";

export function hasPermission(
  uid: string,
  permission: keyof Permissions,
): boolean {
  return uidToPermissions[uid]?.[permission] ?? false;
}

const uidToPermissions: Record<string, Permissions> = {
  // prod
  "pIX2CHynXKYyobveA1B3Ym7T99Z2": vighnesh153Permissions,

  // local
  "ekAHm4gvpTBjoSmvINUnt638btaM": vighnesh153Permissions,
};
