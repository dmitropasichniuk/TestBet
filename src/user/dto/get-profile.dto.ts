import { UserDto } from './user.dto';

export class ProfileDto {
  constructor(user: UserDto) {
    if (user && typeof user === 'object') {
      delete user.password;
    }
    return {
      id: user.id,
      login: user.login,
      permissionLevel: user.permissionLevel,
      status: user.status,
    };
  }
  id: number;
  login: string;
  permissionLevel: number;
  status: number;
}
