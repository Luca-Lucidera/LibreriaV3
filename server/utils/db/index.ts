import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
const connectionString = useRuntimeConfig().DATABASE_URL;

export const client = postgres(connectionString);

export const db = drizzle(client, { logger: true });
