import { db } from '@/db';
import { blogPosts, blogCategories } from '@/db/schema';
import { eq, and, ne, desc } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { GlassmorphCard } from '@/components/shared/GlassmorphCard';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { fadeInUp } from '@/lib/animations';
import { Calendar, Clock, Tag, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useLocale } from 'next-intl';
import Image from 'next/image';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  // Fetch post with category
  const [postData] = await db
    .select({
      post: blogPosts,
      category: blogCategories,
    })
    .from(blogPosts)
    .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.status, 'published')))
    .limit(1);

  if (!postData) {
    notFound();
  }

  const { post, category } = postData;

  // Fetch related posts (same category, excluding current)
  const relatedPosts = await db
    .select({
      post: blogPosts,
      category: blogCategories,
    })
    .from(blogPosts)
    .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
    .where(
      and(
        eq(blogPosts.status, 'published'),
        eq(blogPosts.categoryId, post.categoryId!),
        ne(blogPosts.id, post.id)
      )
    )
    .orderBy(desc(blogPosts.publishedAt))
    .limit(3);

  const title = locale === 'fr' ? post.titleFr : post.titleEn;
  const content = locale === 'fr' ? post.contentFr : post.contentEn;

  return (
    <div className="container mx-auto px-4 py-20">
      <article className="max-w-4xl mx-auto">
        {/* Hero Image */}
        {post.imageUrl && (
          <ScrollReveal variant={fadeInUp}>
            <div className="relative h-96 rounded-[var(--radius-2xl)] overflow-hidden mb-8">
              <Image
                src={post.imageUrl}
                alt={title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] to-transparent" />
            </div>
          </ScrollReveal>
        )}

        {/* Header */}
        <ScrollReveal delay={0.1}>
          <div className="mb-8">
            {/* Category */}
            {category && (
              <div className="flex items-center text-[var(--color-gold)] mb-4">
                <Tag size={16} className="mr-2" />
                <span className="text-sm font-medium">
                  {locale === 'fr' ? category.nameFr : category.nameEn}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gold-gradient">
              {title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-sm text-white/60">
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                {post.publishedAt && formatDate(post.publishedAt, locale)}
              </div>
              {post.readingTime && (
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  {post.readingTime} min de lecture
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Content */}
        <ScrollReveal delay={0.2}>
          <GlassmorphCard>
            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:gold-gradient
                prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8
                prose-h3:text-2xl prose-h3:font-semibold prose-h3:mb-3 prose-h3:mt-6
                prose-p:text-white/80 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-[var(--color-gold)] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white prose-strong:font-semibold
                prose-ul:text-white/80 prose-ul:list-disc prose-ul:ml-6
                prose-ol:text-white/80 prose-ol:list-decimal prose-ol:ml-6
                prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-[var(--color-gold)] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-white/70
                prose-code:text-[var(--color-gold)] prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </GlassmorphCard>
        </ScrollReveal>

        {/* Share Buttons */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12">
            <ShareButtons title={title} slug={slug} />
          </div>
        </ScrollReveal>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-20">
            <ScrollReveal delay={0.4}>
              <h2 className="text-3xl font-bold mb-8 text-center gold-gradient">
                Articles Connexes
              </h2>
            </ScrollReveal>
            <RelatedPosts posts={relatedPosts} />
          </div>
        )}
      </article>
    </div>
  );
}
