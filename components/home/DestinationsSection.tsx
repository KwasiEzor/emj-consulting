'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { GlassmorphCard } from '@/components/shared/GlassmorphCard';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Destination {
  id: string;
  nameFr: string;
  nameEn: string;
  slug: string;
  flagEmoji: string;
  imageUrl: string | null;
  descriptionFr: string;
  descriptionEn: string;
}

export function DestinationsSection({ destinations }: { destinations: Destination[] }) {
  const t = useTranslations('destinations');
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
        {destinations.map((destination) => (
          <motion.div key={destination.id} variants={staggerItem}>
            <GlassmorphCard className="h-full overflow-hidden group">
              {destination.imageUrl && (
                <div className="relative h-48 -m-6 mb-4 overflow-hidden">
                  <Image
                    src={destination.imageUrl}
                    alt={locale === 'fr' ? destination.nameFr : destination.nameEn}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] to-transparent" />
                </div>
              )}
              <div className="text-4xl mb-3">{destination.flagEmoji}</div>
              <h3 className="text-2xl font-semibold mb-3">
                {locale === 'fr' ? destination.nameFr : destination.nameEn}
              </h3>
              <p className="text-white/70 text-sm mb-4">
                {locale === 'fr' ? destination.descriptionFr : destination.descriptionEn}
              </p>
              <Link
                href={`/destinations/${destination.slug}`}
                className="inline-block text-[var(--color-gold)] hover:text-[var(--color-gold-light)] transition-colors text-sm font-semibold"
              >
                {t('viewDetails')} →
              </Link>
            </GlassmorphCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
