import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Env } from "./common/dictionary/env";
import { UsersModule } from "./user/users.module";

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
    UsersModule,
  ],
})
export class AppModule {}
