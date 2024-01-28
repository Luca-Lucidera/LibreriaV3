import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./server/utils/db/schema/*.ts",
  out: "./drizzle",
  driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString: process.env.NUXT_DATABASE_URL || "",
  },
  verbose: true,
  strict: true,
} satisfies Config;