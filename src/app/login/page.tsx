import { login } from "@/app/lib/actions";

export default async function Login(params: {
  searchParams: { error: string };
}) {
  const { error } = await params.searchParams;
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
