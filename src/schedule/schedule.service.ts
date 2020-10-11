import { RequestGetMatchDto } from './../match/dto/request-get-match.dto';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MatchService } from './../match/match.service';
import { Match } from 'src/match/match.entity';
import { MatchResultEnum, MatchStatusEnum } from 'src/common/dictionary/matchDictionary';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly matchService: MatchService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleTicketsAndMatches(): Promise<void> {
    const searchMatchBy: RequestGetMatchDto = new RequestGetMatchDto();

    searchMatchBy.status = MatchStatusEnum.WAITING;

    const mathArr: Match[] = await this.matchService.findAllByStatus(searchMatchBy);

    mathArr.map( (eachMatch) => {
      if (eachMatch.startDate.getTime() < new Date().getTime() && eachMatch.result === MatchStatusEnum.WAITING) {
        eachMatch.status = MatchStatusEnum.STARTING;
      } else if (eachMatch.startDate.getTime() < new Date().getTime()) {
        eachMatch.status = MatchStatusEnum.END;
      }

      this.matchService.update(eachMatch);
    });

    
  }
}
