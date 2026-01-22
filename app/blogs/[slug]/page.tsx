// app/blogs/[slug]/page.tsx
import { notFound } from "next/navigation";
import BlogPostUI from "@/components/blogs/BlogContent";
import RecentArticlesServer from "@/components/blogs/BlogsFooter";
import { blogs } from "@/data/Blogs";

export const revalidate = 60;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Next 15
  const post = blogs[Number(slug)]

  return (
    <BlogPostUI
      post={post}
      recentSlot={<RecentArticlesServer title="À lire ensuite" limit={3} />}
    />
  );
}