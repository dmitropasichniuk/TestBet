import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Good } from "./match.entity";
import { GoodService } from "./match.service";
import { GoodController } from "./match.controller";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Good]), UserModule],
  providers: [GoodService],
  controllers: [GoodController],
})
export class GoodModule {}
