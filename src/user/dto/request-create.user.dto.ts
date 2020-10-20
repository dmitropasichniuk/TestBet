import { Length, IsString, IsNotEmpty, IsOptional} from 'class-validator';
import { UserDto } from './user.dto';

export class CreateUserDto {

  @Length(2, 40)
  @IsString()
  @IsNotEmpty()
  login:string;

  @Length(2, 40)
  @IsString()
  @IsNotEmpty()
  password:string;

  @IsOptional()
  parent?: UserDto;

}
