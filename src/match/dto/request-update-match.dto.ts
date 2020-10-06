import { IsInt, Length, IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { GoodEnum } from 'src/common/dictionary/matchStatus';

export class UpdateGoodDto {
  @Transform((value) => Number.isNaN(Number(value)) ? null : Number(value))
  @IsInt()
  readonly id: number;

  @Length(2, 40)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?:string;

  @Length(50, 1000)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @Transform((value) => Number.isNaN(Number(value)) ? null : Number(value))
  @IsInt()
  @IsOptional()
  price?: number;

  @Transform((value) => (Number.isNaN(Number(value)) ? null : Number(value)))
  @IsInt()
  @IsEnum(GoodEnum)
  status?: GoodEnum;
}
