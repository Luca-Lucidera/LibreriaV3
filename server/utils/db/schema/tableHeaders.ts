import { pgTable, uuid, varchar, boolean } from 'drizzle-orm/pg-core';

export const tableHeaders = pgTable("table_headers", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  columnTitle: varchar("name").notNull(),
  canSort: boolean("can_sort").notNull().default(false),
})