import { db } from '@/db';
import { blogPosts, blogCategories } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { BlogClient } from '@/components/blog/BlogClient';

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    db
      .select({
        post: blogPosts,
        category: blogCategories,
      })
      .from(blogPosts)
      .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
      .where(eq(blogPosts.status, 'published'))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(50),
    db.select().from(blogCategories),
  ]);

  return (
    <div className="container mx-auto px-4 py-20">
      <BlogClient posts={posts} categories={categories} />
    </div>
  );
}
