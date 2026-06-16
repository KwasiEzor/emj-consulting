import { db } from '@/db';
import { services } from '@/db/schema';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { fadeInUp } from '@/lib/animations';
import { Link } from '@/i18n/routing';
import { Check, ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';

export default async function ServicesPage() {
  const allServices = await db.select().from(services).orderBy(services.order);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal variant={fadeInUp}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 gold-gradient tracking-tight">
                Nos Services
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
                Des solutions complètes et personnalisées pour tous vos besoins en matière de visa, voyage et immigration
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold)]/20 via-transparent to-[var(--color-gold)]/10" />
              <div className="absolute inset-0 backdrop-blur-sm bg-white/5 border border-white/10" />

              {/* Content */}
              <div className="relative z-10 p-12 md:p-16 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 gold-gradient">
                  Prêt à Commencer ?
                </h2>
                <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Contactez-nous dès aujourd'hui pour une consultation gratuite et découvrez comment nous pouvons vous aider
                </p>
                <Link
                  href="/appointment"
                  className="inline-flex items-center px-10 py-5 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-2xl text-lg font-bold hover:bg-[var(--color-gold-light)] transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_60px_-15px_rgba(212,175,55,0.5)] group"
                >
                  Prendre Rendez-vous
                  <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={24} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
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
    <ScrollReveal delay={index * 0.05}>
      <div className="group h-full">
        <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:border-[var(--color-gold)]/50 hover:shadow-[0_20px_60px_-15px_rgba(212,175,55,0.3)] hover:-translate-y-2">
          {/* Hover gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold)]/0 to-[var(--color-gold)]/0 group-hover:from-[var(--color-gold)]/10 group-hover:to-transparent transition-all duration-500" />

          {/* Content */}
          <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
            {/* Icon */}
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--color-gold)]/20 to-[var(--color-gold)]/5 border border-[var(--color-gold)]/20 group-hover:scale-110 transition-transform duration-500">
                <span className="text-5xl">{service.icon}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold mb-4 gold-gradient leading-tight">
              {title}
            </h3>

            {/* Description */}
            <p className="text-white/70 text-base md:text-lg mb-6 leading-relaxed flex-grow">
              {description}
            </p>

            {/* Benefits */}
            {benefits.length > 0 && (
              <div className="mb-8 space-y-3">
                {benefits.slice(0, 3).map((benefit: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-5 h-5 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center">
                        <Check size={14} className="text-[var(--color-gold)]" strokeWidth={3} />
                      </div>
                    </div>
                    <span className="text-white/70 text-sm leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <Link
              href="/appointment"
              className="inline-flex items-center text-[var(--color-gold)] hover:text-[var(--color-gold-light)] transition-all duration-300 font-semibold group/link mt-auto"
            >
              <span>Réserver ce service</span>
              <ArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
