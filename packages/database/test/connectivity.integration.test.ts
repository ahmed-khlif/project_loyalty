import { describe, expect, it } from "vitest";
import { PrismaService } from "../src/prisma.service";

describe("postgres connectivity", () => {
  it.skipIf(process.env.RUN_DB_TESTS !== "1")("connects to the isolated test database", async () => {
    const prisma = new PrismaService();
    await expect(prisma.checkConnection()).resolves.toBeUndefined();
    await prisma.disconnect();
  });
});
