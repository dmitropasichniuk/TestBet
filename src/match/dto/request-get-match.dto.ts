import { IsInt, IsEnum, IsOptional } from 'class-validator';
import { PermissionEnum } from '../../common/dictionary/permission';
import { Transform } from 'class-transformer';
import { MatchStatusEnum } from 'src/common/dictionary/matchDictionary';

export class RequestGetMatchDto {

  @Transform((value) => Number.isNaN(Number(value)) ? null : Number(value))
  @IsInt()
  @IsEnum(PermissionEnum)
  permissionLevel?: PermissionEnum;

  @Transform((value) => Number.isNaN(Number(value)) ? null : Number(value))
  @IsInt()
  @IsEnum(MatchStatusEnum)
  status : MatchStatusEnum;
}
