'use client';

import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { GlassmorphCard } from '@/components/shared/GlassmorphCard';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function WhyChooseUsSection() {
  const t = useTranslations('whyChooseUs');

  const reasons = [
    { key: 'personalized', icon: '👤' },
    { key: 'fast', icon: '⚡' },
    { key: 'expert', icon: '🌍' },
    { key: 'rate', icon: '📈' },
    { key: 'transparent', icon: '💎' },
    { key: 'support', icon: '🤝' },
  ];

  return (
    <section className="py-20 container mx-auto px-4">
      <ScrollReveal variant={fadeInUp}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gold-gradient">
            {t('title')}
          </h2>
        </div>
      </ScrollReveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
      >
        {reasons.map((reason) => (
          <motion.div key={reason.key} variants={staggerItem}>
            <GlassmorphCard className="h-full">
              <div className="flex items-start space-x-4">
                <div className="text-3xl flex-shrink-0">{reason.icon}</div>
                <div>
                  <div className="flex items-center mb-2">
                    <Check size={20} className="text-[var(--color-gold)] mr-2" />
                    <h3 className="font-semibold text-lg">
                      {t(reason.key)}
                    </h3>
                  </div>
                </div>
              </div>
            </GlassmorphCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
