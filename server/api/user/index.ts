import { users } from "~/server/utils/db/schema/users";

export default defineEventHandler(async (event) => {
  const all = await db.select().from(users);
  return all;
});
