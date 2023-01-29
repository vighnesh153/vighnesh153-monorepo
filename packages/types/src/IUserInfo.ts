export interface IUserInfo {
  /**
   * Unique ID for the document
   */
  _id: string;

  /**
   * User's full name
   */
  name: string;

  /**
   * User's email address
   */
  email: string;

  /**
   * User's avatar link
   */
  image: string;

  /**
   * When was this entity created
   */
  createdAt: Date;
}
