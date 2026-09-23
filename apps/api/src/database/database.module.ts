import { Global, Module } from "@nestjs/common";
import { PrismaService } from "@njiw/database";

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class DatabaseModule {}
