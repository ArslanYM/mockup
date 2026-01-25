import {
  date,
  integer,
  pgTable,
  varchar,
  json,
  text,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer().default(5),
});

export const ProjectTable = pgTable("project", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar()
    .references(() => usersTable.email)
    .notNull(),
  projectId: varchar().notNull(),
  projectName: varchar(),
  theme: varchar(),
  userInput: varchar(),
  device: varchar(),
  createdOn: date().defaultNow(),
  config: json(),
  projectVisualDescription: text(),
  screenShot: text(),
});

export const ScreenConfigTable = pgTable("screenConfig", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  projectId: varchar().references(() => ProjectTable.projectId),
  screenId: varchar(),
  screenName: varchar(),
  purpose: varchar(),
  screenDescription: varchar(),
  code: text(),
});
