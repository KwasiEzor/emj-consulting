'use client';

import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { motion } from 'framer-motion';

export function StatisticsSection() {
  const t = useTranslations('stats');

  const stats = [
    { label: t('visas'), value: 500, suffix: '+', icon: '✈️' },
    { label: t('satisfaction'), value: 98, suffix: '%', icon: '⭐' },
    { label: t('destinations'), value: 30, suffix: '+', icon: '🌍' },
    { label: t('responseTime'), value: 24, suffix: 'h', icon: '⚡' },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="text-center"
            >
              <div className="text-5xl mb-4">{stat.icon}</div>
              <div className="text-5xl md:text-6xl font-bold gold-gradient mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
