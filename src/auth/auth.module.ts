import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Env } from '../common/dictionary/env';
import { JwtStrategy } from './jwt.strategy';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { RolesGuards } from '../common/guards/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: Env.JWT_SECRET,
      signOptions: { expiresIn: (Env.JWT_EXPIRATION_IN_SECONDS) + 's' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, RolesGuards],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
