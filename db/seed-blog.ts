import { db } from './index';
import { blogPosts, blogCategories } from './schema';

async function seedBlog() {
  console.log('🌱 Seeding blog posts...');

  // Get categories
  const categories = await db.select().from(blogCategories);
  const conseilsVoyage = categories.find(c => c.slug === 'conseils-voyage')!;
  const visaEtudiant = categories.find(c => c.slug === 'visa-etudiant')!;
  const immigration = categories.find(c => c.slug === 'immigration')!;

  // Seed blog posts
  await db.insert(blogPosts).values([
    {
      titleFr: 'Comment Préparer Votre Dossier de Visa Touristique',
      titleEn: 'How to Prepare Your Tourist Visa Application',
      slug: 'preparer-dossier-visa-touristique',
      excerptFr: 'Découvrez les étapes essentielles pour constituer un dossier de visa touristique solide et augmenter vos chances de succès.',
      excerptEn: 'Learn the essential steps to build a strong tourist visa application and increase your chances of success.',
      contentFr: `
        <h2>Introduction</h2>
        <p>La préparation d'un dossier de visa touristique peut sembler complexe, mais avec les bonnes informations et une méthodologie claire, vous pouvez maximiser vos chances de succès.</p>

        <h2>Documents Requis</h2>
        <p>Voici la liste des documents généralement nécessaires :</p>
        <ul>
          <li>Passeport valide (au moins 6 mois après le retour prévu)</li>
          <li>Photos d'identité récentes aux normes</li>
          <li>Formulaire de demande complété</li>
          <li>Preuve de moyens financiers</li>
          <li>Réservation d'hôtel ou lettre d'invitation</li>
          <li>Billets d'avion aller-retour</li>
          <li>Assurance voyage</li>
        </ul>

        <h2>Conseils Pratiques</h2>
        <p>Pour augmenter vos chances d'obtenir votre visa, assurez-vous de :</p>
        <ol>
          <li>Remplir tous les formulaires avec précision</li>
          <li>Fournir des documents authentiques</li>
          <li>Démontrer votre intention de retour dans votre pays</li>
          <li>Préparer votre entretien si nécessaire</li>
        </ol>

        <h2>Conclusion</h2>
        <p>Avec une préparation minutieuse et l'accompagnement de professionnels, votre demande de visa touristique a toutes les chances d'aboutir favorablement.</p>
      `,
      contentEn: `
        <h2>Introduction</h2>
        <p>Preparing a tourist visa application may seem complex, but with the right information and clear methodology, you can maximize your chances of success.</p>

        <h2>Required Documents</h2>
        <p>Here is the list of generally required documents:</p>
        <ul>
          <li>Valid passport (at least 6 months after planned return)</li>
          <li>Recent passport photos meeting standards</li>
          <li>Completed application form</li>
          <li>Proof of financial means</li>
          <li>Hotel reservation or invitation letter</li>
          <li>Round-trip flight tickets</li>
          <li>Travel insurance</li>
        </ul>

        <h2>Practical Tips</h2>
        <p>To increase your chances of obtaining your visa, make sure to:</p>
        <ol>
          <li>Fill out all forms accurately</li>
          <li>Provide authentic documents</li>
          <li>Demonstrate your intention to return to your country</li>
          <li>Prepare for your interview if necessary</li>
        </ol>

        <h2>Conclusion</h2>
        <p>With careful preparation and professional support, your tourist visa application has every chance of success.</p>
      `,
      imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
      categoryId: conseilsVoyage.id,
      author: 'EMJ Consulting',
      status: 'published',
      readingTime: 5,
      publishedAt: new Date('2026-06-10'),
    },
    {
      titleFr: 'Étudier au Canada: Guide Complet du Visa Étudiant',
      titleEn: 'Study in Canada: Complete Student Visa Guide',
      slug: 'visa-etudiant-canada-guide',
      excerptFr: 'Tout ce que vous devez savoir sur le processus de demande de visa étudiant pour le Canada.',
      excerptEn: 'Everything you need to know about the Canadian student visa application process.',
      contentFr: `
        <h2>Pourquoi Choisir le Canada?</h2>
        <p>Le Canada est une destination prisée pour les étudiants internationaux grâce à son système éducatif de qualité, sa diversité culturelle et ses opportunités professionnelles.</p>

        <h2>Processus de Demande</h2>
        <p>Le processus comprend plusieurs étapes importantes :</p>
        <ul>
          <li>Obtenir une lettre d'acceptation d'une institution canadienne</li>
          <li>Rassembler les documents requis</li>
          <li>Soumettre la demande en ligne</li>
          <li>Passer l'examen médical</li>
          <li>Fournir les données biométriques</li>
        </ul>

        <h2>Délais et Coûts</h2>
        <p>Le traitement peut prendre de 8 à 16 semaines. Les frais de demande sont de 150 CAD, auxquels s'ajoutent 85 CAD pour les données biométriques.</p>
      `,
      contentEn: `
        <h2>Why Choose Canada?</h2>
        <p>Canada is a popular destination for international students thanks to its quality education system, cultural diversity, and professional opportunities.</p>

        <h2>Application Process</h2>
        <p>The process includes several important steps:</p>
        <ul>
          <li>Obtain an acceptance letter from a Canadian institution</li>
          <li>Gather required documents</li>
          <li>Submit online application</li>
          <li>Complete medical examination</li>
          <li>Provide biometric data</li>
        </ul>

        <h2>Timeline and Costs</h2>
        <p>Processing can take 8 to 16 weeks. Application fees are CAD 150, plus CAD 85 for biometrics.</p>
      `,
      imageUrl: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce',
      categoryId: visaEtudiant.id,
      author: 'EMJ Consulting',
      status: 'published',
      readingTime: 7,
      publishedAt: new Date('2026-06-12'),
    },
    {
      titleFr: 'Les Erreurs à Éviter Lors de Votre Demande de Visa',
      titleEn: 'Mistakes to Avoid in Your Visa Application',
      slug: 'erreurs-eviter-demande-visa',
      excerptFr: 'Apprenez à identifier et éviter les erreurs courantes qui peuvent compromettre votre demande de visa.',
      excerptEn: 'Learn to identify and avoid common mistakes that can compromise your visa application.',
      contentFr: `
        <h2>Les Erreurs Fréquentes</h2>
        <p>De nombreuses demandes sont rejetées à cause d'erreurs évitables. Voici les plus courantes :</p>

        <h3>1. Formulaires Incomplets</h3>
        <p>Vérifiez que tous les champs sont remplis avec précision. Une simple omission peut entraîner un refus.</p>

        <h3>2. Documents Manquants</h3>
        <p>Assurez-vous de fournir tous les documents requis dans les formats demandés.</p>

        <h3>3. Informations Contradictoires</h3>
        <p>Les informations doivent être cohérentes dans tous vos documents.</p>

        <h3>4. Preuve de Fonds Insuffisante</h3>
        <p>Démontrez clairement que vous avez les moyens financiers nécessaires.</p>

        <h2>Comment Éviter Ces Erreurs</h2>
        <p>Faites-vous accompagner par des professionnels et prenez le temps de bien préparer votre dossier.</p>
      `,
      contentEn: `
        <h2>Common Mistakes</h2>
        <p>Many applications are rejected due to avoidable errors. Here are the most common:</p>

        <h3>1. Incomplete Forms</h3>
        <p>Ensure all fields are filled accurately. A simple omission can lead to rejection.</p>

        <h3>2. Missing Documents</h3>
        <p>Make sure to provide all required documents in the requested formats.</p>

        <h3>3. Contradictory Information</h3>
        <p>Information must be consistent across all your documents.</p>

        <h3>4. Insufficient Proof of Funds</h3>
        <p>Clearly demonstrate that you have the necessary financial means.</p>

        <h2>How to Avoid These Mistakes</h2>
        <p>Get professional support and take time to properly prepare your application.</p>
      `,
      imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85',
      categoryId: conseilsVoyage.id,
      author: 'EMJ Consulting',
      status: 'published',
      readingTime: 4,
      publishedAt: new Date('2026-06-14'),
    },
  ]);

  console.log('✅ Blog posts seeded');
  console.log('🎉 Blog seeding complete!');
}

seedBlog()
  .catch((error) => {
    console.error('❌ Blog seeding failed:', error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
