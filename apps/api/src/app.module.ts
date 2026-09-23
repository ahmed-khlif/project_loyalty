import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module.js";
import { envSchema } from "./config/env.js";
import { HealthModule } from "./health/health.module.js";
import { StructuredLogger } from "./common/structured.logger.js";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: "../../.env", isGlobal: true, cache: true, validationSchema: envSchema }),
    DatabaseModule,
    HealthModule
  ],
  providers: [StructuredLogger]
})
export class AppModule {}
