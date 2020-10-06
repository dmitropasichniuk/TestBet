import { UserDictionary, UserEnum } from 'src/common/dictionary/userStatus';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {PermissionEnum, PermissionDictionary} from 'src/common/dictionary/permission'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: PermissionEnum,
    unique: false,
    default: PermissionDictionary.USER_CLIENT_PERMISSION_LEVEL,
  })
  permissionLevel: PermissionEnum;

  @Column({
    type: 'enum',
    enum: UserEnum,
    unique: false,
    default: UserDictionary.USER_STATUS_ACTIVE,
  })
  status: UserEnum;
}
