'use client';

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { GlassmorphCard } from '@/components/shared/GlassmorphCard';
import { fadeInUp } from '@/lib/animations';
import { Search, MapPin } from 'lucide-react';
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
  visaDuration: string | null;
  requirements: any;
  continent: string | null;
}

export function DestinationsClient({ destinations }: { destinations: Destination[] }) {
  const locale = useLocale();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<string>('all');

  // Get unique continents
  const continents = useMemo(() => {
    const unique = Array.from(new Set(destinations.map(d => d.continent).filter(Boolean))) as string[];
    return ['all', ...unique];
  }, [destinations]);

  // Filter destinations
  const filteredDestinations = useMemo(() => {
    return destinations.filter(dest => {
      const name = locale === 'fr' ? dest.nameFr : dest.nameEn;
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesContinent = selectedContinent === 'all' || dest.continent === selectedContinent;
      return matchesSearch && matchesContinent;
    });
  }, [destinations, searchTerm, selectedContinent, locale]);

  return (
    <>
      {/* Hero */}
      <section className="text-center mb-16">
        <ScrollReveal variant={fadeInUp}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gold-gradient">
            Destinations
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Découvrez plus de 30 destinations où nous pouvons vous aider à obtenir votre visa.
          </p>
        </ScrollReveal>
      </section>

      {/* Search & Filters */}
      <section className="mb-12">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <input
              type="text"
              placeholder="Rechercher une destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 glass-dark rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
            />
          </div>

          {/* Continent Filter */}
          <div className="flex flex-wrap gap-3">
            {continents.map(continent => (
              <button
                key={continent}
                onClick={() => setSelectedContinent(continent)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedContinent === continent
                    ? 'bg-[var(--color-gold)] text-[var(--color-navy)]'
                    : 'glass-dark hover:bg-white/10'
                }`}
              >
                {continent === 'all' ? 'Tous' : continent}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Count */}
      <div className="text-center mb-8 text-white/60">
        {filteredDestinations.length} destination{filteredDestinations.length > 1 ? 's' : ''} trouvée{filteredDestinations.length > 1 ? 's' : ''}
      </div>

      {/* Destinations Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((destination, index) => (
          <ScrollReveal key={destination.id} delay={index * 0.05}>
            <GlassmorphCard className="h-full overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
              {/* Image */}
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

              {/* Content */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-5xl">{destination.flagEmoji}</span>
                  {destination.continent && (
                    <span className="text-xs px-3 py-1 glass rounded-full text-white/60">
                      {destination.continent}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold mb-2">
                  {locale === 'fr' ? destination.nameFr : destination.nameEn}
                </h3>

                {destination.visaDuration && (
                  <div className="flex items-center text-sm text-[var(--color-gold)] mb-3">
                    <MapPin size={14} className="mr-1" />
                    <span>Visa: {destination.visaDuration}</span>
                  </div>
                )}

                <p className="text-white/70 text-sm mb-4">
                  {locale === 'fr' ? destination.descriptionFr : destination.descriptionEn}
                </p>

                {/* Requirements Preview */}
                {destination.requirements?.[locale] && (
                  <div className="text-xs text-white/50">
                    Documents: {destination.requirements[locale].slice(0, 2).join(', ')}
                    {destination.requirements[locale].length > 2 && '...'}
                  </div>
                )}
              </div>
            </GlassmorphCard>
          </ScrollReveal>
        ))}
      </section>

      {/* No Results */}
      {filteredDestinations.length === 0 && (
        <div className="text-center py-20">
          <p className="text-white/40 text-lg">
            Aucune destination trouvée. Essayez d'autres critères de recherche.
          </p>
        </div>
      )}
    </>
  );
}
