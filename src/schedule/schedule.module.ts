import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { MatchModule } from './../match/match.module';
import { TicketModule } from './../ticket/ticket.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [
    TicketModule,
    MatchModule,
    TransactionModule,
  ],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {}

