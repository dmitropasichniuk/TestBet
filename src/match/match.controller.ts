import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GoodService } from './match.service';
import { Good } from './match.entity';
import { CreateGoodDto } from './dto/request-create-match.dto';
import { UpdateGoodDto } from './dto/request-update-match.dto';

@Controller('good')
export class GoodController {
  constructor(private readonly goodService: GoodService) {}

  @Post('create')
  create(@Body() createGoodDto: CreateGoodDto): Promise<Good> {
    return this.goodService.create(createGoodDto);
  }

  @Post('update')
  update(@Body() updateGoodDto: UpdateGoodDto): Promise<Good> {
    return this.goodService.update(updateGoodDto);
  }

  
  @Get()
  findAll(): Promise<Good[]> {
    return this.goodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Good> {
    return this.goodService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.goodService.remove(id);
  }
}
