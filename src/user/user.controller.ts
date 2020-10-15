import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PermissionDictionary } from 'src/common/dictionary/permission';
import { PermissionGuard } from 'src/common/guards/permission.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/request-update.user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('findOne')
  findOne(@Body() id: number): Promise<User>{
    return this.userService.findOne(id);
  }

  @Post('update')
  update(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(updateUserDto);
  }

  @UseGuards(new PermissionGuard(PermissionDictionary.USER_ADMIN_PERMISSION_LEVEL))
  @Post('changeStatus')
  changeStatus(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(updateUserDto);
  }

}
