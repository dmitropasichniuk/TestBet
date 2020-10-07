import { IsInt, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { PayloadResultEnum } from 'src/common/dictionary/payloadResult';
import { TicketStatusEnum } from 'src/common/dictionary/ticketStatus';

export class UpdateTicketDto {
  @Transform((value) => Number.isNaN(Number(value)) ? null : Number(value))
  @IsInt()
  readonly id: number;

  @Transform((value) => (Number.isNaN(Number(value)) ? null : Number(value)))
  @IsInt()
  amount?: number;
  
  @Transform((value) => (Number.isNaN(Number(value)) ? null : Number(value)))
  @IsInt()
  userId?: number;

  @Transform((value) => (Number.isNaN(Number(value)) ? null : Number(value)))
  @IsInt()
  match?: number;

  @Transform((value) => (Number.isNaN(Number(value)) ? null : Number(value)))
  @IsInt()
  @IsEnum(PayloadResultEnum)
  payload?: PayloadResultEnum;

  @Transform((value) => (Number.isNaN(Number(value)) ? null : Number(value)))
  @IsInt()
  @IsEnum(TicketStatusEnum)
  status?: TicketStatusEnum;
}
