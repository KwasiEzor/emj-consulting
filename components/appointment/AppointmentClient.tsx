'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { GlassmorphCard } from '@/components/shared/GlassmorphCard';
import { fadeInUp } from '@/lib/animations';
import { AppointmentForm } from '@/components/forms/AppointmentForm';

interface Service {
  id: string;
  titleFr: string;
  titleEn: string;
  icon: string;
}

export function AppointmentClient({ services }: { services: Service[] }) {
  const locale = useLocale();

  return (
    <>
      {/* Hero */}
      <section className="text-center mb-16">
        <ScrollReveal variant={fadeInUp}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gold-gradient">
            Prendre Rendez-vous
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Planifiez une consultation gratuite avec nos experts en visa et immigration.
          </p>
        </ScrollReveal>
      </section>

      {/* Form */}
      <div className="max-w-3xl mx-auto">
        <ScrollReveal delay={0.2}>
          <GlassmorphCard>
            <AppointmentForm services={services} />
          </GlassmorphCard>
        </ScrollReveal>
      </div>
    </>
  );
}
