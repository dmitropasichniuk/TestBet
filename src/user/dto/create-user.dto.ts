import { IsInt, Length, IsString, IsNotEmpty, IsEnum} from 'class-validator';
import { Transform } from 'class-transformer';
import { PermissionEnum } from 'src/common/dictionary/permission';
import { UserEnum } from 'src/common/dictionary/userStatus';

export class CreateUserDto {
  @Transform((value) => Number.isNaN(Number(value)) ? null : Number(value))
  @IsInt()
  id:number;

  @Length(2, 40)
  @IsString()
  @IsNotEmpty()
  login:string;

  @Length(2, 40)
  @IsString()
  @IsNotEmpty()
  password:string;

  @Transform((value) => (Number.isNaN(Number(value)) ? null : Number(value)))
  @IsInt()
  @IsEnum(PermissionEnum)
  permissionLevel: PermissionEnum;

  @Transform((value) => (Number.isNaN(Number(value)) ? null : Number(value)))
  @IsInt()
  @IsEnum(UserEnum)
  status: UserEnum;
  
}
