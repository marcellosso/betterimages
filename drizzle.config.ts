import type { Config } from "drizzle-kit";

export default {
  driver: "pg",
  schema: "./src/lib/db/schema",
  out: "./src/lib/db/migrations",

  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
