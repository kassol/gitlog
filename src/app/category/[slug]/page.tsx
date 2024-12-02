import { getPostsByCategory } from "@/lib/github";
import ArticleList from "@/app/components/ArticleList";

export default async function Category({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const posts = await getPostsByCategory(slug);
  return <ArticleList articles={posts} />;
}
