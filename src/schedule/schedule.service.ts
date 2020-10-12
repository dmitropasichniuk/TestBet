import { RequestGetMatchDto } from "./../match/dto/request-get-match.dto";
import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { MatchService } from "./../match/match.service";
import { Match } from "src/match/match.entity";
import {
  MatchResultEnum,
  MatchStatusEnum,
} from "src/common/dictionary/matchDictionary";
import { TicketStatusEnum } from "src/common/dictionary/ticketStatus";
import { CreateMatchDto } from "src/match/dto/request-create-match.dto";
import { UpdateMatchDto } from "src/match/dto/request-update-match.dto";

@Injectable()
export class ScheduleService {
  constructor(private readonly matchService: MatchService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleTicketsAndMatches(): Promise<void> {
    const searchMatchBy: RequestGetMatchDto = new RequestGetMatchDto();

    searchMatchBy.status = MatchStatusEnum.WAITING;

    const mathArr: Match[] = await this.matchService.findAllByStatus(
      searchMatchBy
    );

    mathArr.map((eachMatch) => {
      if (
        eachMatch.startDate.getTime() < new Date().getTime() &&
        eachMatch.result === MatchStatusEnum.WAITING
      ) {
        eachMatch.status = MatchStatusEnum.STARTING;
      } else if (eachMatch.startDate.getTime() < new Date().getTime()) {
        eachMatch.status = MatchStatusEnum.END;
      }

      this.matchService.update(eachMatch.status);
    });

    /////

    const searchMatchByResult: RequestGetMatchDto = new RequestGetMatchDto();

    searchMatchByResult.result = MatchResultEnum.IN_PROGRESS;

    const mathArrResult: Match[] = await this.matchService.findAllByResult(
      searchMatchByResult
    );

    mathArrResult.map((eachMatchByResult) => {
      if (eachMatchByResult.result !== MatchResultEnum.IN_PROGRESS) {
        
        if (eachMatchByResult.result === eachMatchByResult.WIN) {
          eachMatchByResult.result = MatchResultEnum.WIN;

        } else if (eachMatchByResult.result === eachMatchByResult.LOOSE) {
          eachMatchByResult.result = MatchResultEnum.LOOSE;

        } else  {
          eachMatchByResult.result = MatchResultEnum.DRAW;
        }

        this.matchService.update(eachMatchByResult);
      }
    });
  }
}
