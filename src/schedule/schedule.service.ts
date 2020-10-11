import { TicketStatusEnum } from 'src/common/dictionary/ticket';
import { RequestGetTicketDto } from './../ticket/dto/request-get.dto';
import { RequestGetMatchDto } from './../match/dto/request-get.dto';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TicketService } from './../ticket/ticket.service';
import { MatchService } from './../match/match.service';
import { Match } from 'src/match/match.entity';
import { ResultEnum, MatchStatusEnum } from 'src/common/dictionary/match';
import { Ticket } from 'src/ticket/ticket.entity';
import { RequestCreateTransactionDto } from 'src/transaction/dto/request-create.dto';
import { TransactionTypesDictionary } from 'src/common/dictionary/transaction-types';
import { TransactionService } from 'src/transaction/transaction.service';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly ticketService: TicketService,
    private readonly matchService: MatchService,
    private readonly transactionService: TransactionService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleTicketsAndMatches(): Promise<void> {
    const searchMatchBy: RequestGetMatchDto = new RequestGetMatchDto();

    searchMatchBy.status = MatchStatusEnum.STATUS_WAITING;

    const mathArr: Match[] = await this.matchService.findAllByStatus(searchMatchBy);

    mathArr.map( (eachMatch) => {
      if (eachMatch.startDate.getTime() < new Date().getTime() && eachMatch.result === ResultEnum.RESULT_NONE) {
        eachMatch.status = MatchStatusEnum.STATUS_STARTING;
      } else if (eachMatch.startDate.getTime() < new Date().getTime()) {
        eachMatch.status = MatchStatusEnum.STATUS_END;
      }

      this.matchService.update(eachMatch);
    });

    const searchTicketBy: RequestGetTicketDto = new RequestGetTicketDto();

    searchTicketBy.status = TicketStatusEnum.TICKET_STATUS_PLACED;

    const ticketArr: Ticket[] = await this.ticketService.findAllByStatus(searchTicketBy);

    ticketArr.map( (eachTicket) => {
      if (eachTicket.match.result !== ResultEnum.RESULT_NONE) {
        if (eachTicket.payload === eachTicket.match.result) {
          eachTicket.status = TicketStatusEnum.TICKET_STATUS_WIN;
          const transaction: RequestCreateTransactionDto = new RequestCreateTransactionDto();

          transaction.amount = eachTicket.amount * 2;
          transaction.targetId = eachTicket.user.id;
          transaction.type = TransactionTypesDictionary.TRANSACTION_INCOMING;
          this.transactionService.create(transaction);
        } else {
          eachTicket.status = TicketStatusEnum.TICKET_STATUS_LOSE;
        }

        this.ticketService.update(eachTicket);
      }
    });
  }
}
