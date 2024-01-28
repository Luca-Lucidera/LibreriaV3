import { migrate } from "drizzle-orm/postgres-js/migrator";
await migrate(db, { migrationsFolder: "./../../../drizzle" });
client.end();