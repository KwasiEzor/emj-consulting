'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { STATS } from '@/lib/constants';

export function HeroSection() {
  const t = useTranslations('hero');
  const tStats = useTranslations('stats');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] via-[#1a2f4a] to-[#0B1F3A] animate-gradient" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-gold)] rounded-full blur-3xl opacity-10 animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--color-gold)] rounded-full blur-3xl opacity-10 animate-float" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="gold-gradient">{t('title')}</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <Link
              href="/appointment"
              className="px-8 py-4 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-xl font-semibold hover:bg-[var(--color-gold-light)] transition-all hover:scale-105 text-lg"
            >
              {t('cta.primary')}
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 glass-dark rounded-xl font-semibold hover:bg-white/20 transition-all text-lg"
            >
              {t('cta.secondary')}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: tStats('visas'), value: 500, suffix: '+' },
              { label: tStats('destinations'), value: 30, suffix: '+' },
              { label: tStats('satisfaction'), value: 98, suffix: '%' },
              { label: tStats('experience'), value: 10, suffix: '+' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="glass rounded-xl p-6"
              >
                <div className="text-4xl font-bold gold-gradient mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
