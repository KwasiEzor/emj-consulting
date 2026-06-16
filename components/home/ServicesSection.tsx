'use client';

import { useTranslations, useLocale } from 'next-intl';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { GlassmorphCard } from '@/components/shared/GlassmorphCard';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { motion } from 'framer-motion';

interface Service {
  id: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  icon: string;
}

export function ServicesSection({ services }: { services: Service[] }) {
  const t = useTranslations('services');
  const locale = useLocale();

  return (
    <section className="py-20 container mx-auto px-4">
      <ScrollReveal variant={fadeInUp}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gold-gradient">
            {t('title')}
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </ScrollReveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service, index) => (
          <motion.div key={service.id} variants={staggerItem}>
            <GlassmorphCard className="h-full">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">
                {locale === 'fr' ? service.titleFr : service.titleEn}
              </h3>
              <p className="text-white/70 text-sm">
                {locale === 'fr' ? service.descriptionFr : service.descriptionEn}
              </p>
            </GlassmorphCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
