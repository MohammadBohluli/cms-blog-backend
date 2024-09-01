import { z } from "zod";

export const appConfigSchema = z.object({
  PORT: z.number(),
  database: z.object({
    MONGO_USERNAME: z.string(),
    MONGO_PASSWORD: z.string(),
    MONGO_HOSTNAME: z.string(),
    MONGO_PORT: z.number(),
    MONGO_DB: z.string(),
  }),
});

export type AppConfig = z.infer<typeof appConfigSchema>;
