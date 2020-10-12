/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable space-before-blocks */
import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ResponseLoginDto } from './dto/response-login.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { JwtPayloadData } from './dto/jwt-payload.data.dto';
import { ProfileDto } from '../user/dto/get-profile.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() request): Promise<ResponseLoginDto> {
    const user: UserDto = request.user;

    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async profile(@Request() request): Promise<ProfileDto> {
    const jwtPayloadData: JwtPayloadData = request.user.payload.jwtPayloadData;

    return this.authService.profile(jwtPayloadData);
  }
}
