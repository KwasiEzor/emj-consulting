'use client';

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { GlassmorphCard } from '@/components/shared/GlassmorphCard';
import { fadeInUp } from '@/lib/animations';
import { Search, Calendar, Clock, Tag } from 'lucide-react';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import Image from 'next/image';

interface BlogPost {
  post: {
    id: string;
    titleFr: string;
    titleEn: string;
    slug: string;
    excerptFr: string;
    excerptEn: string;
    contentFr: string;
    contentEn: string;
    imageUrl: string | null;
    author: string;
    publishedAt: Date | null;
    readingTime: number | null;
  };
  category: {
    id: string;
    nameFr: string;
    nameEn: string;
    slug: string;
  } | null;
}

interface Category {
  id: string;
  nameFr: string;
  nameEn: string;
  slug: string;
}

export function BlogClient({
  posts,
  categories,
}: {
  posts: BlogPost[];
  categories: Category[];
}) {
  const locale = useLocale();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((item) => {
      const title = locale === 'fr' ? item.post.titleFr : item.post.titleEn;
      const excerpt = locale === 'fr' ? item.post.excerptFr : item.post.excerptEn;

      const matchesSearch =
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        excerpt.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || item.category?.id === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory, locale]);

  return (
    <>
      {/* Hero */}
      <section className="text-center mb-16">
        <ScrollReveal variant={fadeInUp}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gold-gradient">
            Blog
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Conseils, actualités et guides pour réussir vos démarches de visa et immigration.
          </p>
        </ScrollReveal>
      </section>

      {/* Search & Categories */}
      <section className="mb-12">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
              size={20}
            />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 glass-dark rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[var(--color-gold)] text-[var(--color-navy)]'
                  : 'glass-dark hover:bg-white/10'
              }`}
            >
              Tous
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[var(--color-gold)] text-[var(--color-navy)]'
                    : 'glass-dark hover:bg-white/10'
                }`}
              >
                {locale === 'fr' ? category.nameFr : category.nameEn}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Count */}
      <div className="text-center mb-8 text-white/60">
        {filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''}
      </div>

      {/* Blog Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((item, index) => (
          <ScrollReveal key={item.post.id} delay={index * 0.05}>
            <Link href={`/blog/${item.post.slug}`}>
              <GlassmorphCard className="h-full overflow-hidden group cursor-pointer">
                {/* Image */}
                {item.post.imageUrl && (
                  <div className="relative h-48 -m-6 mb-4 overflow-hidden">
                    <Image
                      src={item.post.imageUrl}
                      alt={locale === 'fr' ? item.post.titleFr : item.post.titleEn}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] to-transparent" />
                  </div>
                )}

                {/* Category Badge */}
                {item.category && (
                  <div className="flex items-center text-xs text-[var(--color-gold)] mb-3">
                    <Tag size={12} className="mr-1" />
                    {locale === 'fr' ? item.category.nameFr : item.category.nameEn}
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--color-gold)] transition-colors">
                  {locale === 'fr' ? item.post.titleFr : item.post.titleEn}
                </h3>

                {/* Excerpt */}
                <p className="text-white/70 text-sm mb-4 line-clamp-3">
                  {locale === 'fr' ? item.post.excerptFr : item.post.excerptEn}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-white/50">
                  <div className="flex items-center">
                    <Calendar size={12} className="mr-1" />
                    {item.post.publishedAt &&
                      formatDate(item.post.publishedAt, locale)}
                  </div>
                  {item.post.readingTime && (
                    <div className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      {item.post.readingTime} min
                    </div>
                  )}
                </div>
              </GlassmorphCard>
            </Link>
          </ScrollReveal>
        ))}
      </section>

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-white/40 text-lg">
            Aucun article trouvé. Essayez d'autres critères.
          </p>
        </div>
      )}
    </>
  );
}
