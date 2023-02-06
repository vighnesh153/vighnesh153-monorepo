/**
 * Not all fields should be sent to the client (like email)
 */
export interface IPublicUserInfo {
  /**
   * This ID will be shared on the client to uniquely identify the user
   */
  clientId: string;

  /**
   * User preferred name for the portal
   */
  userName: string;

  /**
   * User's full name
   */
  name: string;

  /**
   * User's avatar link
   */
  image: string;

  /**
   * When was this entity created
   */
  createdAt: Date;
}

export interface IUserInfo extends IPublicUserInfo {
  /**
   * Unique ID for the document (server only)
   */
  _id: string;

  /**
   * User's email address
   */
  email: string;
}
