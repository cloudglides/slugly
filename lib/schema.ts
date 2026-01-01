import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const urls = pgTable("url", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),
  originalUrl: text("original_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
