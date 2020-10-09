import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();

    user.login = createUserDto.login;
    user.password = createUserDto.password
    
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  public async findByLogin(login: string): Promise<User> {
    return await this.userRepository.findOne({ where: { login } });
  }

  public async update(updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne(updateUserDto.id);

    user.login = updateUserDto.login;
    user.password = updateUserDto.password
    user.permissionLevel = updateUserDto.permissionLevel;
    user.status = updateUserDto.status;

    return this.userRepository.save(user);
  }
}
