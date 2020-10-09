import { IsInt, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { PermissionEnum } from '../../common/dictionary/permission';
import { Transform } from 'class-transformer';

export class RequestGetUserDto {
  @Transform((value) => Number.isNaN(Number(value)) ? null : Number(value))
  @IsInt()
  id?: number;

  @IsOptional()
  login?: string;

  @IsOptional()
  password?: string;

  @Transform((value) => Number.isNaN(Number(value)) ? null : Number(value))
  @IsInt()
  @IsEnum(PermissionEnum)
  permissionLevel?: number;

  @Transform((value) => Number.isNaN(Number(value)) ? null : Number(value))
  @IsInt()
  @IsOptional()
  status?: number;
}
