import { pgTable, uuid, text, timestamp, integer } from "drizzle-orm/pg-core";

/**
 * Users table - Stores user authentication and profile information
 * Supports OAuth providers with provider-specific IDs
 */
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),

    email: text("email").notNull().unique(),
    name: text("name"),
    image: text("image"),

    provider: text("provider"),
    providerId: text("provider_id"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Categories table - Main categories for organizing items (e.g., Personal Care, Kitchen, Home)
 * Each category belongs to a specific user
 */
export const categories = pgTable("categories", {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
        .notNull()
        .references(() => users.id),

    name: text("name").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Subcategories table - Secondary categorization within a category (e.g., Grooming, Skincare under Personal Care)
 * Each subcategory belongs to a specific category and user
 */
export const subcategories = pgTable("subcategories", {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
        .notNull()
        .references(() => users.id),

    categoryId: uuid("category_id")
        .notNull()
        .references(() => categories.id),

    name: text("name").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Items table - Individual items that need periodic reminders (e.g., Haircut, Gas Cylinder)
 * Stores reminder interval in days and belongs to a category and optionally a subcategory
 */
export const items = pgTable("items", {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
        .notNull()
        .references(() => users.id),

    categoryId: uuid("category_id")
        .notNull()
        .references(() => categories.id),

    subcategoryId: uuid("subcategory_id").references(() => subcategories.id),

    name: text("name").notNull(),

    reminderInterval: integer("reminder_interval"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Events table - Tracks when items were last used/completed (e.g., last haircut date)
 * Used to calculate when the next reminder should be triggered
 */
export const events = pgTable("events", {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
        .notNull()
        .references(() => users.id),

    itemId: uuid("item_id")
        .notNull()
        .references(() => items.id),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});
