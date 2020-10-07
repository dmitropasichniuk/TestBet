import { PayloadResultDictionary, PayloadResultEnum } from "src/common/dictionary/payloadResult";
import { TicketStatusDictionary, TicketStatusEnum } from "src/common/dictionary/ticketStatus";
import { Match } from "src/match/match.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @ManyToOne((type) => User, user => user.id)
  @JoinColumn()
  userId: number;

  @ManyToOne((type) => Match, match => match.id)
  @JoinColumn()
  match: number;

  @Column({
    type: "enum",
    enum: PayloadResultEnum,
    unique: false,
    default: PayloadResultDictionary.IN_PROGRESS,
  })
  payload: PayloadResultDictionary;

  @Column({
    type: "enum",
    enum: TicketStatusEnum,
    unique: false,
    default: TicketStatusDictionary.WAITING,
  })
  status: TicketStatusDictionary;

}
