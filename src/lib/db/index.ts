import { drizzle } from "drizzle-orm/neon-http";

import { neon, neonConfig } from "@neondatabase/serverless";
import * as subscriptionsSchema from "./schema/subscriptions";
import { config } from "dotenv";

config({
  path: ".env.local",
});

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const client = neon(process.env.DATABASE_URL);
export const db = drizzle(client, {
  schema: { ...subscriptionsSchema },
});
