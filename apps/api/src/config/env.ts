import Joi from "joi";

export const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid("development", "test", "production").default("development"),
  API_PORT: Joi.number().port().default(3001),
  WEB_ORIGIN: Joi.string().uri().default("http://localhost:3000"),
  DATABASE_URL: Joi.string().uri({ scheme: ["postgresql", "postgres"] }).default("postgresql://njiw_dev:njiw_dev_local_only@localhost:5432/njiw_dev?schema=public"),
  REDIS_URL: Joi.string().uri({ scheme: ["redis", "rediss"] }).default("redis://localhost:6379")
}).unknown(true);
