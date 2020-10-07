import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ticket } from "./ticket.entity";
import { TicketService } from "./ticket.service";
import { TicketController } from "./ticket.controller";
import { UserModule } from "src/user/user.module";
import { MatchModule } from "src/match/match.module";

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), UserModule, MatchModule],
  providers: [TicketService],
  controllers: [TicketController],
})
export class TicketModule {}
