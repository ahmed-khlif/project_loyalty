import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { HealthController } from "../src/health/health.controller.js";
import { PrismaService } from "@njiw/database";

describe("health endpoints", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [{ provide: PrismaService, useValue: { checkConnection: async () => undefined } }]
    }).compile();
    app = moduleRef.createNestApplication();
    app.setGlobalPrefix("api/v1");
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  it("responds to liveness without database access", async () => {
    const response = await request(app.getHttpServer()).get("/api/v1/health/live");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok", service: "api" });
  });

  it("reports readiness when the database check succeeds", async () => {
    const controller = new HealthController({ checkConnection: async () => undefined } as PrismaService);
    const response = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    await controller.ready(response as never);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({ status: "ok", service: "api", dependency: "postgres" });
  });
});
