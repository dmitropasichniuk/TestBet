import { IsInt, Length, IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { MatchResultEnum, MatchStatusEnum } from 'src/common/dictionary/matchDictionary';


export class UpdateMatchDto {
  @Transform((value) => Number.isNaN(Number(value)) ? null : Number(value))
  @IsInt()
  readonly id: number;

  @Length(2, 40)
  @IsString()
  @IsNotEmpty()
  firstTeam?:string;

  @Length(50, 1000)
  @IsString()
  @IsNotEmpty()
  secondTeam?: string;

  @Transform((value) => (Number.isNaN(Number(value)) ? null : Number(value)))
  @IsInt()
  @IsEnum(MatchResultEnum)
  result?: MatchResultEnum;

  startDate?: Date;

  @Transform((value) => (Number.isNaN(Number(value)) ? null : Number(value)))
  @IsInt()
  @IsEnum(MatchStatusEnum)
  status?: MatchStatusEnum;
}
