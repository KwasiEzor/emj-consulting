import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { GlassmorphCard } from '@/components/shared/GlassmorphCard';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Award, Globe, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Hero */}
      <section className="text-center mb-20">
        <ScrollReveal variant={fadeInUp}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gold-gradient">
            À Propos de Nous
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            EMJ Consulting, votre partenaire de confiance pour réaliser vos projets de voyage et d'immigration depuis plus de 10 ans.
          </p>
        </ScrollReveal>
      </section>

      {/* Mission, Vision, Values */}
      <section className="mb-20">
        <div className="grid md:grid-cols-3 gap-8">
          <ScrollReveal delay={0.1}>
            <GlassmorphCard className="h-full text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center">
                <Target size={32} className="text-[var(--color-gold)]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 gold-gradient">Notre Mission</h3>
              <p className="text-white/70">
                Faciliter vos démarches de visa et d'immigration avec expertise, transparence et accompagnement personnalisé pour garantir votre succès.
              </p>
            </GlassmorphCard>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <GlassmorphCard className="h-full text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center">
                <Eye size={32} className="text-[var(--color-gold)]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 gold-gradient">Notre Vision</h3>
              <p className="text-white/70">
                Devenir le leader africain des services de visa et d'immigration, reconnu pour notre excellence et notre engagement envers nos clients.
              </p>
            </GlassmorphCard>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <GlassmorphCard className="h-full text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center">
                <Heart size={32} className="text-[var(--color-gold)]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 gold-gradient">Nos Valeurs</h3>
              <p className="text-white/70">
                Intégrité, professionnalisme, excellence et engagement total envers la réussite de chaque client qui nous fait confiance.
              </p>
            </GlassmorphCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats & Achievements */}
      <section className="mb-20">
        <ScrollReveal>
          <div className="glass-dark rounded-[var(--radius-2xl)] p-12">
            <h2 className="text-3xl font-bold text-center mb-12 gold-gradient">
              Nos Réalisations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: <Award />, stat: '500+', label: 'Visas Obtenus' },
                { icon: <Users />, stat: '1000+', label: 'Clients Satisfaits' },
                { icon: <Globe />, stat: '30+', label: 'Pays Couverts' },
                { icon: <Target />, stat: '98%', label: 'Taux de Réussite' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 text-[var(--color-gold)]">
                    {item.icon}
                  </div>
                  <div className="text-4xl font-bold gold-gradient mb-2">{item.stat}</div>
                  <div className="text-sm text-white/60">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Company Story */}
      <section className="mb-20">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center gold-gradient">
              Notre Histoire
            </h2>
            <div className="space-y-6 text-white/70 text-lg">
              <p>
                Fondée en 2015, EMJ Consulting est née de la passion de faciliter les voyages et l'immigration pour les familles et professionnels africains souhaitant explorer le monde.
              </p>
              <p>
                Avec plus de 10 ans d'expérience, nous avons aidé des centaines de clients à réaliser leurs rêves de voyage, d'études à l'étranger et d'immigration vers leurs destinations de choix.
              </p>
              <p>
                Notre équipe d'experts dévoués travaille avec professionnalisme et transparence pour garantir que chaque dossier reçoit l'attention qu'il mérite, du premier contact jusqu'à l'obtention du visa.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
