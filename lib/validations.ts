import { z } from 'zod';

// Contact form schema
export const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(8, 'Numéro de téléphone invalide').optional(),
  country: z.string().min(2, 'Veuillez sélectionner un pays'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Appointment form schema
export const appointmentSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(8, 'Numéro de téléphone invalide'),
  serviceId: z.string().uuid('Service invalide'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date invalide'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Heure invalide'),
  notes: z.string().optional(),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

// Newsletter schema
export const newsletterSchema = z.object({
  email: z.string().email('Email invalide'),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// Login schema
export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Client schema (admin)
export const clientSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  country: z.string().optional(),
  status: z.enum(['active', 'inactive', 'completed']).default('active'),
  notes: z.string().optional(),
});

export type ClientFormData = z.infer<typeof clientSchema>;

// Blog post schema (admin)
export const blogPostSchema = z.object({
  titleFr: z.string().min(5, 'Le titre doit contenir au moins 5 caractères'),
  titleEn: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(3, 'Le slug doit contenir au moins 3 caractères'),
  excerptFr: z.string().min(20, 'L\'extrait doit contenir au moins 20 caractères'),
  excerptEn: z.string().min(20, 'Excerpt must be at least 20 characters'),
  contentFr: z.string().min(50, 'Le contenu doit contenir au moins 50 caractères'),
  contentEn: z.string().min(50, 'Content must be at least 50 characters'),
  imageUrl: z.string().url('URL invalide').optional(),
  categoryId: z.string().uuid('Catégorie invalide'),
  status: z.enum(['draft', 'published']).default('draft'),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;
