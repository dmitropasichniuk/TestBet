import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PermissionEnum } from "src/common/dictionary/permission";
import { UserEnum } from "src/common/dictionary/userStatus";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();

    user.login = createUserDto.login;
    user.password = createUserDto.password;

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
    user.password = updateUserDto.password;
    user.permissionLevel = updateUserDto.permissionLevel;
    user.status = updateUserDto.status;

    return this.userRepository.save(user);
  }

  async changeStatus(updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne(updateUserDto.id);

    if (!user){
      throw new HttpException(
        "User is not found.",
        HttpStatus.NOT_FOUND
      );
    }

    if (user.permissionLevel === PermissionEnum.USER_ADMIN_PERMISSION_LEVEL) {
      throw new HttpException(
        "The access level is insufficient",
        HttpStatus.NOT_ACCEPTABLE
      );
    }

    if (user.status === UserEnum.USER_STATUS_BANNED) {
      throw new HttpException(
        "User is already banned.",
        HttpStatus.NOT_ACCEPTABLE
      );
    }


    return this.userRepository.save(user);
  }
}
