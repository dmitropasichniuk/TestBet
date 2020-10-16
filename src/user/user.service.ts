import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PermissionEnum } from "src/common/dictionary/permission";
import { UserDictionary, UserEnum } from "src/common/dictionary/userStatus";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/request-create.user.dto";
import { ProfileDto } from "./dto/get-profile.dto";
import { RequestGetUserDto } from "./dto/request-get.dto";
import { UpdateUserDto } from "./dto/request-update.user.dto";
import { UserDto } from "./dto/user.dto";
import { UserBalance } from "./user-balance.entity";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserBalance)
    private readonly balanceRepository: Repository<UserBalance>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {    
    const user = new User();

    user.login = createUserDto.login;
    user.password = createUserDto.password;

    const newUser: User = await this.userRepository.save(user);
    const userBalance: UserBalance = new UserBalance();

    userBalance.user = newUser;
    await this.balanceRepository.save(userBalance);

    return newUser;
  }

  async findAll(): Promise<UserDto[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<UserDto> {
    return this.userRepository.findOne(id)
  }

  public async findByLogin(login: string): Promise<UserDto> {
    return await this.userRepository.findOne(login);
  }

  public async update(updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.userRepository.findOne(updateUserDto.id);

    if (!user) {
      throw new HttpException("User is not found", HttpStatus.NOT_FOUND);
    }

    user.login = updateUserDto.login;
    user.password = updateUserDto.password;
    user.permissionLevel = updateUserDto.permissionLevel;
    user.status = updateUserDto.status;

    return this.userRepository.save(user);
  }

  async ban(updateUserDto: UpdateUserDto): Promise<UserDto> { //change status
    const user = await this.userRepository.findOne(updateUserDto.id);
    
    if (!user) {
      throw new HttpException("User is not found.", HttpStatus.NOT_FOUND);
    }

    if (user.status === UserEnum.USER_STATUS_BANNED) {
      throw new HttpException(
        "User is already banned.",
        HttpStatus.NOT_ACCEPTABLE
      );
    }

    if (user.permissionLevel === PermissionEnum.USER_ADMIN_PERMISSION_LEVEL) {
      throw new HttpException(
        "The access level is insufficient",
        HttpStatus.NOT_ACCEPTABLE
      );
    }
    
    user.status = UserEnum.USER_STATUS_BANNED;

    return this.userRepository.save(user);
  }
}
