export default function Article({
  data,
}: {
  data: {
    title: string;
    body?: string | null;
    created_at: string;
  };
}) {
  return (
    <div className="flex-1 flex flex-col justify-between markdown-body">
      <h1 className="text-2xl text-gray-600">{data.title}</h1>
      <div className="w-full flex flex-row justify-end text-gray-400 text-sm">
        {data.created_at}
      </div>
      <div className="flex-1 flex flex-col px-4">
        {data.body && (
          <div dangerouslySetInnerHTML={{ __html: data.body }}></div>
        )}
      </div>
    </div>
  );
}
