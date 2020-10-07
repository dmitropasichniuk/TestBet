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

    user.id = createUserDto.id;
    user.login = createUserDto.login;
    user.password = createUserDto.password
    user.permissionLevel = createUserDto.permissionLevel;
    user.status = createUserDto.status;

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
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
