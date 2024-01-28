import { pgTable, uuid, varchar, decimal } from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  title: varchar("title").notNull(),
  price: decimal("price").notNull(),
  comment: varchar("comment"),
  rating: decimal("rating").default("0"),
  cover: varchar("cover").notNull(),
});
