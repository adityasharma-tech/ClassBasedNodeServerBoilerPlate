import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

const usersTable = pgTable("users", {
  uid: integer().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  photoUrl: varchar({ length: 255 }).notNull()
});

export {
    usersTable
}