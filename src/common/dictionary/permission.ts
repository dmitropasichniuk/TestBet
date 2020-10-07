export class PermissionDictionary {
  static USER_CLIENT_PERMISSION_LEVEL: number = 1;
  static USER_ADMIN_PERMISSION_LEVEL: number = 8;
}

export enum PermissionEnum {
  USER_CLIENT_PERMISSION_LEVEL = PermissionDictionary.USER_CLIENT_PERMISSION_LEVEL,
  USER_ADMIN_PERMISSION_LEVEL = PermissionDictionary.USER_ADMIN_PERMISSION_LEVEL,
}
