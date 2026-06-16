import { db } from './index';
import { services, destinations, blogCategories, faq, users } from './schema';
import * as bcrypt from 'bcryptjs';

async function seed() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await db.insert(users).values({
    email: 'admin@emj-consulting.com',
    passwordHash: hashedPassword,
    name: 'Admin EMJ',
    role: 'admin',
  });
  console.log('✅ Admin user created');

  // Seed services
  await db.insert(services).values([
    {
      titleFr: 'Visa Touristique',
      titleEn: 'Tourist Visa',
      descriptionFr: 'Obtenez votre visa touristique rapidement et facilement pour découvrir le monde.',
      descriptionEn: 'Get your tourist visa quickly and easily to explore the world.',
      icon: '✈️',
      slug: 'visa-touristique',
      benefits: { fr: ['Traitement rapide', 'Accompagnement personnalisé', 'Taux de réussite élevé'], en: ['Fast processing', 'Personal support', 'High success rate'] },
      process: [
        { titleFr: 'Consultation', titleEn: 'Consultation' },
        { titleFr: 'Préparation', titleEn: 'Preparation' },
        { titleFr: 'Soumission', titleEn: 'Submission' },
      ],
      featured: true,
      order: 1,
    },
    {
      titleFr: 'Visa Étudiant',
      titleEn: 'Student Visa',
      descriptionFr: 'Poursuivez vos études à l\'étranger avec notre assistance complète pour visa étudiant.',
      descriptionEn: 'Pursue your studies abroad with our complete student visa assistance.',
      icon: '🎓',
      slug: 'visa-etudiant',
      benefits: { fr: ['Support complet', 'Conseils experts', 'Suivi personnalisé'], en: ['Full support', 'Expert advice', 'Personal tracking'] },
      featured: true,
      order: 2,
    },
    {
      titleFr: 'Visa Affaires',
      titleEn: 'Business Visa',
      descriptionFr: 'Développez votre activité internationale avec nos services de visa affaires.',
      descriptionEn: 'Grow your international business with our business visa services.',
      icon: '💼',
      slug: 'visa-affaires',
      benefits: { fr: ['Traitement express', 'Documentation complète', 'Support 24/7'], en: ['Express processing', 'Complete documentation', '24/7 support'] },
      featured: true,
      order: 3,
    },
    {
      titleFr: 'Regroupement Familial',
      titleEn: 'Family Reunion',
      descriptionFr: 'Réunissez votre famille avec notre assistance pour regroupement familial.',
      descriptionEn: 'Reunite your family with our family reunion assistance.',
      icon: '👨‍👩‍👧',
      slug: 'regroupement-familial',
      order: 4,
    },
    {
      titleFr: 'Assistance Administrative',
      titleEn: 'Administrative Assistance',
      descriptionFr: 'Aide complète pour toutes vos démarches administratives.',
      descriptionEn: 'Complete help for all your administrative procedures.',
      icon: '📑',
      slug: 'assistance-administrative',
      order: 5,
    },
    {
      titleFr: 'Réservation Hôtel',
      titleEn: 'Hotel Booking',
      descriptionFr: 'Réservez votre hébergement aux meilleurs prix.',
      descriptionEn: 'Book your accommodation at the best prices.',
      icon: '🏨',
      slug: 'reservation-hotel',
      order: 6,
    },
    {
      titleFr: 'Billets d\'Avion',
      titleEn: 'Flight Tickets',
      descriptionFr: 'Trouvez les meilleurs tarifs pour vos vols internationaux.',
      descriptionEn: 'Find the best rates for your international flights.',
      icon: '🛫',
      slug: 'billets-avion',
      order: 7,
    },
    {
      titleFr: 'Assurance Voyage',
      titleEn: 'Travel Insurance',
      descriptionFr: 'Protégez-vous avec nos assurances voyage complètes.',
      descriptionEn: 'Protect yourself with our comprehensive travel insurance.',
      icon: '🛡️',
      slug: 'assurance-voyage',
      order: 8,
    },
    {
      titleFr: 'Conseils Personnalisés',
      titleEn: 'Personalized Consulting',
      descriptionFr: 'Bénéficiez de conseils experts adaptés à votre situation.',
      descriptionEn: 'Get expert advice tailored to your situation.',
      icon: '🌍',
      slug: 'conseils-personnalises',
      order: 9,
    },
  ]);
  console.log('✅ Services seeded');

  // Seed destinations
  await db.insert(destinations).values([
    {
      nameFr: 'Canada',
      nameEn: 'Canada',
      slug: 'canada',
      flagEmoji: '🇨🇦',
      imageUrl: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce',
      descriptionFr: 'Découvrez les opportunités au Canada avec nos services de visa complets.',
      descriptionEn: 'Discover opportunities in Canada with our complete visa services.',
      visaDuration: '6 mois - 10 ans',
      requirements: { fr: ['Passeport valide', 'Photo d\'identité', 'Preuve de fonds', 'Lettre d\'invitation'], en: ['Valid passport', 'ID photo', 'Proof of funds', 'Invitation letter'] },
      featured: true,
      continent: 'Amérique du Nord',
      order: 1,
    },
    {
      nameFr: 'France',
      nameEn: 'France',
      slug: 'france',
      flagEmoji: '🇫🇷',
      imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      descriptionFr: 'Visa Schengen pour la France et l\'Europe.',
      descriptionEn: 'Schengen visa for France and Europe.',
      visaDuration: '90 jours',
      requirements: { fr: ['Passeport', 'Assurance voyage', 'Réservation hôtel', 'Billets d\'avion'], en: ['Passport', 'Travel insurance', 'Hotel booking', 'Flight tickets'] },
      featured: true,
      continent: 'Europe',
      order: 2,
    },
    {
      nameFr: 'Belgique',
      nameEn: 'Belgium',
      slug: 'belgique',
      flagEmoji: '🇧🇪',
      imageUrl: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd',
      descriptionFr: 'Visa Schengen pour la Belgique.',
      descriptionEn: 'Schengen visa for Belgium.',
      visaDuration: '90 jours',
      featured: true,
      continent: 'Europe',
      order: 3,
    },
    {
      nameFr: 'États-Unis',
      nameEn: 'United States',
      slug: 'etats-unis',
      flagEmoji: '🇺🇸',
      imageUrl: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74',
      descriptionFr: 'Visa B1/B2 pour les États-Unis.',
      descriptionEn: 'B1/B2 visa for the United States.',
      visaDuration: '6 mois - 10 ans',
      featured: true,
      continent: 'Amérique du Nord',
      order: 4,
    },
    {
      nameFr: 'Royaume-Uni',
      nameEn: 'United Kingdom',
      slug: 'royaume-uni',
      flagEmoji: '🇬🇧',
      imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
      descriptionFr: 'Visa visiteur pour le Royaume-Uni.',
      descriptionEn: 'Visitor visa for the United Kingdom.',
      visaDuration: '6 mois',
      featured: true,
      continent: 'Europe',
      order: 5,
    },
    {
      nameFr: 'Allemagne',
      nameEn: 'Germany',
      slug: 'allemagne',
      flagEmoji: '🇩🇪',
      imageUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b',
      descriptionFr: 'Visa Schengen pour l\'Allemagne.',
      descriptionEn: 'Schengen visa for Germany.',
      visaDuration: '90 jours',
      continent: 'Europe',
      order: 6,
    },
    {
      nameFr: 'Italie',
      nameEn: 'Italy',
      slug: 'italie',
      flagEmoji: '🇮🇹',
      imageUrl: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b',
      descriptionFr: 'Visa Schengen pour l\'Italie.',
      descriptionEn: 'Schengen visa for Italy.',
      visaDuration: '90 jours',
      continent: 'Europe',
      order: 7,
    },
    {
      nameFr: 'Espagne',
      nameEn: 'Spain',
      slug: 'espagne',
      flagEmoji: '🇪🇸',
      imageUrl: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e',
      descriptionFr: 'Visa Schengen pour l\'Espagne.',
      descriptionEn: 'Schengen visa for Spain.',
      visaDuration: '90 jours',
      continent: 'Europe',
      order: 8,
    },
    {
      nameFr: 'Émirats Arabes Unis',
      nameEn: 'United Arab Emirates',
      slug: 'emirats-arabes-unis',
      flagEmoji: '🇦🇪',
      imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
      descriptionFr: 'Visa touristique pour Dubai et les Émirats.',
      descriptionEn: 'Tourist visa for Dubai and the Emirates.',
      visaDuration: '30-90 jours',
      continent: 'Moyen-Orient',
      order: 9,
    },
  ]);
  console.log('✅ Destinations seeded');

  // Seed blog categories
  await db.insert(blogCategories).values([
    { nameFr: 'Conseils Voyage', nameEn: 'Travel Tips', slug: 'conseils-voyage' },
    { nameFr: 'Visa Étudiant', nameEn: 'Student Visa', slug: 'visa-etudiant' },
    { nameFr: 'Immigration', nameEn: 'Immigration', slug: 'immigration' },
    { nameFr: 'Actualités', nameEn: 'News', slug: 'actualites' },
    { nameFr: 'Préparation Documents', nameEn: 'Document Preparation', slug: 'preparation-documents' },
  ]);
  console.log('✅ Blog categories seeded');

  // Seed FAQ
  await db.insert(faq).values([
    {
      questionFr: 'Combien de temps faut-il pour obtenir un visa ?',
      questionEn: 'How long does it take to get a visa?',
      answerFr: 'Le délai varie selon le pays et le type de visa. En général, comptez entre 2 à 6 semaines. Nous proposons également des services express pour les demandes urgentes.',
      answerEn: 'Processing time varies by country and visa type. Generally, expect 2 to 6 weeks. We also offer express services for urgent requests.',
      order: 1,
    },
    {
      questionFr: 'Quels documents sont nécessaires pour une demande de visa ?',
      questionEn: 'What documents are needed for a visa application?',
      answerFr: 'Les documents varient selon le type de visa, mais incluent généralement : passeport valide, photos d\'identité, preuve de fonds, réservation d\'hôtel, billets d\'avion, et assurance voyage.',
      answerEn: 'Documents vary by visa type but typically include: valid passport, ID photos, proof of funds, hotel reservation, flight tickets, and travel insurance.',
      order: 2,
    },
    {
      questionFr: 'Pour quels pays proposez-vous vos services ?',
      questionEn: 'Which countries do you provide services for?',
      answerFr: 'Nous couvrons plus de 30 destinations incluant le Canada, la France, les États-Unis, le Royaume-Uni, et bien d\'autres pays en Europe, Amérique et Moyen-Orient.',
      answerEn: 'We cover over 30 destinations including Canada, France, United States, United Kingdom, and many other countries in Europe, America, and the Middle East.',
      order: 3,
    },
    {
      questionFr: 'Comment prendre rendez-vous ?',
      questionEn: 'How do I book an appointment?',
      answerFr: 'Utilisez notre formulaire de rendez-vous en ligne disponible sur notre site, ou contactez-nous directement par téléphone ou WhatsApp pour une réponse immédiate.',
      answerEn: 'Use our online appointment form available on our website, or contact us directly by phone or WhatsApp for immediate response.',
      order: 4,
    },
    {
      questionFr: 'Quel est votre taux de réussite ?',
      questionEn: 'What is your success rate?',
      answerFr: 'Nous avons un taux de réussite de 98% grâce à notre expertise et notre préparation minutieuse de chaque dossier.',
      answerEn: 'We have a 98% success rate thanks to our expertise and thorough preparation of each application.',
      order: 5,
    },
  ]);
  console.log('✅ FAQ seeded');

  console.log('🎉 Seeding complete!');
}

seed()
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
