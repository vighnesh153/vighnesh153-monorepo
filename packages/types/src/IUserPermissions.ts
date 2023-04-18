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
   * When was this entity created
   */
  createdAt: Date;
}
