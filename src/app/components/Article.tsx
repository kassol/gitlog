import { isLoggedIn } from "@/lib/auth";
import Link from "next/link";
export default async function Article({
  data,
}: {
  data: {
    number: number;
    title: string;
    body?: string | null;
    created_at: string;
  };
}) {
  const login = await isLoggedIn();
  return (
    <div className="flex-1 flex flex-col justify-between markdown-body">
      <h1 className="text-2xl text-gray-600">{data.title}</h1>
      <div className="w-full flex flex-row justify-end text-gray-400 text-sm">
        {data.created_at}
        {login && (
          <Link
            href={`/post/edit/${data.number}`}
            className="ml-4 hover:underline"
          >
            Edit
          </Link>
        )}
      </div>
      <div className="flex-1 flex flex-col px-4">
        {data.body && (
          <div dangerouslySetInnerHTML={{ __html: data.body }}></div>
        )}
      </div>
    </div>
  );
}
