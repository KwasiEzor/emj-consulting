'use client';

import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { fadeInUp } from '@/lib/animations';
import { Check } from 'lucide-react';

export function ProcessSection() {
  const t = useTranslations('process');

  const steps = [
    { key: 'consultation', icon: '📞' },
    { key: 'preparation', icon: '📋' },
    { key: 'submission', icon: '📤' },
    { key: 'tracking', icon: '🔍' },
    { key: 'approval', icon: '✅' },
  ];

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

      <div className="max-w-5xl mx-auto">
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-[var(--color-gold)]/20 via-[var(--color-gold)] to-[var(--color-gold)]/20 -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, index) => (
              <ScrollReveal key={step.key} delay={index * 0.1}>
                <div className="relative">
                  <div className="glass rounded-xl p-6 text-center relative z-10">
                    <div className="text-5xl mb-4">{step.icon}</div>
                    <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[var(--color-gold)] flex items-center justify-center text-[var(--color-navy)] font-bold">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-lg">
                      {t(step.key)}
                    </h3>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
