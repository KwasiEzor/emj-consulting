# EMJ Consulting - Visa & Immigration Services

Premium website for visa and immigration consulting with glassmorphism design, multilingual support, and admin dashboard.

## ✨ Features

- **9-Section Home**: Hero, destinations, services, process, why choose us, stats, FAQ, CTA
- **Content Pages**: About, Services (9), Destinations (30+), Blog, Contact
- **Booking System**: Calendar appointment with time slots
- **Blog**: Articles with search, categories, sharing
- **Admin Dashboard**: Authentication, messages, appointments management
- **Multilingual**: French (default) + English
- **Design**: Glassmorphism, animations, dark/light mode

## 🛠 Tech Stack

- Next.js 16.2.9 + TypeScript
- Tailwind CSS v4
- Supabase + Drizzle ORM
- NextAuth.js v5
- Framer Motion
- React Hook Form + Zod

## 🚀 Quick Start

```bash
pnpm install
pnpm db:push
pnpm db:seed
pnpm dev
```

Visit `http://localhost:3000/fr`

## 🔐 Admin Login

URL: `/admin/login`
Email: `admin@emj-consulting.com`
Password: `admin123`

## 📊 Database

10 tables: users, clients, appointments, messages, services, destinations, blog_posts, blog_categories, faq, newsletter_subscribers

## 🌐 Deployment

Deploy to Vercel:
```bash
vercel
```

Add environment variables in Vercel dashboard.

## 📄 License

Private - EMJ Consulting
