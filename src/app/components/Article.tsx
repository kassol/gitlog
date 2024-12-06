import { isLoggedIn } from "@/lib/auth";
import Link from "next/link";
export default async function Article({
  data,
}: {
  data: {
    number: number;
    title: string;
    body?: string | null;
    description: string | null;
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
      {data.description && (
        <div className="flex flex-col text-gray-600 mt-4 text-base leading-loose p-4 border border-solid border-gray-200">
          <div>AI Summary</div>
          {data.description}
        </div>
      )}
      <div className="flex-1 flex flex-col px-4 mt-4">
        {data.body && (
          <div dangerouslySetInnerHTML={{ __html: data.body }}></div>
        )}
      </div>
    </div>
  );
}
