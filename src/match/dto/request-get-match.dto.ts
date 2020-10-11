import { IsInt, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { MatchResultEnum, MatchStatusEnum } from 'src/common/dictionary/matchDictionary';

export class RequestGetMatchDto {

  @Transform((value) => Number.isNaN(Number(value)) ? null : Number(value))
  @IsInt()
  @IsOptional()
  readonly id?: number;

  @Length(2, 100)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstTeam?: string;

  @Length(2, 40)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  secondTeam?: string;

  @Transform((value) => Number.isNaN(Number(value)) ? null : Number(value))
  @IsEnum(MatchResultEnum)
  @IsOptional()
  result?: MatchResultEnum;

  @Transform((value) => Number.isNaN(Number(value)) ? null : Number(value))
  @IsEnum(MatchStatusEnum)
  @IsOptional()
  status?: MatchStatusEnum;
  
}
