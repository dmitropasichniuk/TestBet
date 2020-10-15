import { UserDictionary, UserEnum } from 'src/common/dictionary/userStatus';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import {PermissionEnum, PermissionDictionary} from 'src/common/dictionary/permission'
import { UserBalance } from './user-balance.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @OneToOne((type) => UserBalance, (balance) => balance.user)
  balance: UserBalance;


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
