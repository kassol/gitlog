import { getPostById } from "@/lib/github";
import type { Metadata } from "next";
import Article from "@/app/components/Article";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await getPostById(Number(slug));
  return {
    title: post.title,
    // description: post.body,
  };
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post = await getPostById(Number(slug));

  return <Article data={post} />;
}
