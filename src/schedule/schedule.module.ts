import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { MatchModule } from './../match/match.module';
@Module({
  imports: [
    MatchModule,
  ],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {}

