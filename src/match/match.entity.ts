import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {
  MatchResultDictionary,
  MatchResultEnum,
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
  })
  status: MatchStatusEnum;
}
