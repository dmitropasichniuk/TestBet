import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import * as crypto from 'crypto';
import { Env } from '../common/dictionary/env';
import { AuthService } from '../auth/auth.service';
import { ProfileDto } from '../user/dto/get-profile.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<ProfileDto> {
    
    const user: ProfileDto = await this.authService.validateUser(
      email,
      password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
