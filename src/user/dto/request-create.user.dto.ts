import { IsInt, Length, IsString, IsNotEmpty, IsEnum} from 'class-validator';
import { Transform } from 'class-transformer';
import { PermissionEnum } from 'src/common/dictionary/permission';
import { UserEnum } from 'src/common/dictionary/userStatus';

export class CreateUserDto {

  @Length(2, 40)
  @IsString()
  @IsNotEmpty()
  login:string;

  @Length(2, 40)
  @IsString()
  @IsNotEmpty()
  password:string;

}
