import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './match.entity';
import { CreateMatchDto } from './dto/request-create-match.dto';
import { UpdateMatchDto } from './dto/request-update-match.dto';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
  ) {}

  public async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const match = new Match();
    
    match.firstTeam = createMatchDto.firstTeam;
    match.secondTeam = createMatchDto.secondTeam;
    match.result = createMatchDto.result;
    match.startDate = createMatchDto.startDate;
    match.status = createMatchDto.status;

    return this.matchRepository.save(match);
  }

  public async update(updateMatchDto: UpdateMatchDto): Promise<Match> {
    const match = await this.matchRepository.findOne(updateMatchDto.id);

    match.firstTeam = updateMatchDto.firstTeam;
    match.secondTeam = updateMatchDto.secondTeam;
    match.result = updateMatchDto.result;
    match.startDate = updateMatchDto.startDate;
    match.status = updateMatchDto.status;

    return this.matchRepository.save(match);
  }

  async findAll(): Promise<Match[]> {
    return this.matchRepository.find();
  }

  findOne(id: number): Promise<Match> {
    return this.matchRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.matchRepository.delete(id);
  }
}
