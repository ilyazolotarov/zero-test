import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: uuid().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 1024 }),
  createdAt: timestamp().notNull(),
});
