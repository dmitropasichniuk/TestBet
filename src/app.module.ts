import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Env } from "./common/dictionary/env";
import { MatchModule } from "./match/match.module";
import { TicketModule } from "./ticket/ticket.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: Env.DB_HOST,
      port: Env.DB_PORT,
      username: Env.DB_USER,
      password: Env.DB_PASS,
      database: Env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [],
    }),
    UserModule,
    MatchModule,
    TicketModule,
    AuthModule,
  ],
})
export class AppModule {}
