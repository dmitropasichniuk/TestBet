import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Good } from './match.entity';
import { CreateGoodDto } from './dto/request-create-match.dto';
import { UpdateGoodDto } from './dto/request-update-match.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoodService {
  constructor(
    @InjectRepository(Good)
    private readonly goodRepository: Repository<Good>,
    private readonly userService: UserService,
  ) {}

  public async create(createGoodDto: CreateGoodDto): Promise<Good> {
    const good = new Good();
    const user = await this.userService.findOne(createGoodDto.userId);
  
    good.user = user;
    good.name = createGoodDto.name;
    good.description = createGoodDto.description;
    good.price = createGoodDto.price;

    return this.goodRepository.save(good);
  }

  public async update(updateGoodDto: UpdateGoodDto): Promise<Good> {
    const good = await this.goodRepository.findOne(updateGoodDto.id);

    good.name = updateGoodDto.name;
    good.description = updateGoodDto.description;  
    good.price = updateGoodDto.price;

    return this.goodRepository.save(good);
  }

  async findAll(): Promise<Good[]> {
    return this.goodRepository.find();
  }

  findOne(id: number): Promise<Good> {
    return this.goodRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.goodRepository.delete(id);
  }
}
