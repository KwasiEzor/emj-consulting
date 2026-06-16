'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { GlassmorphCard } from '@/components/shared/GlassmorphCard';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Calendar, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';

interface RelatedPost {
  post: {
    id: string;
    titleFr: string;
    titleEn: string;
    slug: string;
    excerptFr: string;
    excerptEn: string;
    imageUrl: string | null;
    publishedAt: Date | null;
    readingTime: number | null;
  };
  category: {
    nameFr: string;
    nameEn: string;
  } | null;
}

export function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  const locale = useLocale();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((item, index) => (
        <ScrollReveal key={item.post.id} delay={index * 0.1}>
          <Link href={`/blog/${item.post.slug}`}>
            <GlassmorphCard className="h-full overflow-hidden group cursor-pointer">
              {item.post.imageUrl && (
                <div className="relative h-40 -m-6 mb-4 overflow-hidden">
                  <Image
                    src={item.post.imageUrl}
                    alt={locale === 'fr' ? item.post.titleFr : item.post.titleEn}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}

              <h4 className="font-bold mb-2 group-hover:text-[var(--color-gold)] transition-colors line-clamp-2">
                {locale === 'fr' ? item.post.titleFr : item.post.titleEn}
              </h4>

              <p className="text-sm text-white/70 mb-3 line-clamp-2">
                {locale === 'fr' ? item.post.excerptFr : item.post.excerptEn}
              </p>

              <div className="flex items-center justify-between text-xs text-white/50">
                <div className="flex items-center">
                  <Calendar size={12} className="mr-1" />
                  {item.post.publishedAt && formatDate(item.post.publishedAt, locale)}
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
    </div>
  );
}
