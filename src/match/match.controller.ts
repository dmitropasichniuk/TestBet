import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { MatchService } from './match.service';
import { Match } from './match.entity';
import { CreateMatchDto } from './dto/request-create-match.dto';
import { UpdateMatchDto } from './dto/request-update-match.dto';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('create')
  create(@Body() creatMatchDto: CreateMatchDto): Promise<Match> {
    return this.matchService.create(creatMatchDto);
  }

  @Post('update')
  update(@Body() updateMatchDto: UpdateMatchDto): Promise<Match> {
    return this.matchService.update(updateMatchDto);
  }

  
  @Get()
  findAll(): Promise<Match[]> {
    return this.matchService.findAll();
  }

  @Get('findOne')
  findOne(@Body() id: number): Promise<Match> {
    return this.matchService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.matchService.remove(id);
  }
}
