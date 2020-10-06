import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { MatchDictionary, MatchEnum } from 'src/common/dictionary/matchStatus';

@Entity()
export class Good {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstTeam: string;

  @Column()
  secondTeam: string;

  @Column({
    type: 'enum',
    enum: MatchEnum,
    unique: false,
    default: MatchDictionary.IN_PROGRESS,
  })
  result: MatchEnum;


}
