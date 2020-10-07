import { Body, Controller, Get, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket.entity';
import { CreateTicketDto } from './dto/request-create-ticket.dto';
import { UpdateTicketDto } from './dto/request-update-ticket.dto';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('create')
  create(@Body() creatMatchDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketService.create(creatMatchDto);
  }

  @Post('update')
  update(@Body() updateMatchDto: UpdateTicketDto): Promise<Ticket> {
    return this.ticketService.update(updateMatchDto);
  }

  
  @Get()
  findAll(): Promise<Ticket[]> {
    return this.ticketService.findAll();
  }

}
