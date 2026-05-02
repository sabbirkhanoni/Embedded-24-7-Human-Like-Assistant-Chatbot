import { metadata } from "@/app/layout";
import { sql } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: text("id").primaryKey().default(sql`gen_random_uuid()`),
    organization_id: text("organization_id").notNull(),
    name: text("name"),
    email: text("email").notNull().unique(),
    image: text("image"),
    created_at: text("created_at").default(sql`now()`),
});


export const startupdata = pgTable("startupdata", {
    id: text("id").primaryKey().default(sql`gen_random_uuid()`),
    user_email: text("user_email").notNull(),
    business_name: text("business_name").notNull(),
    industry: text("industry").notNull(),
    description: text("description").notNull(),
    external_url: text("external_url").notNull(),
    website: text("website").notNull(),
    created_at: text("created_at").default(sql`now()`),
});


export const prompts = pgTable("prompts", {
    id: text("id").primaryKey().default(sql`gen_random_uuid()`),
    user_email: text("user_email").notNull(),
    type: text("type").notNull(),
    name: text("name").notNull(),
    status: text("status").notNull(),
    source_url: text("source_url").notNull(),
    content: text("content"),
    metadata: text("metadata"),
    created_at: text("created_at").default(sql`now()`),
});


export const templates = pgTable("templates", {
    id: text("id").primaryKey().default(sql`gen_random_uuid()`),
    user_email: text("user_email").notNull(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    tone: text("tone").notNull(),
    allowed_topics: text("allowed_topics"),
    blocked_topics: text("blocked_topics"),
    source_ids: text("source_ids").array().notNull(),
    status: text("status").notNull().default("active"),
    created_at: text("created_at").default(sql`now()`),
});

