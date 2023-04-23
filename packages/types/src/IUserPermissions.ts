import { IAppPermission } from './IAppPermission';

export interface IUserPermissions {
  /**
   * Server id of the user
   */
  _id: string;

  /**
   * List of permissions assigned to the user
   */
  permissions: Array<IAppPermission>;

  /**
   * Ignore all the permissions specified in the above array.
   *
   * > User will still be able to do actions that don't require any permissions
   */
  softBan: boolean;

  /**
   * When was this entity created
   */
  createdAt: Date;
}
