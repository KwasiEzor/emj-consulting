'use client';

import { useTranslations, useLocale } from 'next-intl';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { fadeInUp } from '@/lib/animations';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: string;
  questionFr: string;
  questionEn: string;
  answerFr: string;
  answerEn: string;
}

export function FAQSection({ faqItems }: { faqItems: FAQItem[] }) {
  const t = useTranslations('faq');
  const locale = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

      <div className="max-w-3xl mx-auto space-y-4">
        {faqItems.map((item, index) => (
          <ScrollReveal key={item.id} delay={index * 0.1}>
            <div className="glass-dark rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold text-lg pr-4">
                  {locale === 'fr' ? item.questionFr : item.questionEn}
                </span>
                <ChevronDown
                  className={`flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  size={20}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-white/70">
                      {locale === 'fr' ? item.answerFr : item.answerEn}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
