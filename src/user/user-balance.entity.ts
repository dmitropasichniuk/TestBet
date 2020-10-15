import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
  import { User } from './user.entity';
  
  @Entity()
  export class UserBalance {
    @PrimaryGeneratedColumn()
    id: number;
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @OneToOne((type) => User, (user) => user.balance)
    @JoinColumn()
    user: User;
  
    @Column({
      default: 0,
    })
    balanceReal: number;
  
    @CreateDateColumn({ type: 'timestamptz', select: false })
    createDate: number;
  
    @UpdateDateColumn({ type: 'timestamptz', select: false })
    updateDate: number;
  }
  