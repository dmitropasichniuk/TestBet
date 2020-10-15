import { UserBalance } from "../user-balance.entity";

export class UserDto {
  id: number;
  login: string;
  password: string;
  permissionLevel: number;
  status: number;
  balance: UserBalance;
}
