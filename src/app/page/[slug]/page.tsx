import { getLatestPostByPage } from "@/lib/github";
import Article from "@/app/components/Article";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post = await getLatestPostByPage(slug);

  return (
    <>
      {post && <Article data={post} />}
      {!post && (
        <div className="h-full flex flex-col items-center justify-center text-xl px-2 py-1">
          No content found
          <Link className="hover:underline mt-2 text-red-500" href="/">
            Back to home
          </Link>
        </div>
      )}
    </>
  );
}
