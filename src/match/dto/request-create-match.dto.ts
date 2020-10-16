import { Length, IsString, IsNotEmpty } from "class-validator";

export class CreateMatchDto {
  @Length(2, 40)
  @IsString()
  @IsNotEmpty()
  firstTeam: string;

  @Length(2, 40)
  @IsString()
  @IsNotEmpty()
  secondTeam: string;

  startDate: Date;
}
