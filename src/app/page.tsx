import Link from "next/link";
import ArticleList from "@/app/components/ArticleList";
import { getCategories, getPages, getAllPosts } from "@/lib/github";

export default async function Home() {
  const categories = await getCategories();
  const pages = await getPages();
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col w-full flex-1">
      <ul className="nav w-full mb-4 flex flex-row gap-2 justify-end">
        {categories.map((item) => (
          <li key={item} className="hover:animate-pulse">
            <Link href={`/category/${item}`}>{item}</Link>
          </li>
        ))}
        {pages.map((item) => (
          <li key={item} className="hover:animate-pulse">
            <Link href={`/page/${item}`}>{item}</Link>
          </li>
        ))}
      </ul>
      <ArticleList articles={posts} />
    </div>
  );
}
