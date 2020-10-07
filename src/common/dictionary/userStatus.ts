export class UserDictionary {
    static USER_STATUS_ACTIVE: number = 1;
    static USER_STATUS_BANNED: number = 2;
  }
  
  export enum UserEnum {
    USER_STATUS_ACTIVE = UserDictionary.USER_STATUS_ACTIVE,
    USER_STATUS_BANNED = UserDictionary.USER_STATUS_BANNED,
  }