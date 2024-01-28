import { pgTable, text, varchar, uuid, date } from "drizzle-orm/pg-core";
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: varchar("name"),
  email: text("email"),
  password: text("password"),
  dateOfBirth: date("date_of_birth"),
  createdAt: date("created_at").defaultNow(),
  updatedAt: date("updated_at").defaultNow(),
});