import { login } from "@/app/lib/actions";
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Login(props: {
  // params: Params;
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const error = searchParams.error;
  console.log(error);
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <form action={login} className="w-[200px] flex flex-col">
        {error && <p className="text-red-400">{error}</p>}
        <input
          className="w-full mt-4 p-2 rounded bg-gray-100 placeholder:text-gray-400"
          name="password"
          autoComplete="off"
          type="password"
          placeholder="Password"
        />
        <button className="w-full py-2 mt-4 rounded bg-gray-100" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
