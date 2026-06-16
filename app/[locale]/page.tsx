import { db } from '@/db';
import { services, destinations, faq } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { HeroSection } from '@/components/home/HeroSection';
import { DestinationsSection } from '@/components/home/DestinationsSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { StatisticsSection } from '@/components/home/StatisticsSection';
import { FAQSection } from '@/components/home/FAQSection';
import { CTASection } from '@/components/home/CTASection';

export default async function HomePage() {
  // Fetch data from database
  const [allServices, featuredDestinations, faqItems] = await Promise.all([
    db.select().from(services).orderBy(services.order),
    db.select().from(destinations).where(eq(destinations.featured, true)).orderBy(destinations.order).limit(9),
    db.select().from(faq).orderBy(faq.order).limit(5),
  ]);

  return (
    <>
      <HeroSection />
      <DestinationsSection destinations={featuredDestinations} />
      <ServicesSection services={allServices} />
      <ProcessSection />
      <WhyChooseUsSection />
      <StatisticsSection />
      <FAQSection faqItems={faqItems} />
      <CTASection />
    </>
  );
}
