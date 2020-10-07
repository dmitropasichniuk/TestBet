import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ticket } from "./ticket.entity";
import { CreateTicketDto } from "./dto/request-create-ticket.dto";
import { UpdateTicketDto } from './dto/request-update-ticket.dto';
//import { UserService } from "src/user/user.service";
//import { MatchService } from "src/match/match.service";

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    //private readonly userService: UserService,
    //private readonly matchService: MatchService
  ) {}

  public async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const ticket = new Ticket();
    //const user = await this.userService.findOne(createTicketDto.userId);
    //const match = await this.matchService.findOne(createTicketDto.match);

    ticket.amount = createTicketDto.amount;
    //ticket.userId = user.id;
    //ticket.match = match.id;
    ticket.payload = createTicketDto.payload;
    ticket.status = createTicketDto.status;

    return this.ticketRepository.save(ticket);
  }

  public async update(updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne(updateTicketDto.id);
    //const user = await this.userService.findOne(updateTicketDto.userId);
    //const match = await this.matchService.findOne(updateTicketDto.match);

    ticket.amount = updateTicketDto.amount;
    //ticket.userId = user.id;
    //ticket.match = match.id;
    ticket.payload = updateTicketDto.payload;
    ticket.status = updateTicketDto.status;

    return this.ticketRepository.save(ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }
}
