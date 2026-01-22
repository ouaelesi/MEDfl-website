// components/blogsPage/RecentArticlesServer.tsx
import RecentArticles, { Article } from "./RecentArticles";

type Q = {
  _id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  author?: { name?: string; avatar?: string };
};

export const revalidate = 60;

export default async function RecentArticlesServer({
  title = "Articles récents",
  limit = 6,
}: {
  title?: string;
  limit?: number;
}) {
  const rows = (await client.fetch(recentPostsQuery)) as Q[];

  const articles: Article[] = rows.slice(0, limit).map((p) => ({
    title: p.title,
    date: p.publishedAt
      ? new Date(p.publishedAt).toLocaleDateString("fr-FR", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "",
    author: {
      name: p.author?.name || "SERVSI — Équipe",
      avatar: p.author?.avatar || "/images/Logo.png",
    },
    href: `/blogs/${p.slug}`,
  }));

  return <RecentArticles title={title} articles={articles} />;
}