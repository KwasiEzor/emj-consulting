import { pgTable, uuid, varchar, text, timestamp, boolean, integer, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table (admin authentication)
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }),
  role: varchar('role', { length: 50 }).notNull().default('admin'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Clients table
export const clients = pgTable('clients', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  country: varchar('country', { length: 100 }),
  status: varchar('status', { length: 50 }).notNull().default('active'), // active, inactive, completed
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Services table
export const services = pgTable('services', {
  id: uuid('id').defaultRandom().primaryKey(),
  titleFr: varchar('title_fr', { length: 255 }).notNull(),
  titleEn: varchar('title_en', { length: 255 }).notNull(),
  descriptionFr: text('description_fr').notNull(),
  descriptionEn: text('description_en').notNull(),
  icon: varchar('icon', { length: 50 }).notNull(), // emoji or lucide icon name
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  benefits: jsonb('benefits'), // array of strings {fr: [], en: []}
  process: jsonb('process'), // array of step objects
  price: varchar('price', { length: 100 }),
  duration: varchar('duration', { length: 100 }),
  featured: boolean('featured').default(false),
  order: integer('order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Destinations table
export const destinations = pgTable('destinations', {
  id: uuid('id').defaultRandom().primaryKey(),
  nameFr: varchar('name_fr', { length: 255 }).notNull(),
  nameEn: varchar('name_en', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  flagEmoji: varchar('flag_emoji', { length: 10 }).notNull(),
  imageUrl: varchar('image_url', { length: 500 }),
  descriptionFr: text('description_fr').notNull(),
  descriptionEn: text('description_en').notNull(),
  visaDuration: varchar('visa_duration', { length: 100 }),
  requirements: jsonb('requirements'), // {fr: [], en: []}
  featured: boolean('featured').default(false),
  continent: varchar('continent', { length: 50 }),
  order: integer('order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Appointments table
export const appointments = pgTable('appointments', {
  id: uuid('id').defaultRandom().primaryKey(),
  clientId: uuid('client_id').references(() => clients.id, { onDelete: 'set null' }),
  serviceId: uuid('service_id').references(() => services.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  date: varchar('date', { length: 50 }).notNull(), // YYYY-MM-DD
  time: varchar('time', { length: 50 }).notNull(), // HH:MM
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending, confirmed, completed, cancelled
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Messages table (contact form submissions)
export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  country: varchar('country', { length: 100 }),
  message: text('message').notNull(),
  isRead: boolean('is_read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Newsletter subscribers table
export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  subscribedAt: timestamp('subscribed_at').defaultNow().notNull(),
});

// Blog categories table
export const blogCategories = pgTable('blog_categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  nameFr: varchar('name_fr', { length: 255 }).notNull(),
  nameEn: varchar('name_en', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Blog posts table
export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  titleFr: varchar('title_fr', { length: 500 }).notNull(),
  titleEn: varchar('title_en', { length: 500 }).notNull(),
  slug: varchar('slug', { length: 500 }).notNull().unique(),
  excerptFr: text('excerpt_fr').notNull(),
  excerptEn: text('excerpt_en').notNull(),
  contentFr: text('content_fr').notNull(),
  contentEn: text('content_en').notNull(),
  imageUrl: varchar('image_url', { length: 500 }),
  categoryId: uuid('category_id').references(() => blogCategories.id, { onDelete: 'set null' }),
  author: varchar('author', { length: 255 }).notNull().default('EMJ Consulting'),
  status: varchar('status', { length: 50 }).notNull().default('draft'), // draft, published
  readingTime: integer('reading_time'), // minutes
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// FAQ table
export const faq = pgTable('faq', {
  id: uuid('id').defaultRandom().primaryKey(),
  questionFr: varchar('question_fr', { length: 500 }).notNull(),
  questionEn: varchar('question_en', { length: 500 }).notNull(),
  answerFr: text('answer_fr').notNull(),
  answerEn: text('answer_en').notNull(),
  order: integer('order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const appointmentsRelations = relations(appointments, ({ one }) => ({
  client: one(clients, {
    fields: [appointments.clientId],
    references: [clients.id],
  }),
  service: one(services, {
    fields: [appointments.serviceId],
    references: [services.id],
  }),
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  category: one(blogCategories, {
    fields: [blogPosts.categoryId],
    references: [blogCategories.id],
  }),
}));
