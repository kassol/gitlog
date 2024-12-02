import Link from "next/link";
export default function ArticleList({
  articles,
}: {
  articles: Array<{
    id: number;
    number: number;
    title: string;
    body?: string | null;
    created_at: string;
  }>;
}) {
  return (
    <div className="flex flex-col w-full flex-1 text-xl text-gray-600">
      {articles.map((post) => (
        <div
          className="flex flex-row items-baseline justify-between px-2 py-1 hover:animate-pulse"
          key={post.id}
        >
          <Link href={`/post/${post.number}`}>{post.title}</Link>
          <p className="text-sm text-gray-400">{String(post.created_at)}</p>
        </div>
      ))}
      {articles.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center px-2 py-1">
          No posts found
          <Link className="hover:underline mt-2 text-red-500" href="/">
            Back to home
          </Link>
        </div>
      )}
    </div>
  );
}
