import { db } from '@/db';
import { services } from '@/db/schema';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { GlassmorphCard } from '@/components/shared/GlassmorphCard';
import { fadeInUp } from '@/lib/animations';
import { Link } from '@/i18n/routing';
import { Check, ArrowRight } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export default async function ServicesPage() {
  const allServices = await db.select().from(services).orderBy(services.order);

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Hero */}
      <section className="text-center mb-20">
        <ScrollReveal variant={fadeInUp}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gold-gradient">
            Nos Services
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Des solutions complètes et personnalisées pour tous vos besoins en matière de visa, voyage et immigration.
          </p>
        </ScrollReveal>
      </section>

      {/* Services Grid */}
      <section className="space-y-12">
        {allServices.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </section>

      {/* CTA */}
      <section className="mt-20">
        <ScrollReveal>
          <div className="glass-dark rounded-[var(--radius-2xl)] p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Prêt à Commencer ?
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour une consultation gratuite et découvrez comment nous pouvons vous aider.
            </p>
            <Link
              href="/appointment"
              className="inline-flex items-center px-8 py-4 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-xl font-semibold hover:bg-[var(--color-gold-light)] transition-all hover:scale-105"
            >
              Prendre Rendez-vous
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  const locale = useLocale();
  const title = locale === 'fr' ? service.titleFr : service.titleEn;
  const description = locale === 'fr' ? service.descriptionFr : service.descriptionEn;
  const benefits = service.benefits?.[locale] || [];

  return (
    <ScrollReveal delay={index * 0.1}>
      <GlassmorphCard className={index % 2 === 0 ? '' : 'bg-white/5'}>
        <div className="grid md:grid-cols-[auto,1fr] gap-8">
          {/* Icon */}
          <div className="text-7xl">{service.icon}</div>

          {/* Content */}
          <div>
            <h3 className="text-3xl font-bold mb-4 gold-gradient">{title}</h3>
            <p className="text-white/70 text-lg mb-6">{description}</p>

            {/* Benefits */}
            {benefits.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-lg">Avantages :</h4>
                <ul className="space-y-2">
                  {benefits.map((benefit: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <Check size={20} className="text-[var(--color-gold)] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link
              href="/appointment"
              className="inline-flex items-center text-[var(--color-gold)] hover:text-[var(--color-gold-light)] transition-colors font-semibold"
            >
              Réserver ce service
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </GlassmorphCard>
    </ScrollReveal>
  );
}
