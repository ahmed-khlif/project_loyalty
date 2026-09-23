import { Controller, Get, HttpCode, HttpStatus, Inject, Res } from "@nestjs/common";
import type { HealthResponse } from "@njiw/contracts";
import type { Response } from "express";
import { PrismaService } from "@njiw/database";

@Controller("health")
export class HealthController {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  @Get("live")
  @HttpCode(HttpStatus.OK)
  live(): HealthResponse {
    return { status: "ok", service: "api" };
  }

  @Get("ready")
  async ready(@Res() response: Response) {
    try {
      await this.prisma.checkConnection();
      return response.status(HttpStatus.OK).json({ status: "ok", service: "api", dependency: "postgres" } satisfies HealthResponse);
    } catch {
      return response.status(HttpStatus.SERVICE_UNAVAILABLE).json({ status: "unavailable", service: "api", dependency: "postgres" } satisfies HealthResponse);
    }
  }
}
