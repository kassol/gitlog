import { getPostsByCategory } from "@/lib/github";
import ArticleList from "@/app/components/ArticleList";

export default async function Category({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const posts = await getPostsByCategory(slug);
  return (
    <div className="flex flex-col w-full flex-1">
      <div className="mb-4 text-2xl text-gray-600">{slug}</div>
      <ArticleList articles={posts} />
    </div>
  );
}
