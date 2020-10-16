import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {
  MatchResultDictionary,
  MatchResultEnum,
  MatchStatusDictionary,
  MatchStatusEnum 
} from "src/common/dictionary/matchDictionary";

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstTeam: string;

  @Column()
  secondTeam: string;

  @Column({
    type: "enum",
    enum: MatchResultEnum,
    unique: false,
    default: MatchResultDictionary.IN_PROGRESS,
  })
  result: MatchResultDictionary;

  @Column()
  startDate: Date;

  @Column({
    type: "enum",
    enum: MatchStatusEnum,
    unique: false,
    default: MatchStatusDictionary.WAITING,
  })
  status: MatchStatusEnum;
}
