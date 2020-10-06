import { IsInt, Length, IsString, IsNotEmpty} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateGoodDto {
  @Transform((value) => Number.isNaN(Number(value)) ? null : Number(value))
  @IsInt()
  userId:number;

  @Length(2, 40)
  @IsString()
  @IsNotEmpty()
  name:string;

  @Length(50, 1000)
  @IsString()
  @IsNotEmpty()
  description: string;

  @Transform((value) => Number.isNaN(Number(value)) ? null : Number(value))
  @IsInt()
  price: number;
  
}
