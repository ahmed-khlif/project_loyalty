import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "../generated/prisma/client.js";

dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), "../../../.env") });

@Injectable()
export class PrismaService implements OnModuleDestroy {
  private readonly client = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
  });

  async onModuleDestroy() {
    await this.disconnect();
  }

  async disconnect() {
    await this.client.$disconnect();
  }

  async checkConnection() {
    await this.client.$queryRaw`SELECT 1`;
  }
}
