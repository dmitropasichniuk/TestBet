import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/user/dto/user.dto';
import { JwtPayloadData } from './dto/jwt-payload.data';
import { ResponseLoginDto } from './dto/response-login.dto';
import { UserDictionary } from '../common/dictionary/userStatus';
import { ProfileDto } from '../user/dto/get-profile.dto';
import { RequestGetUserDto } from 'src/user/dto/request-get.dto';

@Injectable()
export class AuthService {
  constructor(
      private userService: UserService,
      private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<ProfileDto | null> {
    const user: UserDto = await this.userService.findByLogin(login);

    if (user && user.password === password) {
      return new ProfileDto(user);
    }

    return null;
  }

  async login(user: UserDto): Promise<ResponseLoginDto> {
    const responseLoginDto: ResponseLoginDto = new ResponseLoginDto();
    const jwtPayloadData = new JwtPayloadData();

    if (!user.status ||
      user.status === UserDictionary.USER_STATUS_BANNED
    ) {
      throw new HttpException('You don\'t have permission for this operation. You have been banned/deleted.', HttpStatus.FORBIDDEN);
    }

    jwtPayloadData.permissionLevel = user.permissionLevel;
    jwtPayloadData.userId = user.id;
    responseLoginDto.accessToken = this.jwtService.sign( { jwtPayloadData } );
    responseLoginDto.user = new ProfileDto(user);

    return responseLoginDto;
  }

  async profile(jwtPayloadData: JwtPayloadData): Promise<ProfileDto> {
    const findByParams: RequestGetUserDto = new RequestGetUserDto();

    findByParams.id = jwtPayloadData.userId;
    const userProfile: ProfileDto = await this.userService.findOne(findByParams.id);

    if (userProfile) {
      return userProfile;
    } else {
      throw new UnauthorizedException();
    }
  }
}
