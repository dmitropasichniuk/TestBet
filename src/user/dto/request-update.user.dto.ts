import { IsInt, Length, IsString, IsNotEmpty, IsEnum, IsOptional} from 'class-validator';
import { Transform } from 'class-transformer';
import { PermissionEnum } from 'src/common/dictionary/permission';
import { UserEnum } from 'src/common/dictionary/userStatus';

export class UpdateUserDto {
  @Transform((value) => Number.isNaN(Number(value)) ? null : Number(value))
  @IsInt()
  readonly id: number;

  @Length(2, 40)
  @IsString()
  @IsNotEmpty()
  login?:string;

  @Length(2, 40)
  @IsString()
  @IsNotEmpty()
  password?:string;

  @Transform((value) => Number.isNaN(Number(value)) ? null : Number(value))
  @IsInt()
  @IsOptional()
  balance?: number;

  @Transform((value) => (Number.isNaN(Number(value)) ? null : Number(value)))
  @IsInt()
  @IsEnum(PermissionEnum)
  permissionLevel?: PermissionEnum;

  @Transform((value) => (Number.isNaN(Number(value)) ? null : Number(value)))
  @IsInt()
  @IsEnum(UserEnum)
  status?: UserEnum;
  
}
