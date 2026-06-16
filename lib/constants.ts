// Brand colors
export const COLORS = {
  primary: {
    navy: '#0B1F3A',
    gold: '#D4AF37',
  },
  glassmorphism: {
    light: 'rgba(255, 255, 255, 0.1)',
    dark: 'rgba(11, 31, 58, 0.3)',
  },
} as const;

// Contact information
export const CONTACT_INFO = {
  phone: '+33 1 23 45 67 89',
  email: 'contact@emj-consulting.com',
  address: '123 Avenue des Champs-Élysées, 75008 Paris, France',
  whatsapp: '+33123456789',
} as const;

// Social media links
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/emj-consulting',
  instagram: 'https://instagram.com/emj-consulting',
  tiktok: 'https://tiktok.com/@emj-consulting',
  linkedin: 'https://linkedin.com/company/emj-consulting',
} as const;

// Navigation links
export const NAV_LINKS = {
  fr: [
    { href: '/fr', label: 'Accueil' },
    { href: '/fr/about', label: 'À propos' },
    { href: '/fr/services', label: 'Services' },
    { href: '/fr/destinations', label: 'Destinations' },
    { href: '/fr/blog', label: 'Blog' },
    { href: '/fr/contact', label: 'Contact' },
  ],
  en: [
    { href: '/en', label: 'Home' },
    { href: '/en/about', label: 'About' },
    { href: '/en/services', label: 'Services' },
    { href: '/en/destinations', label: 'Destinations' },
    { href: '/en/blog', label: 'Blog' },
    { href: '/en/contact', label: 'Contact' },
  ],
} as const;

// Statistics for home page
export const STATS = {
  visas: '500+',
  destinations: '30+',
  satisfaction: '98%',
  experience: '10+',
  responseTime: '24h',
} as const;

// Time slots for appointment booking
export const TIME_SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
] as const;

// Appointment statuses
export const APPOINTMENT_STATUS = {
  pending: { fr: 'En attente', en: 'Pending', color: 'yellow' },
  confirmed: { fr: 'Confirmé', en: 'Confirmed', color: 'blue' },
  completed: { fr: 'Terminé', en: 'Completed', color: 'green' },
  cancelled: { fr: 'Annulé', en: 'Cancelled', color: 'red' },
} as const;

// Client statuses
export const CLIENT_STATUS = {
  active: { fr: 'Actif', en: 'Active', color: 'green' },
  inactive: { fr: 'Inactif', en: 'Inactive', color: 'gray' },
  completed: { fr: 'Terminé', en: 'Completed', color: 'blue' },
} as const;

// Blog post statuses
export const POST_STATUS = {
  draft: { fr: 'Brouillon', en: 'Draft', color: 'gray' },
  published: { fr: 'Publié', en: 'Published', color: 'green' },
} as const;
