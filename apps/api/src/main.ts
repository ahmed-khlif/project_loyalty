import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module.js";
import { StructuredLogger } from "./common/structured.logger.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get(StructuredLogger, { strict: false }) ?? new StructuredLogger();
  app.useLogger(logger);
  app.setGlobalPrefix("api/v1");

  const config = app.get(ConfigService);
  const webOrigin = config.getOrThrow<string>("WEB_ORIGIN");
  app.enableCors({ origin: webOrigin, credentials: true });

  const port = config.getOrThrow<number>("API_PORT");
  await app.listen(port, "0.0.0.0");
  logger.log(`API listening on http://localhost:${port}/api/v1`, "Bootstrap");
}

void bootstrap();
