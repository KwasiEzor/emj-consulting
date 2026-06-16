'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { fadeInUp } from '@/lib/animations';

export function CTASection() {
  const t = useTranslations('cta');

  return (
    <section className="py-20 container mx-auto px-4">
      <ScrollReveal variant={fadeInUp}>
        <div className="glass-dark rounded-[var(--radius-2xl)] p-12 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--color-gold)] rounded-full blur-3xl opacity-20" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gold-gradient">
              {t('title')}
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/appointment"
                className="px-10 py-4 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-xl font-semibold hover:bg-[var(--color-gold-light)] transition-all hover:scale-105 text-lg"
              >
                {t('button')}
              </Link>
              <Link
                href="/contact"
                className="px-10 py-4 glass-dark rounded-xl font-semibold hover:bg-white/20 transition-all text-lg border border-white/20"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
